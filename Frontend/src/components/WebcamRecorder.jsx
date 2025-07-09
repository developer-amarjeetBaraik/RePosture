import React, { useContext, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { AnalysisReportContext } from '../store/AnalysisReportStore'
import RecordingIndicator from './utils/RecordingIndicator'

const WebcamRecorder = () => {
  // import required resources from AnalysisReportContext context
  const { setVideoFile, isRecordingViaCameraRef, setAnalysisResult, loading, } = useContext(AnalysisReportContext)

  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [cameraPermission, setCameraPermission] = useState(false)
  const [recording, setRecording] = useState(false)
  const [videoBlob, setVideoBlob] = useState(null)

  /**
   * useEffect hook that checks the camera permission of the user.
   * If the browser supports the Permissions API, it queries the camera permission
   * and updates the camera permission state accordingly.
   * If the browser does not support the Permissions API, it sets the camera permission state to 'not-supported'.
   * @returns None
   */
  useEffect(() => {
    const checkCameraPermission = async () => {
      if ('permissions' in navigator && 'query' in navigator.permissions) {
        try {
          const status = await navigator.permissions.query({ name: 'camera' })
          setCameraPermission(status.state)
          status.onchange = () => setCameraPermission(status.state)
        } catch (err) {
          console.error('Permission check error:', err)
          setCameraPermission('error')
        }
      } else {
        setCameraPermission('not-supported')
      }
    }

    checkCameraPermission()
  }, [])

  /**
   * Starts recording video from the webcam and sets up the necessary event listeners.
   * @returns None
   */
  const startRecording = () => {
    setVideoBlob(null)
    setAnalysisResult(null)
    isRecordingViaCameraRef.current = true

    /**
     * Initializes a MediaRecorder object with the provided stream using the specified mimeType.
     * @param {{MediaStream}} stream - The MediaStream object to record.
     * @param {{string}} mimeType - The MIME type of the media data.
     * @returns A MediaRecorder object for recording the stream.
     */
    const stream = webcamRef.current.stream
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })

    const chunks = []
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' })
      setVideoBlob(blob)
    }

    recorder.start()
    mediaRecorderRef.current = recorder
    setRecording(true)
  }

  /**
   * Stops the media recording and sets the recording state to false.
   * @returns None
   */
  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setRecording(false)
  }

  /**
   * Submits the video file if it exists by setting the video file state to the video blob.
   * @returns None
   */
  const submitVideo = () => {
    if (videoBlob) {
      setVideoFile(videoBlob)
    }
  }

  /**
   * Renders a component for recording a video using the webcam.
   * @returns JSX element containing the video recording interface.
   */
  return (
    <div className="w-full lg:w-1/2 bg-white/10 border border-white/20 text-white p-5 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">Record a Video Using Your Webcam</h2>

      <div className="rounded overflow-hidden relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          className="w-full aspect-video rounded border border-white/30"
        />
        {recording && <RecordingIndicator />}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {!recording && !videoBlob && (
          <button
            onClick={startRecording}
            disabled={cameraPermission === 'denied' || !cameraPermission}
            className={`bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition ${cameraPermission !== 'granted' || !cameraPermission ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            Start Recording
          </button>
        )}

        {!recording && videoBlob && (
          <button
            onClick={startRecording}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Re-record
          </button>
        )}

        {recording && (
          <button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Stop Recording
          </button>
        )}

        <button
          onClick={submitVideo}
          disabled={!videoBlob || loading}
          className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition ${!videoBlob || loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {loading ? 'Analyzing...' : 'Submit Video'}
        </button>
      </div>

      {videoBlob && (
        <p className="mt-2 text-green-400 text-sm">
          ✅ Video recorded. Click “Submit Video” to preview and analyze.
        </p>
      )}

      {/*
       * Conditional rendering based on the camera permission status.
       * If the camera permission is denied, display instructions on how to grant camera access.
       * @param {{string}} cameraPermission - The status of camera permission ('denied' or other).
       * @returns JSX element displaying instructions for granting camera access.
       */}
      {cameraPermission === 'denied' && (
        <div className="bg-red-900/20 border border-red-500 text-white rounded-2xl p-4 mt-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
            </svg>
            Camera Access Needed
          </h2>
          <p className="mb-3 text-sm text-gray-200">
            We need access to your webcam to record a posture video.
          </p>

          <div className="mb-3">
            <h3 className="font-medium text-gray-100 mb-1">On Desktop:</h3>
            <p className="text-sm text-gray-300">
              Click the ⓘ icon near the address bar.<br />
              Under Permissions, allow camera access, then refresh the tab.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-100 mb-1">On Mobile:</h3>
            <p className="text-sm text-gray-300">
              Open browser settings → Site Settings → Camera → Allow access.<br />
              Then refresh the page.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WebcamRecorder

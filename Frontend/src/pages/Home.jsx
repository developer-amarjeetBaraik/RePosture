import React, { useContext } from 'react'
import VideoUploadFromSystem from '../components/VideoUploadFromSystem'
import WebcamRecorder from '../components/WebcamRecorder'
import UploadedVideoAndCanvasOverlay from '../components/UploadedVideoAndCanvasOverlay'
import Report from '../components/Report'
import { AnalysisReportContext } from '../store/AnalysisReportStore'
import Footer from '../components/Footer'

const Home = () => {
  const { videoFile, errorMessage,analysisResult } = useContext(AnalysisReportContext)

  /**
   * Renders a component for uploading and analyzing videos.
   * @returns {JSX.Element} A JSX element representing the video upload and analysis component.
   */
  return (
    <>
    <div className="w-full min-h-screen px-4 py-6 flex flex-col items-center bg-gradient-to-b from-black to-gray-900 text-white">
      <h4 className='bg-red-900/20 border border-red-500 text-white text-[14px] rounded-2xl py-1 px-2 mb-6 shadow-md'>ⓘ Upload video in which full body is visible.</h4>
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6">
        {!videoFile && <VideoUploadFromSystem />}
        {!videoFile && <WebcamRecorder />}
        {videoFile && <UploadedVideoAndCanvasOverlay />}
      </div>

      {(analysisResult || errorMessage) && <Report />}
    </div>
    <Footer/>
    </>
  )
}

export default Home

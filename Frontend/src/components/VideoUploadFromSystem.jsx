import React, { useContext } from 'react';
import { AnalysisReportContext } from '../store/AnalysisReportStore';

const VideoUploadFromSystem = () => {
  const { setVideoFile, setAnalysisResult } = useContext(AnalysisReportContext);

  /**
   * Handles the upload of a video file, sets the video file in the state if it is a valid video file type,
   * and resets the analysis result state.
   * @param {Event} e - The event object triggered by the file upload input.
   * @returns None
   */
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setAnalysisResult(null);
    }
  };

  return (
    /**
     * Renders a div element with a form for uploading a video file from the user's system.
     * @returns {JSX.Element} A div element containing the upload form.
     */
    <div className="w-full lg:w-1/2 bg-white/10 border border-white/20 text-white p-5 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">Upload a Video from Your System</h2>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-300">Select a workout/posture video file</span>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="px-4 py-2 bg-white text-black rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded hover:file:bg-blue-700"
        />
      </label>
    </div>
  );
};

export default VideoUploadFromSystem;

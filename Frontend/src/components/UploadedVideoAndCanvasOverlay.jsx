import React, { useContext, useEffect } from 'react';
import { AnalysisReportContext } from '../store/AnalysisReportStore';
import AnalyzingSteps from './utils/AnalyzingSteps';

const UploadedVideoAndCanvasOverlay = () => {
    // import required resources from AnalysisReportContext context
    const { videoRef, canvasRef, videoFile, setVideoFile, handleAnalyze, setErrorMessage, analysisResult, setAnalysisResult, loading, } = useContext(AnalysisReportContext);

    /**
     * useEffect hook that sets up event listeners on the video element to adjust the canvas size
     * based on the video's client dimensions when the video metadata is loaded.
     * @returns None
     */
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!canvas || !video) return;

        const handleLoadedMetadata = () => {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }, [videoFile, analysisResult]);

    /**
     * useEffect hook that renders analysis results on a canvas element based on the video's current time.
     * @returns None
     */
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !analysisResult) return;

        const ctx = canvas.getContext('2d');

        /**
         * Renders a loop to continuously update the canvas based on the video analysis results.
         * The loop clears the canvas, retrieves the current time of the video, filters the analysis
         * results based on proximity to the current time, and then renders visual indicators for each issue.
         * @returns None
         */
        const renderLoop = () => {
            if (video.paused || video.ended) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /**
             * Retrieves the current time of the video and filters the analysis result to find
             * issues that are within 0.15 seconds of the current time.
             * @param {{number}} video.currentTime - The current time of the video.
             * @param {{Array}} analysisResult - The array of analysis results to filter.
             * @returns An array of issues that are within 0.15 seconds of the current time.
             */
            const currentTime = video.currentTime;
            const currentIssues = analysisResult.filter(
                item => Math.abs(item.timestamp - currentTime) < 0.15
            );

            /**
             * Iterates through the current issues array and draws a warning symbol and text on the canvas
             * at the specified points.
             * @param {{Object}} item - The current issue object containing information about the issue.
             * @param {{number[]}} item.point - The coordinates of the point where the warning symbol should be placed.
             * @param {{string}} item.issue - The description of the issue.
             * @returns None
             */
            currentIssues.forEach(item => {
                if (item.point) {
                    const x = item.point[0] * canvas.width / video.videoWidth;
                    const y = item.point[1] * canvas.height / video.videoHeight;

                    ctx.beginPath();
                    ctx.arc(x, y, 8, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
                    ctx.fill();

                    ctx.font = '12px Arial';
                    ctx.fillStyle = '#fff';
                    ctx.fillText(`⚠️ ${item.issue}`, x + 10, y);
                }
            });

            requestAnimationFrame(renderLoop);
        };

        video.addEventListener('play', renderLoop);
        return () => video.removeEventListener('play', renderLoop);
    }, [analysisResult]);

    return (
        <div className="w-full px-4 py-6 max-w-4xl mx-auto text-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center">
                Uploaded video — time to analyze your posture!
            </h3>

            {/*
             * Renders a video element with the specified video file and analysis result.
             * @param {{File}} videoFile - The video file to display.
             * @param {{Object}} analysisResult - The analysis result of the video.
             * @returns The video element with the video file and analysis result if available.
             */}
            {videoFile && (
                <div className="relative flex flex-col justify-center items-center aspect-video rounded overflow-hidden border border-white shadow-lg">
                    <video
                        id="video"
                        ref={videoRef}
                        src={URL.createObjectURL(videoFile)}
                        className="relative z-10"
                        controls
                    />
                    {analysisResult && (
                        <canvas
                            id="canvas"
                            ref={canvasRef}
                            className="absolute top-0 left-0 pointer-events-none z-20"
                        />
                    )}
                </div>
            )}

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <button
                    onClick={handleAnalyze}
                    disabled={!videoFile || loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl transition-all"
                >
                    {loading ? <AnalyzingSteps videoDuration={videoRef?.current?.duration} /> : 'Analyze Posture'}
                </button>

                <button
                    onClick={() => { setVideoFile(null), setAnalysisResult(null), setErrorMessage(null) }}
                    disabled={!videoFile || loading}
                    className="bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl transition-all"
                >
                    Upload New / Re-record
                </button>
            </div>
        </div>
    );
};

export default UploadedVideoAndCanvasOverlay;

import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { createContext } from 'react'


/**
 * Context object for the analysis report, containing references to video and canvas elements,
 * flags for recording via camera, video file, error message, analysis result, loading state,
 * and functions to set video file, error message, analysis result, loading state, and handle analysis.
 */
export const AnalysisReportContext = createContext({
    videoRef: null,
    canvasRef: null,
    isRecordingViaCameraRef: false,
    videoFile: null,
    setVideoFile: () => { },
    errorMessage: null,
    setErrorMessage: () => { },
    analysisResult: [],
    setAnalysisResult: () => { },
    loading: false,
    setLoading: () => { },
    handleAnalyze: () => { },
})

const AnalysisReportStore = ({ children }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const isRecordingViaCameraRef = useRef(false)
    const [videoFile, setVideoFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);

    /*
     * Handles the analysis of a video file by sending it to the server for processing.
     * If successful, sets the analysis result with any detected bad postures.
     * If there is an error, sets an error message.
     * @returns None
     */
    const handleAnalyze = async () => {
        if (!videoFile) return;

        setAnalysisResult(null)
        setLoading(true);
        const formData = new FormData();
        formData.append('video', videoFile);

        /**
         * Sends a POST request to the '/api/analyze' endpoint with the provided form data.
         * If successful, sets the analysis result or error message based on the response data.
         * Handles errors and logs them to the console.
         * Finally, sets loading to false after the request is completed.
         * @param {{FormData}} formData - The form data to send in the POST request.
         * @returns None
         */
        try {
            const response = await axios.post('/api/analyze', formData);
            if (response.data.status === 'error') {
                setErrorMessage(response.data.message);
            } else if (response.data.status === 'success') {
                setAnalysisResult(response.data.bad_postures);
            } else {
                console.log('Something went wrong.')
            }
        } catch (err) {
            console.error('Error analyzing video:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnalysisReportContext.Provider value={{ videoRef, canvasRef, isRecordingViaCameraRef, videoFile, setVideoFile, errorMessage, setErrorMessage, analysisResult, setAnalysisResult, loading, setLoading, handleAnalyze }}>
            {children}
        </AnalysisReportContext.Provider>
    )
}

export default AnalysisReportStore

import React, { useContext, useEffect } from 'react'
import { AnalysisReportContext } from '../store/AnalysisReportStore'
import { seekVideoTimelineAt } from '../services/seekVideoTimelineAt'

const Report = () => {
    // import required resources from AnalysisReportContext context
    const { videoRef, canvasRef, errorMessage, analysisResult } = useContext(AnalysisReportContext)

    /**
     * Handles the click event on an issue item.
     * @param {{item}} item - The issue item that was clicked.
     * @returns None
     */
    const handleIssueClick = (item) => {
        const x = item.point[0]
        const y = item.point[1]
        seekVideoTimelineAt(canvasRef?.current, videoRef?.current, item.timestamp, x, y, item.issue)
    }

    return (
        <div className="mt-10 w-full max-w-3xl max-h-150 overflow-y-scroll bg-white/10 border border-white/20 text-white p-5 rounded-2xl shadow-md">
            {/*
             * Renders a list of detected posture issues based on the analysis result.
             * @param {{analysisResult: Array<{timestamp: string, issue: string}>}} - The array of posture issues detected during analysis.
             * @returns JSX elements displaying the detected posture issues with clickable timestamps.
             */}
            {analysisResult &&
                <>
                    <h4 className="text-lg font-semibold mb-3">📝 Detected Posture Issues</h4>
                    <p className='mb-1.5 text-[14px] text-blue-500'>(Click on video timestamp to see preview on video player)</p>
                    <ul className="list-disc list-inside text-sm text-gray-200">
                        {analysisResult.map((item, idx) => (
                            <li key={idx} className='mb-1.5 cursor-pointer' onClick={() => handleIssueClick(item)}><b className='text-blue-500'>@{item.timestamp}</b>: {item.issue}</li>
                        ))}
                    </ul>
                </>
            }

            {/*
             * Conditional rendering of an error message block.
             * @param {{string}} errorMessage - The error message to display.
             * @returns JSX element containing the error message block if errorMessage is truthy, otherwise null.
             */}
            {errorMessage && <>
                <h4 className="text-lg font-semibold mb-3">⚠️ Video Error</h4>
                <p className='text-sm text-gray-200'>{errorMessage}</p>
            </>
            }
        </div>
    )
}

export default Report

import React from 'react'

/**
 * Functional component that renders a recording indicator.
 * @returns {JSX.Element} A div element containing a recording indicator.
 */
const RecordingIndicator = () => {
    return (
        <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
            <div className="relative w-4 h-4">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
            </div>
            <span className="text-sm text-white font-medium">Recording</span>
        </div>
    );
}

export default RecordingIndicator

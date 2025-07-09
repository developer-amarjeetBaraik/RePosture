import React, { useEffect, useState } from 'react'

/**
 * An array of texts representing the steps involved in analyzing posture.
 */
const analyzingTexts = [
    "Analyzing posture...",
    "Detecting body joints...",
    "Evaluating angles & alignment...",
    "Checking for bad postures..."
]

const AnalyzingSteps = ({ videoDuration = 10 }) => {
    const [index, setIndex] = useState(0)

    /**
     * Sets up a timer that increments the index of the analyzingTexts array every 1500 milliseconds.
     * Clears the timer when the component unmounts or when videoDuration changes.
     * @returns A function to clear the timer.
     */
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % analyzingTexts.length)
        }, 1500)

        return () => clearInterval(timer)
    }, [videoDuration])

    return (
        <span className="animate-pulse text-sm">{analyzingTexts[index]}</span>
    )
}

export default AnalyzingSteps

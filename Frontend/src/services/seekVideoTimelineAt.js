/**
 * Seeks the video timeline to a specific time and draws a warning indicator on the canvas.
 * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
 * @param {HTMLVideoElement} video - The video element to seek.
 * @param {number} timeInSecond - The time in seconds to seek the video to.
 * @param {number} x - The x-coordinate for the warning indicator.
 * @param {number} y - The y-coordinate for the warning indicator.
 * @param {string} issue - The issue message to display with the warning indicator.
 * @returns None
 */
export const seekVideoTimelineAt = (canvas, video, timeInSecond, x, y, issue) => {
    if (!video || !canvas) return
    video.currentTime = timeInSecond

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.fill();

    ctx.font = '12px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`⚠️ ${issue}`, x + 10, y);
}
"use client"

export const ProgressBar = ({ progress, onClick }) => {
  return (
    <div className="progress-container" onClick={onClick}>
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  )
}

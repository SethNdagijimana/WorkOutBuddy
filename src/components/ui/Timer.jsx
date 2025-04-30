import React from "react"

const Timer = ({ currentTime, totalTime }) => {
  return (
    <div className="relative mb-6">
      <div className="w-40 h-40 mx-auto rounded-full flex items-center justify-center border-8 border-gray-700 relative">
        {/* Animated circular progress */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="8"
            strokeDasharray="289.027"
            strokeDashoffset={289.027 * (1 - currentTime / totalTime)}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="text-5xl font-bold text-white">{currentTime}</div>
      </div>
    </div>
  )
}

export default Timer

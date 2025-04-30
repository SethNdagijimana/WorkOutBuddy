import React from "react"

const ProgressBar = ({ percentage, completed, total, label }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-bold text-white">{label}</h2>
        <span className="font-medium text-gray-300">
          {completed}/{total} completed
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className="bg-purple-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar

import React from "react"

const DifficultySelector = ({
  difficulty,
  setDifficulty,
  workoutPlans,
  disabled,
  disabledMessage
}) => {
  const handleDifficultyChange = (level) => {
    if (disabled) {
      // Could show a notification here
      if (disabledMessage) {
        alert(disabledMessage)
      }
      return
    }
    setDifficulty(level)
  }

  return (
    <div className="mb-6">
      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
        <h3 className="text-sm text-gray-400 mb-2 uppercase">
          Difficulty Level
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(workoutPlans).map((level) => (
            <button
              key={level}
              onClick={() => handleDifficultyChange(level)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                difficulty === level
                  ? "bg-purple-600 text-white"
                  : disabled
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DifficultySelector

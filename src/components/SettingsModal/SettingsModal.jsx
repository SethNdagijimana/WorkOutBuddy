import React from "react"

const SettingsModal = ({
  difficulty,
  setDifficulty,
  customRestTime,
  setCustomRestTime,
  volume,
  setVolume,
  countdownEnabled,
  setCountdownEnabled,
  onClose,
  onApply,
  workoutPlans
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 m-4 max-w-sm w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-300">
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(workoutPlans).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  difficulty === level
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-300">
            Default Rest Time (seconds)
          </label>
          <input
            type="number"
            value={customRestTime}
            onChange={(e) => setCustomRestTime(Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            min="5"
            max="120"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-300">
            Sound Volume
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Mute</span>
            <span>Max</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-300">
            Sound Options
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="countdown-toggle"
                checked={countdownEnabled}
                onChange={() => setCountdownEnabled(!countdownEnabled)}
                className="mr-2 h-4 w-4 accent-purple-500"
              />
              <label htmlFor="countdown-toggle" className="text-gray-300">
                Enable countdown sounds
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal

import React from "react"

const HistoryModal = ({ workoutHistory, onClose, onClear }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 m-4 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Workout History</h2>
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

        {workoutHistory.length > 0 ? (
          <div className="max-h-96 overflow-y-auto pr-2">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="py-2 text-left text-gray-400">Date</th>
                  <th className="py-2 text-left text-gray-400">Difficulty</th>
                  <th className="py-2 text-right text-gray-400">Time</th>
                </tr>
              </thead>
              <tbody>
                {workoutHistory.map((workout, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 text-gray-300">{workout.date}</td>
                    <td className="py-3 text-gray-300">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          workout.difficulty === "beginner"
                            ? "bg-green-900 text-green-300"
                            : workout.difficulty === "intermediate"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {workout.difficulty}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-300">
                      {workout.duration} min
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No workout history yet
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm text-red-400 hover:text-red-300"
          >
            Clear History
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default HistoryModal

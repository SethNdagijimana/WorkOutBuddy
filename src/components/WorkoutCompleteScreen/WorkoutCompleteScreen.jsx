import React from "react"

const WorkoutCompleteScreen = ({
  difficulty,
  completedExercises,
  completedSets,
  restartWorkout,
  onViewHistory
}) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="bg-green-900 rounded-full p-6 inline-block mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-white">Workout Complete!</h2>
      <p className="text-lg mb-4 text-gray-300">
        Great job finishing your {difficulty} workout!
      </p>

      <div className="mb-8 bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Difficulty:</span>
          <span className="text-white font-medium">{difficulty}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Exercises completed:</span>
          <span className="text-white font-medium">
            {completedExercises.length}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Sets completed:</span>
          <span className="text-white font-medium">{completedSets}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          onClick={restartWorkout}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-lg font-medium"
        >
          Start New Workout
        </button>
        <button
          onClick={onViewHistory}
          className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 shadow-lg font-medium"
        >
          View History
        </button>
      </div>
    </div>
  )
}

export default WorkoutCompleteScreen

import React from "react"
import Timer from "../ui/Timer"

const ExerciseInProgressScreen = ({
  exercise,
  repIndex,
  counting,
  timer,
  isResting,
  restTimer,
  onFinishExercise,
  onStartRest,
  onSkipRest
}) => {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <h2 className="text-2xl font-bold mb-2 text-white">{exercise.name}</h2>
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6 mb-6">
        <div className="mb-4">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="mx-auto rounded-lg"
          />
        </div>

        <p className="text-gray-300 mb-6">{exercise.description}</p>

        <div className="mb-6">
          <span className="inline-block bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
            {exercise.category}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-300">
            Set {repIndex + 1} of {exercise.reps.length}
          </span>
          <span className="font-medium text-gray-300">
            {exercise.reps[repIndex]}{" "}
            {typeof exercise.reps[repIndex] === "number" &&
            exercise.reps[repIndex] > 0
              ? "reps"
              : "seconds"}
          </span>
        </div>

        {/* Mobile-friendly progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="bg-purple-600 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${(repIndex / exercise.reps.length) * 100}%`
            }}
          ></div>
        </div>

        {isResting ? (
          /* Rest Timer */
          <div className="text-center">
            <p className="text-blue-400 font-medium mb-2">REST TIME</p>
            <Timer currentTime={restTimer} totalTime={exercise.rest} />
            <button
              onClick={onSkipRest}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Skip Rest
            </button>
          </div>
        ) : counting ? (
          /* Exercise Timer/Counter */
          <div className="text-center">
            {exercise.reps[repIndex] > 0 ? (
              <>
                <p className="text-gray-300 mb-2">Time remaining</p>
                <Timer
                  currentTime={timer}
                  totalTime={exercise.reps[repIndex]}
                />
              </>
            ) : (
              <div className="text-5xl font-bold text-purple-400 mb-4">GO!</div>
            )}
          </div>
        ) : (
          /* Set Complete */
          <div className="text-center">
            {repIndex === exercise.reps.length - 1 ? (
              <>
                <p className="text-green-400 font-medium mb-2">
                  Exercise Complete!
                </p>
                <button
                  onClick={onFinishExercise}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                >
                  Finish & Continue
                </button>
              </>
            ) : (
              <>
                <p className="text-green-400 font-medium mb-2">Set Complete!</p>
                <button
                  onClick={onStartRest}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
                >
                  Start Rest
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={onFinishExercise}
        className="text-purple-400 hover:text-purple-300 font-medium flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to exercises
      </button>
    </div>
  )
}

export default ExerciseInProgressScreen

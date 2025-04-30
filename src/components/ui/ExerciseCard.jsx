import React from "react"

const ExerciseCard = ({ exercise, isCompleted, onStart }) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
        isCompleted ? "border-2 border-green-500" : "border border-gray-700"
      }`}
    >
      <img
        src={exercise.image}
        alt={exercise.name}
        className="w-full h-36 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white">{exercise.name}</h3>
          <span className="inline-block bg-purple-900 text-purple-200 px-2 py-1 rounded text-xs">
            {exercise.category}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {exercise.description}
        </p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>
            {exercise.reps.join(" / ")}{" "}
            {typeof exercise.reps[0] === "number" && exercise.reps[0] > 0
              ? "reps"
              : "seconds"}
          </span>
          <span>{exercise.rest}s rest</span>
        </div>
        <button
          onClick={() => onStart(exercise)}
          className={`w-full py-2 rounded text-center font-medium transition-colors ${
            isCompleted
              ? "bg-green-800 text-green-200 hover:bg-green-700"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {isCompleted ? "Do Again" : "Start"}
        </button>
      </div>
    </div>
  )
}

export default ExerciseCard

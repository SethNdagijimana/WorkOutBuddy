import { useEffect, useRef, useState } from "react"

// Expanded workout plan with more exercises and difficulty levels
const workoutPlans = {
  beginner: [
    {
      name: "Wall Push-ups",
      description:
        "Stand facing a wall. Place your hands on the wall and perform push-ups.",
      reps: [10, 10, 10],
      rest: 30,
      category: "Upper Body",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Bodyweight Squats",
      description:
        "Stand with feet shoulder-width apart. Lower your body as if sitting in a chair.",
      reps: [10, 10, 10],
      rest: 30,
      category: "Lower Body",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Glute Bridges",
      description:
        "Lie on your back with knees bent. Lift hips toward the ceiling.",
      reps: [10, 10, 10],
      rest: 30,
      category: "Core",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Plank (on knees)",
      description:
        "Support your weight on your forearms and knees, keeping your body straight.",
      reps: [20, 20, 20], // in seconds
      rest: 30,
      category: "Core",
      image: "/api/placeholder/150/150"
    }
  ],
  intermediate: [
    {
      name: "Regular Push-ups",
      description:
        "Support your weight on hands and toes. Lower chest to floor and push back up.",
      reps: [12, 12, 12],
      rest: 45,
      category: "Upper Body",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Bulgarian Split Squats",
      description: "Place one foot behind you on a bench and perform lunges.",
      reps: [8, 8, 8],
      rest: 45,
      category: "Lower Body",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Mountain Climbers",
      description:
        "Start in a push-up position and bring knees to chest alternately.",
      reps: [20, 20, 20],
      rest: 45,
      category: "Cardio",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Full Plank",
      description:
        "Support your weight on your forearms and toes, keeping your body straight.",
      reps: [30, 30, 30], // in seconds
      rest: 45,
      category: "Core",
      image: "/api/placeholder/150/150"
    }
  ],
  advanced: [
    {
      name: "Diamond Push-ups",
      description:
        "Place hands close together in a diamond shape and perform push-ups.",
      reps: [15, 15, 15],
      rest: 60,
      category: "Upper Body",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Pistol Squats",
      description:
        "Perform a one-legged squat while extending the other leg forward.",
      reps: [8, 8, 8],
      rest: 60,
      category: "Lower Body",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Burpees",
      description:
        "Combine a push-up with a jump, moving from floor to standing position quickly.",
      reps: [15, 15, 15],
      rest: 60,
      category: "Full Body",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Side Plank Rotations",
      description:
        "From side plank position, rotate arm under and back up to the ceiling.",
      reps: [10, 10, 10], // per side
      rest: 60,
      category: "Core",
      image: "/api/placeholder/150/150"
    }
  ]
}

export default function WorkoutRoutine() {
  // State management
  const [difficulty, setDifficulty] = useState("beginner")
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [repIndex, setRepIndex] = useState(0)
  const [counting, setCounting] = useState(false)
  const [timer, setTimer] = useState(null)
  const [isResting, setIsResting] = useState(false)
  const [restTimer, setRestTimer] = useState(0)
  const [completedExercises, setCompletedExercises] = useState([])
  const [workoutComplete, setWorkoutComplete] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [customRestTime, setCustomRestTime] = useState(30)
  const [filterCategory, setFilterCategory] = useState("All")
  const [volume, setVolume] = useState(0.5)
  const [soundType, setSoundType] = useState("beep")
  const [countdownEnabled, setCountdownEnabled] = useState(true)
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    // Initialize with some example history or try to load from localStorage
    const savedHistory =
      typeof window !== "undefined"
        ? localStorage.getItem("workoutHistory")
        : null
    return savedHistory
      ? JSON.parse(savedHistory)
      : [
          {
            date: "2025-04-25",
            difficulty: "beginner",
            exercises: 4,
            duration: 15
          },
          {
            date: "2025-04-27",
            difficulty: "beginner",
            exercises: 3,
            duration: 12
          },
          {
            date: "2025-04-28",
            difficulty: "intermediate",
            exercises: 2,
            duration: 18
          }
        ]
  })
  const [workoutStartTime, setWorkoutStartTime] = useState(null)
  const [completedSets, setCompletedSets] = useState(0)

  // References
  const audioRef = useRef(null)
  const beepSoundRef = useRef(null)
  const countdownSoundRef = useRef(null)

  // Effects
  useEffect(() => {
    // Timer for exercises
    if (counting && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          // Play countdown sound for the last 3 seconds
          if (countdownEnabled && prev <= 3 && prev > 0) {
            if (countdownSoundRef.current) {
              countdownSoundRef.current.volume = volume
              countdownSoundRef.current.play()
            }
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    } else if (counting && timer === 0) {
      if (beepSoundRef.current) {
        beepSoundRef.current.volume = volume
        beepSoundRef.current.play()
      }

      setCounting(false)
      setCompletedSets((prev) => prev + 1)

      if (repIndex < selectedExercise.reps.length - 1) {
        startRest()
      }
    }
  }, [counting, timer, countdownEnabled])

  // Rest timer effect
  useEffect(() => {
    if (isResting && restTimer > 0) {
      const interval = setInterval(() => {
        setRestTimer((prev) => {
          // Play countdown sound for the last 3 seconds
          if (countdownEnabled && prev <= 3 && prev > 0) {
            if (countdownSoundRef.current) {
              countdownSoundRef.current.volume = volume
              countdownSoundRef.current.play()
            }
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    } else if (isResting && restTimer === 0) {
      if (beepSoundRef.current) {
        beepSoundRef.current.volume = volume
        beepSoundRef.current.play()
      }

      setIsResting(false)
      setRepIndex((prev) => prev + 1)
      setTimer(selectedExercise.reps[repIndex + 1])
      setCounting(true)
    }
  }, [isResting, restTimer, countdownEnabled])

  // Check if workout is complete
  useEffect(() => {
    if (
      completedExercises.length === workoutPlans[difficulty].length &&
      completedExercises.length > 0
    ) {
      setWorkoutComplete(true)

      // Calculate workout duration
      if (workoutStartTime) {
        const duration = Math.round(
          (Date.now() - workoutStartTime) / (1000 * 60)
        ) // in minutes

        // Add to workout history
        const newWorkout = {
          date: new Date().toISOString().split("T")[0],
          difficulty,
          exercises: completedExercises.length,
          duration
        }

        const updatedHistory = [...workoutHistory, newWorkout]
        setWorkoutHistory(updatedHistory)

        // Save to localStorage if available
        if (typeof window !== "undefined") {
          localStorage.setItem("workoutHistory", JSON.stringify(updatedHistory))
        }
      }
    }
  }, [completedExercises, difficulty, workoutStartTime])

  // Functions
  const startExercise = (exercise) => {
    setSelectedExercise(exercise)
    setRepIndex(0)
    setTimer(exercise.reps[0])
    setCounting(true)

    // If this is the first exercise, start tracking workout time
    if (completedExercises.length === 0 && !workoutStartTime) {
      setWorkoutStartTime(Date.now())
    }
  }

  const startRest = () => {
    setIsResting(true)
    setRestTimer(selectedExercise.rest)
  }

  const skipRest = () => {
    setIsResting(false)
    setRepIndex((prev) => prev + 1)
    setTimer(selectedExercise.reps[repIndex + 1])
    setCounting(true)
  }

  const finishExercise = () => {
    if (!completedExercises.includes(selectedExercise.name)) {
      setCompletedExercises([...completedExercises, selectedExercise.name])
    }
    setSelectedExercise(null)
    setRepIndex(0)
    setTimer(null)
    setCounting(false)
    setIsResting(false)
  }

  const restartWorkout = () => {
    setCompletedExercises([])
    setWorkoutComplete(false)
    setSelectedExercise(null)
    setWorkoutStartTime(null)
    setCompletedSets(0)
  }

  const clearHistory = () => {
    setWorkoutHistory([])
    if (typeof window !== "undefined") {
      localStorage.removeItem("workoutHistory")
    }
    setShowHistory(false)
  }

  const applySettings = () => {
    // Apply custom rest time to all exercises
    workoutPlans[difficulty].forEach((exercise) => {
      exercise.rest = customRestTime
    })
    setShowSettings(false)
  }

  // Get categories for filter
  const categories = [
    "All",
    ...new Set(workoutPlans[difficulty].map((ex) => ex.category))
  ]

  // Filter exercises based on category
  const filteredExercises =
    filterCategory === "All"
      ? workoutPlans[difficulty]
      : workoutPlans[difficulty].filter((ex) => ex.category === filterCategory)

  // Calculate workout progress percentage
  const progressPercentage =
    (completedExercises.length / workoutPlans[difficulty].length) * 100

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <audio ref={audioRef} />

      {/* Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md border-b border-gray-700">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Workout Buddy</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Show history"
            >
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Show settings"
            >
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Audio elements */}
      <audio ref={beepSoundRef} />
      <audio ref={countdownSoundRef} />

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 m-4 max-w-sm w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
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
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={applySettings}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workout History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 m-4 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Workout History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-white"
              >
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
                      <th className="py-2 text-left text-gray-400">
                        Difficulty
                      </th>
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
                onClick={clearHistory}
                className="px-4 py-2 text-sm text-red-400 hover:text-red-300"
              >
                Clear History
              </button>
              <button
                onClick={() => setShowHistory(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        {/* Workout Complete Screen */}
        {workoutComplete ? (
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
            <h2 className="text-3xl font-bold mb-4 text-white">
              Workout Complete!
            </h2>
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
                onClick={() => setShowHistory(true)}
                className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 shadow-lg font-medium"
              >
                View History
              </button>
            </div>
          </div>
        ) : selectedExercise ? (
          /* Exercise In Progress */
          <div className="flex flex-col items-center text-center py-4">
            <h2 className="text-2xl font-bold mb-2 text-white">
              {selectedExercise.name}
            </h2>
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6 mb-6">
              <div className="mb-4">
                <img
                  src={selectedExercise.image}
                  alt={selectedExercise.name}
                  className="mx-auto rounded-lg"
                />
              </div>

              <p className="text-gray-300 mb-6">
                {selectedExercise.description}
              </p>

              <div className="mb-6">
                <span className="inline-block bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedExercise.category}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-300">
                  Set {repIndex + 1} of {selectedExercise.reps.length}
                </span>
                <span className="font-medium text-gray-300">
                  {selectedExercise.reps[repIndex]}{" "}
                  {typeof selectedExercise.reps[repIndex] === "number" &&
                  selectedExercise.reps[repIndex] > 0
                    ? "reps"
                    : "seconds"}
                </span>
              </div>

              {/* Mobile-friendly progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${(repIndex / selectedExercise.reps.length) * 100}%`
                  }}
                ></div>
              </div>

              {isResting ? (
                /* Rest Timer */
                <div className="text-center">
                  <p className="text-blue-400 font-medium mb-2">REST TIME</p>
                  <div className="relative mb-6">
                    {/* Circular progress indicator */}
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
                          strokeDashoffset={
                            289.027 * (1 - restTimer / selectedExercise.rest)
                          }
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="text-5xl font-bold text-white">
                        {restTimer}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={skipRest}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Skip Rest
                  </button>
                </div>
              ) : counting ? (
                /* Exercise Timer/Counter */
                <div className="text-center">
                  {selectedExercise.reps[repIndex] > 0 ? (
                    <>
                      <p className="text-gray-300 mb-2">Time remaining</p>
                      <div className="relative mb-6">
                        {/* Circular timer */}
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
                              strokeDashoffset={
                                289.027 *
                                (1 - timer / selectedExercise.reps[repIndex])
                              }
                              transform="rotate(-90 50 50)"
                              strokeLinecap="round"
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <div className="text-5xl font-bold text-white">
                            {timer}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-5xl font-bold text-purple-400 mb-4">
                      GO!
                    </div>
                  )}
                </div>
              ) : (
                /* Set Complete */
                <div className="text-center">
                  {repIndex === selectedExercise.reps.length - 1 ? (
                    <>
                      <p className="text-green-400 font-medium mb-2">
                        Exercise Complete!
                      </p>
                      <button
                        onClick={finishExercise}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                      >
                        Finish & Continue
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-green-400 font-medium mb-2">
                        Set Complete!
                      </p>
                      <button
                        onClick={startRest}
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
              onClick={finishExercise}
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
        ) : (
          /* Exercise Selection Screen */
          <div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <h2 className="text-xl font-bold text-white">
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}{" "}
                  Workout Plan
                </h2>
                <span className="font-medium text-gray-300">
                  {completedExercises.length}/{workoutPlans[difficulty].length}{" "}
                  completed
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="mb-6">
              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                <h3 className="text-sm text-gray-400 mb-2 uppercase">
                  Difficulty Level
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(workoutPlans).map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        // Only allow changing difficulty if workout hasn't started
                        if (completedExercises.length === 0) {
                          setDifficulty(level)
                        } else {
                          // Could show a notification here
                          alert(
                            "You can't change difficulty during an active workout"
                          )
                        }
                      }}
                      className={`px-3 py-2 rounded-md text-sm transition-colors ${
                        difficulty === level
                          ? "bg-purple-600 text-white"
                          : completedExercises.length > 0
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

            {/* Category Filter */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap ${
                      filterCategory === category
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.map((exercise, i) => (
                <div
                  key={i}
                  className={`bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
                    completedExercises.includes(exercise.name)
                      ? "border-2 border-green-500"
                      : "border border-gray-700"
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
                        {typeof exercise.reps[0] === "number" &&
                        exercise.reps[0] > 0
                          ? "reps"
                          : "seconds"}
                      </span>
                      <span>{exercise.rest}s rest</span>
                    </div>
                    <button
                      onClick={() => startExercise(exercise)}
                      className={`w-full py-2 rounded text-center font-medium transition-colors ${
                        completedExercises.includes(exercise.name)
                          ? "bg-green-800 text-green-200 hover:bg-green-700"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                    >
                      {completedExercises.includes(exercise.name)
                        ? "Do Again"
                        : "Start"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
        <p>
          Workout Buddy &copy; {new Date().getFullYear()} - Stay Fit, Stay
          Healthy
        </p>
      </footer>
    </div>
  )
}

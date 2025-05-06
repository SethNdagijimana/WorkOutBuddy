import { useEffect, useRef, useState } from "react"
import { workoutPlans } from "../../utilities/utilities"
import ExerciseInProgressScreen from "../ExerciseInProgressScreen/ExerciseInProgressScreen"
import ExerciseSelectionScreen from "../ExerciseSelectionScreen/ExerciseSelectionScreen"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import HistoryModal from "../HistoryModal/HistoryModal"
import SettingsModal from "../SettingsModal/SettingsModal"
import WorkoutCompleteScreen from "../WorkoutCompleteScreen/WorkoutCompleteScreen"

export default function WorkoutRoutine() {
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

  const beepSoundRef = useRef(null)
  const countdownSoundRef = useRef(null)
  const completeSoundRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!beepSoundRef.current) {
        beepSoundRef.current = new Audio()
        beepSoundRef.current.volume = volume
      }

      if (!countdownSoundRef.current) {
        countdownSoundRef.current = new Audio()
        countdownSoundRef.current.src =
          "https://assets.mixkit.co/active_storage/sfx/1056/1056-preview.mp3"
        countdownSoundRef.current.volume = volume
      }

      if (!completeSoundRef.current) {
        completeSoundRef.current = new Audio()
        completeSoundRef.current.src =
          "https://assets.mixkit.co/active_storage/sfx/2153/2153-preview.mp3"
        completeSoundRef.current.volume = volume
      }

      updateSoundSource()
    }
  }, [])

  const updateSoundSource = () => {
    if (beepSoundRef.current) {
      switch (soundType) {
        case "beep":
          beepSoundRef.current.src =
            "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
          break
        case "bell":
          beepSoundRef.current.src =
            "https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3"
          break
        case "chime":
          beepSoundRef.current.src =
            "https://assets.mixkit.co/active_storage/sfx/1058/1058-preview.mp3"
          break
        default:
          beepSoundRef.current.src =
            "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
      }
    }
  }

  useEffect(() => {
    updateSoundSource()
  }, [soundType])

  useEffect(() => {
    if (beepSoundRef.current) beepSoundRef.current.volume = volume
    if (countdownSoundRef.current) countdownSoundRef.current.volume = volume
    if (completeSoundRef.current) completeSoundRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (workoutComplete && completeSoundRef.current) {
      completeSoundRef.current
        .play()
        .catch((e) => console.error("Error playing completion sound:", e))
    }
  }, [workoutComplete])

  useEffect(() => {
    if (counting && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (countdownEnabled && prev <= 3 && prev > 0) {
            if (countdownSoundRef.current) {
              countdownSoundRef.current.play().catch((e) => {
                console.error("Error playing countdown sound:", e)
              })
            }
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    } else if (counting && timer === 0) {
      if (beepSoundRef.current) {
        beepSoundRef.current.play().catch((e) => {
          console.error("Error playing beep sound:", e)
        })
      }

      setCounting(false)
      setCompletedSets((prev) => prev + 1)

      if (repIndex < selectedExercise.reps.length - 1) {
        startRest()
      }
    }
  }, [counting, timer, countdownEnabled, repIndex, selectedExercise])

  useEffect(() => {
    if (isResting && restTimer > 0) {
      const interval = setInterval(() => {
        setRestTimer((prev) => {
          if (countdownEnabled && prev <= 3 && prev > 0) {
            if (countdownSoundRef.current) {
              countdownSoundRef.current.play().catch((e) => {
                console.error("Error playing countdown sound:", e)
              })
            }
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    } else if (isResting && restTimer === 0) {
      if (beepSoundRef.current) {
        beepSoundRef.current.play().catch((e) => {
          console.error("Error playing beep sound:", e)
        })
      }

      setIsResting(false)
      setRepIndex((prev) => prev + 1)
      setTimer(selectedExercise.reps[repIndex + 1])
      setCounting(true)
    }
  }, [isResting, restTimer, countdownEnabled, repIndex, selectedExercise])

  useEffect(() => {
    if (
      completedExercises.length === workoutPlans[difficulty].length &&
      completedExercises.length > 0
    ) {
      setWorkoutComplete(true)

      if (workoutStartTime) {
        const duration = Math.round(
          (Date.now() - workoutStartTime) / (1000 * 60)
        )
        const newWorkout = {
          date: new Date().toISOString().split("T")[0],
          difficulty,
          exercises: completedExercises.length,
          duration
        }

        const updatedHistory = [...workoutHistory, newWorkout]
        setWorkoutHistory(updatedHistory)

        if (typeof window !== "undefined") {
          localStorage.setItem("workoutHistory", JSON.stringify(updatedHistory))
        }
      }
    }
  }, [completedExercises, difficulty, workoutStartTime, workoutHistory])

  const startExercise = (exercise) => {
    setSelectedExercise(exercise)
    setRepIndex(0)
    setTimer(exercise.reps[0])
    setCounting(true)

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
    workoutPlans[difficulty].forEach((exercise) => {
      exercise.rest = customRestTime
    })
    setShowSettings(false)
  }

  const categories = [
    "All",
    ...new Set(workoutPlans[difficulty].map((ex) => ex.category))
  ]

  const filteredExercises =
    filterCategory === "All"
      ? workoutPlans[difficulty]
      : workoutPlans[difficulty].filter((ex) => ex.category === filterCategory)

  const progressPercentage =
    (completedExercises.length / workoutPlans[difficulty].length) * 100

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header
        onHistoryClick={() => setShowHistory(true)}
        onSettingsClick={() => setShowSettings(!showSettings)}
      />

      {showSettings && (
        <SettingsModal
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          customRestTime={customRestTime}
          setCustomRestTime={setCustomRestTime}
          volume={volume}
          setVolume={setVolume}
          soundType={soundType}
          setSoundType={setSoundType}
          countdownEnabled={countdownEnabled}
          setCountdownEnabled={setCountdownEnabled}
          onClose={() => setShowSettings(false)}
          onApply={applySettings}
          workoutPlans={workoutPlans}
        />
      )}

      {showHistory && (
        <HistoryModal
          workoutHistory={workoutHistory}
          onClose={() => setShowHistory(false)}
          onClear={clearHistory}
        />
      )}

      <main className="max-w-6xl mx-auto p-4">
        {workoutComplete ? (
          <WorkoutCompleteScreen
            difficulty={difficulty}
            completedExercises={completedExercises}
            completedSets={completedSets}
            restartWorkout={restartWorkout}
            onViewHistory={() => setShowHistory(true)}
          />
        ) : selectedExercise ? (
          <ExerciseInProgressScreen
            exercise={selectedExercise}
            repIndex={repIndex}
            counting={counting}
            timer={timer}
            isResting={isResting}
            restTimer={restTimer}
            onFinishExercise={finishExercise}
            onStartRest={startRest}
            onSkipRest={skipRest}
          />
        ) : (
          <ExerciseSelectionScreen
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            completedExercises={completedExercises}
            progressPercentage={progressPercentage}
            categories={categories}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filteredExercises={filteredExercises}
            onStartExercise={startExercise}
            workoutPlans={workoutPlans}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

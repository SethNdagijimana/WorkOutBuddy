import React from "react"
import CategoryFilter from "../ui/CategoryFilter"
import DifficultySelector from "../ui/DifficultySelector"
import ExerciseCard from "../ui/ExerciseCard"
import ProgressBar from "../ui/ProgressBar"

const ExerciseSelectionScreen = ({
  difficulty,
  setDifficulty,
  completedExercises,
  progressPercentage,
  categories,
  filterCategory,
  setFilterCategory,
  filteredExercises,
  onStartExercise,
  workoutPlans
}) => {
  return (
    <div>
      <ProgressBar
        percentage={progressPercentage}
        completed={completedExercises.length}
        total={workoutPlans[difficulty].length}
        label={`${
          difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
        } Workout Plan`}
      />

      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        workoutPlans={workoutPlans}
        disabled={completedExercises.length > 0}
        disabledMessage="You can't change difficulty during an active workout"
      />

      <CategoryFilter
        categories={categories}
        activeCategory={filterCategory}
        setActiveCategory={setFilterCategory}
      />

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise, i) => (
          <ExerciseCard
            key={i}
            exercise={exercise}
            isCompleted={completedExercises.includes(exercise.name)}
            onStart={onStartExercise}
          />
        ))}
      </div>
    </div>
  )
}

export default ExerciseSelectionScreen

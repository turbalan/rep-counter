import React from 'react';
import { WorkoutsContext } from '../../WorkoutProvider';

function ExerciseControls({ countSet, handleSaveWorkout, currentExercise, repCount, repWeight, numberOfSets }) {
  const { workoutStatus, setWorkoutStatus, STATUS } = React.useContext(WorkoutsContext);
  if (workoutStatus === STATUS.idle) {
    return (
      <button
        disabled={repCount < 1 || (currentExercise.weighted && repWeight < 1)}
        onClick={() => {
          setWorkoutStatus(STATUS.working);
        }}
      >
        🏄 Begin Workout
      </button>
  )
  }
  if (workoutStatus === STATUS.working) {
    return (
      <div>
        <button
          onClick={() => {
            countSet();
          }}
        >
          🏋️ Count this set
        </button>
        <p>Sets: <strong>{numberOfSets}</strong></p>
        {numberOfSets > 0 && (
          <button onClick={handleSaveWorkout}>
            Complete {currentExercise.name}
          </button>
        )}
      </div>
    )
  }
}

export default ExerciseControls;

import React from 'react';
import { WorkoutsContext } from '../../WorkoutProvider';
import './styles.css';

function ExerciseControls({ countSet, handleSaveWorkout, currentExercise, setCurrentExercise, repCount, repWeight, numberOfSets }) {
  const { workoutStatus, setWorkoutStatus, STATUS } = React.useContext(WorkoutsContext);

  if (workoutStatus === STATUS.idle) {
    return (
      <div className="current-exercise-controls">
        <button
          disabled={repCount < 1 || (currentExercise.weighted && repWeight < 1)}
          onClick={() => {
            setWorkoutStatus(STATUS.working);
          }}
        >
          🏄 Begin Workout
        </button>
        {' or '}
        <button onClick={() => {
          setCurrentExercise(null);
        }}>
          Go back
        </button>
      </div>
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
        <button onClick={() => {
          setWorkoutStatus(STATUS.idle);
          setCurrentExercise(null);
        }}>
          Cancel
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

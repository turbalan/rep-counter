import React from 'react';
import { WorkoutsContext } from '../../WorkoutProvider';

function ExerciseControls({ countSet, handleSaveWorkout, currentExercise, repCount, repWeight, numberOfSets }) {
  const { workoutStatus, setWorkoutStatus, STATUS } = React.useContext(WorkoutsContext);
  if (workoutStatus === STATUS.idle) {
    return (
      <div>
        <button
          disabled={repCount < 1 || (currentExercise.weighted && repWeight < 1)}
          onClick={() => {
            setWorkoutStatus(STATUS.working);
          }}
        >
          Begin Workout
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
          Count this set
        </button>
        <p>{numberOfSets}</p>
        {numberOfSets > 0 && (
          <div>
            <button onClick={handleSaveWorkout}>
              Complete {currentExercise.name}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default ExerciseControls;

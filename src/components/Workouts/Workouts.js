import React from 'react';

import { WorkoutsContext } from '../WorkoutProvider';

function Workouts() {
  const { storedExercises, workoutStatus, STATUS, handleLogTraining } = React.useContext(WorkoutsContext);

  if (workoutStatus === STATUS.idle) {
    if (storedExercises.length === 0) {
      return <p>No workouts still...</p>
    } else {
      return (
        <div>
          <div>
            {storedExercises.map((exercise, index) => (
              <div key={index}>
                <h2>{exercise.exercise}</h2>
                <p>
                Sets: {exercise.sets}, Weight: {exercise.weight}, Reps: {exercise.reps}
                </p>
              </div>
            ))}
          </div>
          <button onClick={handleLogTraining}>📝 Log training Session</button>
        </div>
      )
    }
  }
}

export default Workouts;

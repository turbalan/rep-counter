import React from 'react';
import './styles.css';
import { WorkoutsContext } from '../WorkoutProvider';

function Workouts() {
  const { storedExercises, workoutStatus, STATUS, handleLogTraining } = React.useContext(WorkoutsContext);

  if (workoutStatus === STATUS.idle) {
    return (
      <article className='workouts'>
        {storedExercises.length === 0 ? (
          <p>No workouts still...</p>
        ) : (
          <>
            {storedExercises.map((exercise, index) => (
              <div key={index} className='workout-item'>
                <h2 className='workout-item-title'>{exercise.exercise}</h2>
                <ul className='workout-item-content'>
                  <li>
                    Reps: {exercise.reps}
                  </li>
                  <li>
                    Weight: {exercise.weight}
                  </li>
                  <li>
                    Sets: {exercise.sets}
                  </li>
                </ul>
              </div>
            ))}
            <button onClick={handleLogTraining}>📝 Log session to the Training Log</button>
          </>
        )}
      </article>
    )
  }
}

export default Workouts;

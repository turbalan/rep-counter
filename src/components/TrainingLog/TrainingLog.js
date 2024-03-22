import React from 'react';
import { WorkoutsContext } from '../WorkoutProvider';

function TrainingLog() {
  const { workoutStatus, setWorkoutStatus, STATUS, getStoredTrainingLog } = React.useContext(WorkoutsContext);
  const storedTrainings = getStoredTrainingLog()
  if (workoutStatus === STATUS.complete) return (
    <div>
      {storedTrainings.map(training => {
        return (
          <div key={training.date}>
            <h2>{training.title}</h2>
            <ul>
            {training.exercises.map((exercise, index) => {
              return (
                <li key={index}>
                  {exercise.exercise}, {exercise.sets} sets of {exercise.weight} kg for {exercise.reps} reps
                </li>
              )
            })}
            </ul>
          </div>
        )
      })}
    </div>
  )
    
}

export default TrainingLog;

import React from 'react';
import { WorkoutsContext } from '../WorkoutProvider';

function TrainingLog() {
  const [showTrainingLog, setShowTrainingLog] = React.useState(false);
  const { workoutStatus, setWorkoutStatus, STATUS, getStoredTrainingLog } = React.useContext(WorkoutsContext);
  const storedTrainings = getStoredTrainingLog()

  if (storedTrainings.length === 0) return;

  if (!showTrainingLog) {
    return <button onClick={() => setShowTrainingLog(true)}>📖 Show Training Log</button>
  } else { return (
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
    <button onClick={() => {setShowTrainingLog(false)}}>📖 Hide Training Log</button>
    </div>
  )
  }
}

export default TrainingLog;

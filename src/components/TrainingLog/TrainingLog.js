import React from 'react';
import './styles.css';
import { WorkoutsContext } from '../WorkoutProvider';

function TrainingLog() {
  const [showTrainingLog, setShowTrainingLog] = React.useState(false);
  const { workoutStatus, STATUS, getStoredTrainingLog } = React.useContext(WorkoutsContext);
  const storedTrainings = getStoredTrainingLog()

  if (storedTrainings.length === 0 || workoutStatus === STATUS.working) return;
  return (
    <article className='training-log'>
      <button onClick={() => setShowTrainingLog(!showTrainingLog)}>
        📖 {showTrainingLog ? 'Close' : 'View'} Training Log
      </button>
      {showTrainingLog
        ? <TrainingLogList storedTrainings={storedTrainings} />
        : null
      }
    </article>
  )
}
export default TrainingLog;

function TrainingLogList({ storedTrainings }) {
  return (
    storedTrainings.map(training => (
      <section className='training-log-entry' key={training.date}>
        <h2 className='training-log-title'>{training.title}</h2>
          <ul className='training-log-workouts'>
            {training.exercises.map((exercise, index) => {
              return (
                <li key={index}>
                  {exercise.exercise}, {exercise.sets} sets of {exercise.weight} kg for {exercise.reps} reps
                </li>
              )
            })}
          </ul>
        </section>
      )
    )
  )
}

import React from 'react';
import './styles.css';
import ExerciseListItem from '../ExerciseListItem';
import { WorkoutsContext } from '../WorkoutProvider';

function ExercisesList({ exercises, currentExercise, setCurrentExercise }) {
  const [isListOpen, setIsListOpen] = React.useState(false);
  const { setWorkoutStatus, workoutStatus, STATUS } = React.useContext(WorkoutsContext);

  React.useEffect(() => {
    currentExercise && setIsListOpen(false);
  }, [currentExercise]);

  if (workoutStatus === STATUS.working) return;

  return (
    <div>
      <button
        onClick={() => {
          setIsListOpen(!isListOpen);
          setWorkoutStatus(STATUS.idle)
        }}
      >
        {currentExercise 
          ? `👉 Current Exercise: ${currentExercise.name}`
          : `🔍 Choose an exercise`}
      </button>

      {isListOpen &&
        exercises.map((item) => {
          return (
            <div key={item.id} id={item.id} className='exercises-list-container'>
              <p>{item.name}</p>
              <ul className='exercise-list'>
                {item.exercises.map((exercise) => {
                  return (
                    <li key={exercise.id}>
                      <ExerciseListItem
                        exercise={exercise}
                        weighted={item.weighted}
                        setCurrentExercise={setCurrentExercise}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default ExercisesList;

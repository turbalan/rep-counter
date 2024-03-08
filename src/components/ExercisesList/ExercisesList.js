import React from 'react';
import Exercise from '../Exercise';

function ExercisesList({ exercises, currentExercise, setCurrentExercise }) {
  const [isListOpen, setIsListOpen] = React.useState(false);

  React.useEffect(() => {
    currentExercise && setIsListOpen(false);
  }, [currentExercise]);

  return (
    <div>
      <button
        onClick={() => {
          setIsListOpen(!isListOpen);
        }}
      >
        {currentExercise.name
          ? `Current Exercise: ${currentExercise.name}`
          : `Choose an exercise`}
      </button>

      {isListOpen &&
        exercises.map((item) => {
          return (
            <div key={item.id} id={item.id}>
              <p>{item.name}</p>
              <ul>
                {item.exercises.map((exercise) => {
                  return (
                    <li key={exercise.id}>
                      <Exercise
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

import React from 'react';
import * as data from '/data/exercises.json';
import ExercisesList from '../ExercisesList';
import CurrentExercise from '../CurrentExercise/CurrentExercise';

/*
To have a set you:
1. Push on a "dropdown" button that lists all the available exercises
2. To select an exercise you click on that exercise
3. After that selection you enter the reps in the set and the weight used
4. After each set you click on a "set complete" button that records that set
5. After completing some sets, the user can click on a "save workout"
    button, which will be saved to localstorage
*/
function Set() {
  const [currentExercise, setCurrentExercise] = React.useState({});

  const json = JSON.stringify(data);
  const exercises = JSON.parse(json);

  return (
    <div>
      <ExercisesList
        exercises={exercises}
        currentExercise={currentExercise}
        setCurrentExercise={setCurrentExercise}
      />
      <CurrentExercise
        currentExercise={currentExercise} 
        setCurrentExercise={setCurrentExercise} 
      />
    </div>
  );
}

export default Set;

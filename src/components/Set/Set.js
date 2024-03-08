import React from 'react';
import * as data from '/data/exercises.json';
import ExercisesList from '../ExercisesList';

/*
To have a set you:
1. Push on a "dropdown" button that lists all the available exercises
2. To select an exercise you click on that exercise
3. After that selection you enter the reps in the set and the weight used
4. After each set you click on a "set complete" button that records that set
*/
function Set() {
  const [currentExercise, setCurrentExercise] = React.useState({});
  const [repCount, setRepCount] = React.useState(0);
  const [repWeight, setRepWeight] = React.useState(0);
  const [setCount, setSetCount] = React.useState(0);

  const repInputRef = React.useRef();
  const weightInputRef = React.useRef();

  React.useEffect(() => {
    console.log(currentExercise);
    Object.hasOwn(currentExercise, 'name') && repInputRef.current.focus();
  }, [currentExercise]);

  const json = JSON.stringify(data);
  const exercises = JSON.parse(json);
  return (
    <div>
      <ExercisesList
        exercises={exercises}
        currentExercise={currentExercise}
        setCurrentExercise={setCurrentExercise}
      />
      {typeof currentExercise.length === 'undefined' ? (
        <p>{currentExercise.name}</p>
      ) : null}

      {currentExercise.name ? (
        <div>
          <div>
            <label htmlFor="rep-number">
              How many reps?{' '}
              <input
                ref={repInputRef}
                id="rep-number"
                type="number"
                value={repCount}
                onChange={(event) => {
                  setRepCount(event.target.value);
                }}
              />
            </label>
          </div>
          {currentExercise.weighted ? (
            <div>
              <label htmlFor="rep-weight">
                What's the weight?{' '}
                <input
                  ref={weightInputRef}
                  id="rep-weigh"
                  type="number"
                  value={repWeight}
                  onChange={(event) => {
                    setRepWeight(event.target.value);
                  }}
                />
              </label>
            </div>
          ) : (
            <div>
              <p>Make the {currentExercise.name} weighted?</p>
              <button
                onClick={() => {
                  setCurrentExercise({ ...currentExercise, weighted: true });
                }}
              >
                Make Weighted
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setSetCount(setCount + 1);
            }}
          >
            Count this set
          </button>
          <p>{setCount}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Set;

import React from 'react';
import * as data from '/data/exercises.json';
import ExercisesList from '../ExercisesList';

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

  const clearSets = () => {
    localStorage.removeItem('sets');
    setSetCount(0);
    setCurrentExercise({});
    setRepCount(0);
    setRepWeight(0);
  };

  const handleSaveSet = (set) => {
    let storedSets = JSON.parse(localStorage.getItem('sets')) || [];
    if (storedSets.length > 0) {
      storedSets = [...storedSets, set];
    } else {
      storedSets.push(set);
    }
    localStorage.setItem('sets', JSON.stringify(storedSets));
  };

  const handleCompleteExercise = () => {
    let storedSets = JSON.parse(localStorage.getItem('sets'));
    let storedExercises = JSON.parse(localStorage.getItem('exercises')) || [];
    if (storedExercises.length > 0) {
      storedExercises = [...storedExercises, storedSets];
    } else {
      storedExercises.push(storedSets);
    }
    localStorage.setItem('exercises', JSON.stringify(storedExercises));
    clearSets();
  };

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
          <p>
            <button
              onClick={() => {
                setSetCount(setCount + 1);
                handleSaveSet({
                  exercise: currentExercise.name,
                  reps: repCount,
                  weight: repWeight,
                });
              }}
            >
              Count this set
            </button>
            {setCount}
          </p>
        </div>
      ) : null}
      {setCount > 0 && (
        <div>
          <button
            onClick={() => {
              handleCompleteExercise();
            }}
          >
            Complete {currentExercise.name}
          </button>
        </div>
      )}
    </div>
  );
}

export default Set;

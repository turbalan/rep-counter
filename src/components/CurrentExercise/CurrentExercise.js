import React from 'react';
import { WorkoutsContext } from '../WorkoutProvider';

function CurrentExercise({currentExercise, setCurrentExercise}) {
  const [repCount, setRepCount] = React.useState(0);
  const [repWeight, setRepWeight] = React.useState(0);
  const [setCount, setSetCount] = React.useState(0);

  const { handleCompleteExercise, workoutStatus, setWorkoutStatus, STATUS } = React.useContext(WorkoutsContext);
  
  const weightInputRef = React.useRef();
  const repInputRef = React.useRef();

  React.useEffect(() => {
    console.log(currentExercise);
    Object.hasOwn(currentExercise, 'name') && repInputRef.current.focus();
  }, [currentExercise]);

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

  return (
    <div>
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
              {workoutStatus === STATUS.idle ? (
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
              ) : (
                <p>
                  Weight: <strong>{repWeight}</strong>
                </p>
              )}
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
            disabled={repCount === 0 || (currentExercise.weighted && repWeight === 0)}
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
        </div>
      ) : null
      }
      {setCount > 0 && (
        <div>
          <button
            onClick={() => {
              handleCompleteExercise();
              clearSets();
              setWorkoutStatus(STATUS.idle)
            }}
          >
            Complete {currentExercise.name}
          </button>
        </div>
      )}
    </div>
  )
}

export default CurrentExercise;

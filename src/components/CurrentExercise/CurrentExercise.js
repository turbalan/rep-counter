import React from 'react';
import { WorkoutsContext } from '../WorkoutProvider';
import CountInput from '../CountInput/CountInput';

function CurrentExercise({currentExercise, setCurrentExercise}) {
  const [repCount, setRepCount] = React.useState(0);
  const [repWeight, setRepWeight] = React.useState(0);
  const [numberOfSets, setNumberOfSets] = React.useState(0);

  const { handleCompleteExercise } = React.useContext(WorkoutsContext);

  const { workoutStatus, setWorkoutStatus, STATUS } = React.useContext(WorkoutsContext);
  
  const weightInputRef = React.useRef();
  const repInputRef = React.useRef();

  React.useEffect(() => {
    if (!currentExercise.weighted) {
      setRepWeight(0);
    }
  }, [currentExercise.weighted]);

  React.useEffect(() => {
    console.log(currentExercise);
    Object.hasOwn(currentExercise, 'name') && repInputRef?.current && repInputRef?.current.focus();
  }, [currentExercise]);

  const clearSets = () => {
    localStorage.removeItem('sets');
    setNumberOfSets(0);
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

  const handleMakeWeighted = () => {
    setCurrentExercise((oldExercise) => {
      const newExercise = { ...oldExercise, weighted: true }
      return newExercise;
    });
    weightInputRef?.current?.focus();
  }

  return (
    <div>
      <div>
        <p>{currentExercise.name}</p>
        {workoutStatus === STATUS.idle ? (
          <div>
            <CountInput 
              message={'How many reps?'}
              count={repCount}
              setCount={setRepCount}
              reference={repInputRef}
            />
            {currentExercise.weighted ? (
              <CountInput
                message={`What's the weight?`}
                count={repWeight}
                setCount={setRepWeight}
                reference={weightInputRef}
              />
            ) : (
            <>
              <p>Make the {currentExercise.name} weighted?</p>
              <button onClick={handleMakeWeighted}>
                Make Weighted
              </button>
            </>
            )}
            <button
              disabled={repCount < 1 || (currentExercise.weighted && repWeight < 1)}
              onClick={() => {
                setWorkoutStatus(STATUS.working)
              }}
            >
              Begin Workout
            </button>
          </div>
        ) : null
        }
        {workoutStatus === STATUS.working ? (
          <div>
            <p>Reps: <strong>{repCount}</strong></p>
            {currentExercise.weighted ? (
              <p>Weight: <strong>{repWeight}</strong></p>
              ) : (
              <p>Body weight</p>
            )}
            <button
              onClick={() => {
                setNumberOfSets(numberOfSets + 1);
                handleSaveSet({
                  exercise: currentExercise.name,
                  reps: repCount,
                  weight: repWeight,
                });
              }}
            >
              Count this set
            </button>
            <p>{numberOfSets}</p>
            {numberOfSets > 0 && (
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
        ) : null
        }
      </div>
    </div>
  )
}

export default CurrentExercise;

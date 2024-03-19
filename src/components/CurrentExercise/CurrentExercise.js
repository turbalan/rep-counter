import React from 'react';
import { WorkoutsContext } from '../WorkoutProvider';
import CountInput from '../CountInput/CountInput';

const INITIAL_STATE = {
  repCount: 0,
  repWeight: 0,
  numberOfSets: 0
}

function reducer (state, action) {
  switch (action.type) {
    case ('set-weight'): {
      return {
        ...state,
        repWeight: action.value
      }
    }
    case ('set-reps'): {
      return {
        ...state,
        repCount: action.value
      }
    }
    case ('count-set'): {
      return {
        ...state,
        numberOfSets: state.numberOfSets + 1,
      }
    }
    case ('clear-sets'): {
      return {
        ...state,
        numberOfSets: 0
      }
    }
    default: return state;
  }
}

function CurrentExercise({currentExercise, setCurrentExercise}) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const { repCount, repWeight, numberOfSets } = state;

  const { handleCompleteExercise } = React.useContext(WorkoutsContext);
  const { workoutStatus, setWorkoutStatus, STATUS } = React.useContext(WorkoutsContext);
  
  const weightInputRef = React.useRef();
  const repInputRef = React.useRef();

  function handleRepCount(value) {
    dispatch({
      type: 'set-reps',
      value: value
    })
  }

  const handleWeight = (value) => {
    dispatch({
      type: 'set-weight',
      value: value
    })
  }

  const countSet = () => {
    dispatch({
      type: 'count-set',
    })
  }

  const clearSets = () => {
    dispatch({
      type: 'clear-sets'
    })
  }

  React.useEffect(() => {
    if (!currentExercise.weighted) {
      handleRepCount(0);
    }
  }, [currentExercise.weighted]);

  React.useEffect(() => {
    console.log(currentExercise);
    Object.hasOwn(currentExercise, 'name') && repInputRef?.current && repInputRef?.current.focus();
  }, [currentExercise]);

  const cleanupSets = () => {
    localStorage.removeItem('sets');
    clearSets();
    setCurrentExercise({});
    handleRepCount(0);
    handleWeight(0);
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
              setCount={handleRepCount}
              reference={repInputRef}
            />
            {currentExercise.weighted ? (
              <CountInput
                message={`What's the weight?`}
                count={repWeight}
                setCount={handleWeight}
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
                countSet()
                handleSaveSet({
                  exercise: currentExercise.name,
                  reps: repCount,
                  weight: currentExercise.weighted ? repWeight : 'Body weight',
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
                    cleanupSets();
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

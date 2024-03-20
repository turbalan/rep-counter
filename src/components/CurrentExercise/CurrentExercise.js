import React from 'react';
import { produce } from 'immer';
import { WorkoutsContext } from '../WorkoutProvider';
import RepCountField from './RepCountField';
import RepWeightField from './RepWeightField';

const INITIAL_STATE = {
  repCount: 0,
  repWeight: 0,
  numberOfSets: 0
}

function reducer (state, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ('set-weight'): {
        draft.repWeight = action.value;
        break;
      }
      case ('set-reps'): {
        draft.repCount = action.value
        break;
      }
      case ('count-set'): {
        draft.numberOfSets +=1;
        break;
      }
      case ('clear-sets'): {
        draft.numberOfSets = 0;
        break;
      }
      default: return draft;
    }
  })
}

function CurrentExercise({currentExercise, setCurrentExercise}) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const { repCount, repWeight, numberOfSets } = state;
  const { handleCompleteExercise, workoutStatus, setWorkoutStatus, STATUS } = React.useContext(WorkoutsContext);
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
      <p>{currentExercise.name}</p>
      <RepCountField repCount={repCount} handleRepCount={handleRepCount} ref={repInputRef} />
      <RepWeightField weighted={currentExercise.weighted} name={currentExercise.name} repWeight={repWeight} handleWeight={handleWeight} ref={weightInputRef} handleMakeWeighted={handleMakeWeighted}/>
      {workoutStatus === STATUS.idle ? (
        <div>
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
  )
}

export default CurrentExercise;

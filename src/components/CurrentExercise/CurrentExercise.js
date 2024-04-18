import React from 'react';
import './styles.css';
import { produce } from 'immer';
import { WorkoutsContext } from '../WorkoutProvider';
import RepCountField from './RepCountField';
import RepWeightField from './RepWeightField';
import ExerciseControls from './ExerciseControls/ExerciseControls';

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

function CurrentExercise({ currentExercise, setCurrentExercise }) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const { repCount, repWeight, numberOfSets } = state;
  const { handleCompleteExercise, workoutStatus, setWorkoutStatus, STATUS } = React.useContext(WorkoutsContext);
  const weightInputRef = React.useRef();
  const repInputRef = React.useRef();

  React.useEffect(() => {
    if (!currentExercise.weighted) {
      handleRepCount(0);
    }
  }, [currentExercise.weighted]);

  React.useEffect(() => {
    console.log(currentExercise);
    Object.hasOwn(currentExercise, 'name') && repInputRef?.current && repInputRef?.current.focus();
  }, [currentExercise]);

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

  const cleanupSets = () => {
    localStorage.removeItem('sets');
    clearSets();
    setCurrentExercise({});
    handleRepCount(0);
    handleWeight(0);
  };

  const handleSaveSets = () => {
    const setToSave = {
      exercise: currentExercise.name,
      reps: repCount,
      weight: currentExercise.weighted ? repWeight : 'Body weight',
      sets: numberOfSets,
    }
    localStorage.setItem('sets', JSON.stringify(setToSave));
  };

  const handleMakeWeighted = () => {
    setCurrentExercise((oldExercise) => {
      const newExercise = { ...oldExercise, weighted: true }
      return newExercise;
    });
    weightInputRef?.current?.focus();
  }

  const handleSaveWorkout = () => {
    handleSaveSets();
    handleCompleteExercise();
    cleanupSets();
    setWorkoutStatus(STATUS.idle)
  }

  return (
    <section className='current-exercise'>
      <p>{currentExercise.name}</p>
      <RepCountField repCount={repCount} handleRepCount={handleRepCount} ref={repInputRef} />
      <RepWeightField weighted={currentExercise.weighted} name={currentExercise.name} repWeight={repWeight} handleWeight={handleWeight} ref={weightInputRef} handleMakeWeighted={handleMakeWeighted}/>
      <ExerciseControls handleSaveSets={handleSaveSets} handleSaveWorkout={handleSaveWorkout} currentExercise={currentExercise} countSet={countSet} repCount={repCount} repWeight={repWeight} numberOfSets={numberOfSets} />
    </section>
  )
}

export default CurrentExercise;

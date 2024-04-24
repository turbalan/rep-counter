import React from 'react';
import ExerciseListItem from '../ExerciseListItem';
import styles from './OtherExercise.module.css';

function OtherExerciseItem({ setCurrentExercise }) {
  const [otherExercise, setOtherExercise] = React.useState({name: '', weighted: false});
  const otherExerciseRef = React.useRef();

  return (
    <div className='exercises-list-container'>
      <p>Enter Manually</p>
      <div className={styles.exercise}>
        <label htmlFor='otherExercise'>
          Exercise: {' '}
          <input
            ref={otherExerciseRef}
            id='otherExercise'
            type='text'
            value={otherExercise ? otherExercise.name : ''}
            onChange={(event) => {
              setOtherExercise((otherExercise) => {
                return {...otherExercise, name: event.target.value}
              })}
            }
          />
        </label>
      </div>
      {otherExercise.name
        ? <ExerciseListItem
            exercise={otherExercise}
            weighted={otherExercise.weighted}
            setCurrentExercise={setCurrentExercise}
        />
        : null
      }
    </div>
  )
}

export default OtherExerciseItem;

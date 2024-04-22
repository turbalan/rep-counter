import React from 'react';
import ExerciseListItem from '../ExerciseListItem';
import styles from './OtherExercise.module.css';

function OtherExerciseItem({ setCurrentExercise }) {
  const [otherExercise, setOtherExercise] = React.useState({name: '', weighted: true});
  const otherExerciseRef = React.useRef();

  return (
          <div className='exercises-list-container'>
            <p>Enter Manually</p>
            <ul className={styles.other}>
              <li>
                <label htmlFor='other-exercise-weighted'>
                  <input
                    id="other-exercise-weighted"
                    type='radio'
                    name="otherEcerciseWeighted"
                    value={true}
                    checked={otherExercise?.weighted === true}
                    onChange={() => {
                      setOtherExercise((otherExercise) => {
                        const localExercise = {...otherExercise, weighted: true}
                        return localExercise;
                      })
                    }}
                  />
                  {' '}
                  Weighted
                </label>
              </li>
              <li>
                <label htmlFor='other-exercise-bodyweight'>
                  <input
                    id="other-exercise-bodyweight"
                    type='radio'
                    name="otherEcerciseWeighted"
                    value={false}
                    checked={otherExercise?.weighted === false}
                    onChange={() => {
                      setOtherExercise((otherExercise) => {
                        const localExercise = {...otherExercise, weighted: false}
                        return localExercise;
                      })
                    }}
                  />
                  {' '}
                  Body Weight 
                </label>
              </li>
            </ul>
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

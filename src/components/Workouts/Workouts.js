import React from 'react';

import { WorkoutsContext } from '../WorkoutProvider';

function Workouts() {
  const { storedExercises } = React.useContext(WorkoutsContext);

  if (storedExercises.length === 0) { return <p>No workouts still...</p> }
  return storedExercises.map((exercise, index) => 
    (
      <div key={index}>
      <h2>{exercise[0].exercise}</h2>
      <p>
      Sets: {exercise.length}, Weight: {exercise[0].weight}
      </p>
      </div>
    )
  )
}

export default Workouts;

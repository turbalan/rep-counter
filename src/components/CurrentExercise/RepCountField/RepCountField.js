import React from 'react';
import CountInput from '../../CountInput'
import { WorkoutsContext } from '../../WorkoutProvider';

const RepCountField = React.forwardRef(({ repCount, handleRepCount }, ref) => {
  const { workoutStatus, STATUS } = React.useContext(WorkoutsContext);

  if (workoutStatus === STATUS.idle) { 
    return (
      <CountInput 
        message={'How many reps?'}
        count={repCount}
        setCount={handleRepCount}
        ref={ref}
      />
    )
  }
  if (workoutStatus === STATUS.working) {
    return (
      <p>Reps: <strong>{repCount}</strong></p>
    )
  }
});

export default RepCountField;

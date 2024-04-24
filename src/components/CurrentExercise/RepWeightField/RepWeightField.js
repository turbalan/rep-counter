import React from 'react';
import CountInput from '../../CountInput';
import { WorkoutsContext } from '../../WorkoutProvider';

const RepWeightField = React.forwardRef((props, ref) => {
  const { weighted, handleMakeWeighted, name, repWeight, handleWeight } = props;
  const { workoutStatus, STATUS } = React.useContext(WorkoutsContext);

  if (workoutStatus === STATUS.idle) { 
    return weighted ? (
        <CountInput
          message={`What's the weight?`}
          count={repWeight}
          setCount={handleWeight}
          ref={ref}
        />
    ) : (
      <>
        <p>Make the {name} weighted?</p>
        <button onClick={handleMakeWeighted}>
          Make Weighted
        </button>
      </>
    )
  }
  if (workoutStatus === STATUS.working) {
    return weighted ? (
      <p>Weight: <strong>{repWeight}</strong> kg</p>
      ) : (
      <p>Body weight</p>
    )
  }
});

export default RepWeightField;

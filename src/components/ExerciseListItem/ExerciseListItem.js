import React from 'react';

function ExerciseListItem({ exercise, weighted, setCurrentExercise }) {
  const { name } = exercise;

  return (
    <button
      onClick={() => {
        setCurrentExercise({ ...exercise, weighted });
      }}
    >
      {name}
    </button>
  );
}

export default ExerciseListItem;

import React from 'react';

function Exercise({ exercise, weighted, setCurrentExercise }) {
  const { name } = exercise;

  return (
    <button
      onClick={(event) => {
        setCurrentExercise({ ...exercise, weighted });
      }}
    >
      {name}
    </button>
  );
}

export default Exercise;

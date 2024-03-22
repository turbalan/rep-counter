import React from 'react';

function ExerciseListItem({ exercise, weighted, setCurrentExercise }) {
  const { name } = exercise;

  return (
    <button
      onClick={() => {
        setCurrentExercise({ ...exercise, weighted, sets: 0 });
      }}
    >
      {name}
    </button>
  );
}

export default ExerciseListItem;

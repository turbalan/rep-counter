import React from 'react';

export const STATUS = {
  idle: 'IDLE',
  working: 'WORKING',
  complete: 'COMPLETED',
};

export const WorkoutsContext = React.createContext();
function WorkoutProvider({ children }) {
  const [storedExercises, setStoreExercises] = React.useState([]);
  const [workoutStatus, setWorkoutStatus] = React.useState(STATUS.idle);

  const getStoredExercises = () => {
    let locallyStoredExercises =
      JSON.parse(localStorage.getItem('exercises')) || [];
    return locallyStoredExercises;
  };

  const handleCompleteExercise = () => {
    let storedSets = JSON.parse(localStorage.getItem('sets'));
    let locallyStoredExercises = getStoredExercises();

    if (locallyStoredExercises.length > 0) {
      locallyStoredExercises = [...locallyStoredExercises, storedSets];
    } else {
      locallyStoredExercises.push(storedSets);
    }

    localStorage.setItem('exercises', JSON.stringify(locallyStoredExercises));
    setStoreExercises(locallyStoredExercises);
  };

  React.useEffect(() => {
    let mountedExercises = getStoredExercises();
    setStoreExercises(() => {
      return mountedExercises;
    });
  }, []);

  React.useEffect(() => {
    console.log(storedExercises);
  }, [storedExercises]);

  const value = { 
    storedExercises, 
    getStoredExercises,
    handleCompleteExercise,
    STATUS,
    workoutStatus,
    setWorkoutStatus
  }

  return (
    <WorkoutsContext.Provider
      value={value}
    >
      {children}
    </WorkoutsContext.Provider>
  );
}

export default WorkoutProvider;

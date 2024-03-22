import React from 'react';

const STATUS = {
  idle: 0,
  working: 1,
  complete: 2,
};

export const WorkoutsContext = React.createContext();

function WorkoutProvider({ children }) {
  const [storedExercises, setStoredExercises] = React.useState([]);
  const [workoutStatus, setWorkoutStatus] = React.useState(STATUS.idle);

  const getStoredExercises = () => {
    return JSON.parse(localStorage.getItem('exercises')) || [];
  };

  const getStoredTrainingLog = () => {
    return JSON.parse(localStorage.getItem('traininglog')) || [];
  }

  const handleCompleteExercise = () => {
    let storedSets = JSON.parse(localStorage.getItem('sets'));
    let locallyStoredExercises = getStoredExercises();

    if (locallyStoredExercises.length > 0) {
      locallyStoredExercises = [...locallyStoredExercises, storedSets];
    } else {
      locallyStoredExercises.push(storedSets);
    }

    localStorage.setItem('exercises', JSON.stringify(locallyStoredExercises));
    setStoredExercises(locallyStoredExercises);
  };

  const handleLogTraining = () => {
    const exercises = getStoredExercises();
    if (exercises.length === 0) return;
    let localTrainings = getStoredTrainingLog();
    const date = new Date();
    const trainingTitle = `Training session ${date.toLocaleString()}`
    const session = {
      title: trainingTitle,
      date: date,
      exercises: exercises
    };
    localTrainings = [...localTrainings, session];
    localStorage.setItem('traininglog', JSON.stringify(localTrainings));
    localStorage.removeItem('exercises');
    setWorkoutStatus(STATUS.complete);
    setStoredExercises([]);
  }

  React.useEffect(() => {
    setStoredExercises(() => {
      return getStoredExercises()
    });
  }, []);

  React.useEffect(() => {
    console.table('Stored Exercises:', storedExercises);
  }, [storedExercises]);

  const value = { 
    storedExercises, 
    getStoredExercises,
    getStoredTrainingLog,
    handleCompleteExercise,
    handleLogTraining,
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

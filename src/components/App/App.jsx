import React from 'react';
import Set from '../Set';
import Workouts from '../Workouts';
import WorkoutProvider from '../WorkoutProvider';
import TrainingLog from '../TrainingLog';

function App() {
  return (
    <WorkoutProvider>
      <Set />
      <Workouts />
      <TrainingLog />
    </WorkoutProvider>
  );
}

export default App;

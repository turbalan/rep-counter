import React from 'react';
import Set from '../Set';
import Workouts from '../Workouts';
import WorkoutProvider from '../WorkoutProvider';

function App() {
  return (
    <WorkoutProvider>
      <Set />
      <Workouts />
    </WorkoutProvider>
  );
}

export default App;

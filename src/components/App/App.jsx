import React from 'react';
import Set from '../Set';
import Workouts from '../Workouts';
import WorkoutProvider from '../WorkoutProvider';
import TrainingLog from '../TrainingLog';
import AppWrapper from '../AppWrapper/AppWrapper';

function App() {
  return (
    <WorkoutProvider>
      <AppWrapper>
        <Set />
        <Workouts />
        <TrainingLog />
      </AppWrapper>
    </WorkoutProvider>
  );
}

export default App;

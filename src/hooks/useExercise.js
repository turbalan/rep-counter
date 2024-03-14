export default function useExercises() {
  const getStoredExercises = () => {
    let storedExercises = JSON.parse(localStorage.getItem('exercises')) || [];
    return storedExercises;
  };

  const handleCompleteExercise = () => {
    let storedSets = JSON.parse(localStorage.getItem('sets'));
    console.log(storedSets);
    
    let storedExercises = JSON.parse(localStorage.getItem('exercises')) || [];
    console.log(storedExercises);

    if (storedExercises.length > 0) {
      storedExercises = [...storedExercises, storedSets];
    } else {
      storedExercises.push(storedSets);
    }

    localStorage.setItem('exercises', JSON.stringify(storedExercises));
    console.log(storedExercises);
  };

  return [getStoredExercises, handleCompleteExercise];
}

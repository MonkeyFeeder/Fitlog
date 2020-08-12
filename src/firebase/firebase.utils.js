import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyDceFBzE8z3CR_xJwveLaCRsGslWNOd7zo",
  authDomain: "fitlog-aef73.firebaseapp.com",
  databaseURL: "https://fitlog-aef73.firebaseio.com",
  projectId: "fitlog-aef73",
  storageBucket: "fitlog-aef73.appspot.com",
  messagingSenderId: "105104532718",
  appId: "1:105104532718:web:13316828b45ce34c67bfff"
};

export const createNewWorkoutLog = async (title) => {
  if(!title) {return};

  const newWorkoutLog = await firestore.collection('workoutLogs').add({
    title: title,
  });

  return newWorkoutLog.id;
}

export const createExercise = async (id, name) => {
  if(!id) {return};

  const newExercise = await firestore.collection('workoutLogs').doc(id).collection('exercises').doc(name).set({
    name
  });

  return newExercise;
}

export const getWorkoutLogName = async (id) => {
  if(!id) {return};
  const workoutLogSnapshot = await firestore.collection('workoutLogs').doc(id).get();

  return workoutLogSnapshot.data();
}

export const getWorkoutLogData = async (id) => {
  if(!id) {return};
  const workoutLogSnapshot = await firestore.collection('workoutLogs').doc(id).collection('workouts').get();

  return workoutLogSnapshot;
}

export const getAllWorkouts = async (id) => {
  if(!id) {return};
  

}

export const getAllExercises = async (id) => {
  if(!id) {return};
  
  const allExercisesData = await firestore.collection('workoutLogs').doc(id).collection('exercises').get();

  let exercises = [];

  allExercisesData.docs.forEach(exercise => {
    exercises.push(exercise.data().name);
  });

  return exercises;
}



export const newWorkout = async (id) => {
  await firestore.collection('workoutLogs').doc(id).collection('workouts').doc().set({date: Date.now()});

  console.log('done');
}

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;
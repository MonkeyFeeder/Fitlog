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

  let workouts = [];

  workoutLogSnapshot.docs.forEach(doc => {
    const itemWorkout = {
      id: doc.id,
      date: doc.data().date,
      workout: doc.data()
    }
    workouts.push(itemWorkout);
  });

  return workouts;
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
}

export const addExerciseToWorkout = async (idWorkout, nameExercise, idUser) => {
  if(!idWorkout || !nameExercise) {return};

  await firestore.collection('workoutLogs').doc(idUser).collection('workouts').doc(idWorkout).collection('exercises').doc(nameExercise).set({name: nameExercise});
}

export const getWorkoutData = async (userId, idWorkout) => {
  if(!idWorkout) {return}

  let workoutExercisesData = [];

  const workoutExercises = await firestore.collection('workoutLogs').doc(userId).collection('workouts').doc(idWorkout).collection('exercises').get();

  workoutExercises.docs.forEach(async doc => {
    workoutExercisesData.push(doc.data());
    // const name = doc.data().name;
    // const workoutExercisesDetails = await firestore.collection('workoutLogs').doc(userId).collection('workouts').doc(idWorkout).collection('exercises').doc(name).
  });



  return workoutExercisesData;
}

export const addNewSet = async (userId, workoutId, name, setNotation) => {
  if(userId && workoutId && name !== '' && setNotation !== '') {
    await firestore.collection('workoutLogs').doc(userId).collection('workouts').doc(workoutId).collection('exercises').doc(name).update({
      sets: firebase.firestore.FieldValue.arrayUnion(setNotation)
    })
  }
}

export const getSetsByExercise = async (userId, workoutId, name) => {
  if(userId && workoutId && name !== '') {
    const sets = await firestore.collection('workoutLogs').doc(userId).collection('workouts').doc(workoutId).collection('exercises').doc(name).get();
    if(sets.data().sets) {
      let setList = []
      sets.data().sets.forEach(set => {
        const splitSet = set.split(/\+|=/);
        // console.log(splitSet);
        // if(splitSet.length === 2) {
        //   setList.push({
        //     numberset: splitSet[0],
        //     weight: splitSet[1],
        //     reps: splitSet[2]
        //   })
        // } else 
        if (splitSet.length === 4) {
          setList.push({
            numberset: splitSet[0],
            weight: splitSet[1],
            reps: splitSet[2],
            volume: splitSet[3]
          })
        }
      })
      return setList;
    }
  }
}

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;
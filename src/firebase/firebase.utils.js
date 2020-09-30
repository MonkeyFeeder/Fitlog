import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "fitlog-aef73.firebaseapp.com",
  databaseURL: "https://fitlog-aef73.firebaseio.com",
  projectId: "fitlog-aef73",
  storageBucket: "fitlog-aef73.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID
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
  
  workouts.sort(function(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })

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
    const deconstructedSet = setNotation.split(/\+|=/);
    await firestore.collection('workoutLogs').doc(userId).collection('workouts').doc(workoutId).collection('exercises').doc(name).set({
      volume: firebase.firestore.FieldValue.increment(parseInt(deconstructedSet[3]))
    }, { merge: true })
  }
}

export const getSetsByExercise = async (userId, workoutId, name) => {
  if(userId && workoutId && name !== '') {
    const sets = await firestore.collection('workoutLogs').doc(userId).collection('workouts').doc(workoutId).collection('exercises').doc(name).get();
    if(sets.data().sets) {
      let setList = []
      sets.data().sets.forEach(set => {
        const splitSet = set.split(/\+|=/);
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

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const getVolumesForExercises = async (name, userId) => {
  const workouts = await firestore.collection('workoutLogs').doc(userId).collection('workouts').get();

  let volumeArray = [];

  await asyncForEach(workouts.docs, async (workout) => {
    const workoutDocs = await firestore.collection('workoutLogs').doc(userId).collection('workouts').doc(workout.id).collection('exercises').get();

    await asyncForEach(workoutDocs.docs, async (workoutExercise) => {
      const workoutExerciseData = workoutExercise.data();

      if(workoutExerciseData.name === name) {
        const workoutData = workout.data();

        const dataToPush = {
          name: workoutData.date,
          uv: workoutExerciseData.volume
        }

        volumeArray.push(dataToPush);
      }
    })
  })

  volumeArray.sort(function(a, b) {
    return new Date(a.name).getTime() - new Date(b.name).getTime();
  })

  return volumeArray;
}

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;
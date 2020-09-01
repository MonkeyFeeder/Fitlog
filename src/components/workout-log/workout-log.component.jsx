import React, { useEffect, useState } from 'react';
import {
  useParams
} from 'react-router-dom';

import './workout-log.styles.scss';

import { getWorkoutLogData, getWorkoutLogName, newWorkout, createExercise } from '../../firebase/firebase.utils'; 

// import ClassicButton from '../classic-button/classic-button.component;
import ClassicInput from '../classic-input/classic-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import WorkoutLogContent from '../workout-log-content/workout-log-content.component';

const WorkoutLog = () => {
  let {id} = useParams();
  const [workoutData, setWorkoutData] = useState({
    title: '',
    workouts: []
  });
  const [newExerciseName, setNewExercise] = useState('');
  const [modalHidden, setModalHidden] = useState({
    createExercise: true,
    addExercise: true
  });

  const handleModalHiddenChange = event => {
    const { id } = event.target;

    setModalHidden({
      ...modalHidden,
      [id]: !modalHidden[id]
    })
  }

  const handleCreateExerciseChange = event => {
    setNewExercise(event.target.value);
  }

  const submitCreateExercise = async (id, newExerciseName) => {
    await createExercise(id, newExerciseName);

    setNewExercise('');
    setModalHidden({
      ...modalHidden,
      createExercise: true
    })
    document.querySelector('#inputCreateExercise').value = '';
  }

  const createNewWorkout = (id) => {
    try {
      newWorkout(id);
      fetchWorkoutData(id);
    } catch(err) {
      console.log(err);
    }
  }

  const fetchWorkoutData = async (id) => {
    const workoutLogName = await getWorkoutLogName(id);
    const workoutDataReceived = await getWorkoutLogData(id);
    
    setWorkoutData({
      title: workoutLogName.title,
      workouts: workoutDataReceived
    })
  }

  useEffect(() => {
    try{
      fetchWorkoutData(id);
    } catch(err) {
      console.log(err);
    }
  }, [id])

  return(
    <div className="workout-log">
      <div className="option-bar">
        <div id="createExercise" onClick={handleModalHiddenChange}>Create exercise
          <div className={`modal-exercise ${!modalHidden.createExercise ? '' : 'hidden'}`}>
            <h2>Create exercise</h2>
            <ClassicInput type="text" id="inputCreateExercise" onChange={handleCreateExerciseChange} />
            <SubmitButton onClick={() => submitCreateExercise(id, newExerciseName)}>Create exercise</SubmitButton>
          </div>
        </div>
          
        <div id="addWorkout" onClick={() => createNewWorkout(id)}>Add workout</div>
      </div>
      <h1>{workoutData.title}</h1>
      <WorkoutLogContent workouts={workoutData.workouts} />
    </div>
  )
};

export default WorkoutLog;
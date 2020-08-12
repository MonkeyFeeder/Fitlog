import React, { useEffect, useState } from 'react';
import {
  useParams
} from 'react-router-dom';

import './workout-log.styles.scss';

import { getWorkoutLogData, getWorkoutLogName, newWorkout, createExercise, getAllExercises } from '../../firebase/firebase.utils'; 

// import ClassicButton from '../classic-button/classic-button.component;
import ClassicInput from '../classic-input/classic-input.component';
import SubmitButton from '../submit-button/submit-button.component';

const WorkoutLog = () => {
  let {id} = useParams();
  const [workoutData, setWorkoutData] = useState({});
  const [exercisesData, setExercisesData] = useState([]);
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
    document.querySelector('#inputCreateExercise').value = '';
  }

  const createNewWorkout = (id) => {
    newWorkout(id);
  }

  useEffect(() => {
    const fetchWorkoutData = async (id) => {
      const workoutLogName = await getWorkoutLogName(id);
      // const workoutDataReceived = await getWorkoutLogData(id);
      
      setWorkoutData({
        ...workoutData,
        'title': workoutLogName.title,
      })
      // console.log(workoutDataReceived);
    }

    const fetchExercises = async (id) => {
      const exercises = await getAllExercises(id);

      setExercisesData(exercises);
    }

    fetchWorkoutData(id);
    fetchExercises(id);
  }, [setWorkoutData])

  return(
    <div className="workout-log">
      {
        // console.log(workoutData)
      }
      <div className="option-bar">
        <div id="createExercise" onClick={handleModalHiddenChange}>Create exercise
          <div className={`modal-exercise ${!modalHidden.createExercise ? '' : 'hidden'}`}>
            <h2>Create exercise</h2>
            <ClassicInput type="text" id="inputCreateExercise" onChange={handleCreateExerciseChange} />
            <SubmitButton onClick={() => submitCreateExercise(id, newExerciseName)}>Create exercise</SubmitButton>
          </div>
        </div>
        
        <div id="addExercise" onClick={handleModalHiddenChange}>Add exercise to workout
          <div className={`modal-exercise ${!modalHidden.addExercise ? '' : 'hidden'}`}>
            <h2>Add exercise</h2>
            <ClassicInput type="text" />
            <select type="select">
              {
                exercisesData.map(exercise => {
                  return <option>{exercise}</option>
                })
              }
              <option></option>
            </select>
            <SubmitButton>Add exercise</SubmitButton>
          </div>
        </div>
          
        <div id="addWorkout" onClick={() => createNewWorkout(id)}>Add workout</div>
      </div>
      <h1>{workoutData.title}</h1>
      
    </div>
  )
};

export default WorkoutLog;
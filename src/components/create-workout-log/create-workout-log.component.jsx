import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './create-workout-log.styles.scss';

import ClassicInput from '../classic-input/classic-input.component';
import SubmitButton from '../submit-button/submit-button.component';

import { createNewWorkoutLog } from '../../firebase/firebase.utils';

const CreateWorkoutLog = ({ handleLogCreation }) => {
  const [title, setTitle] = useState('');
  const [hidden, setHidden] = useState(true);
  const [workoutLogId, setId] = useState('');

  const onChangeHandler = (event) => {
    setTitle(event.target.value);
  }

  const createWorkoutLog = async () => {
    const workoutLogId = await createNewWorkoutLog(title);
    
    setId(workoutLogId);
    setHidden(false);
  }

  return(
    <div className="create-workout-log">
      <h2>Create your own workout log</h2>
      <ClassicInput type="text" onChange={(event) => onChangeHandler(event)} label="Name of your workout log" />
      <SubmitButton type="button" onClick={(title) => createWorkoutLog(title)}>Create</SubmitButton>

      {
        !hidden 
        ? 
        <div>
          <h2>Access it through <Link to={`/Fitlog/${workoutLogId}`}>this link</Link></h2>
          <p>Important : Add it to your bookmark, or save the link somewhere !</p>
        </div>
        : null
      }
      
    </div>
  )
};

export default CreateWorkoutLog;
import React, { useState, useEffect } from 'react';
import {
    useParams
} from 'react-router-dom';

import './item-workout.styles.scss';

import ItemExercise from '../item-exercise/item-exercise.component';
import ClassicButton from '../classic-button/classic-button.component';

import AddExerciseIcon from '../../assets/plus.png';

import {getAllExercises, addExerciseToWorkout, getWorkoutData} from '../../firebase/firebase.utils';

const ItemWorkout = ({ workoutData, date, idWorkout }) => {
    let {id} = useParams();
    const [hiddenAddExercise, setHiddenAddExercise] = useState(true);
    const [exercisesData, setExercisesData] = useState([]);
    const [itemWorkoutData, setItemWorkoutData] = useState({});
    const [newExercise, setNewExercise] = useState('');
    
    const handleHidden = async () => {
        if(hiddenAddExercise === true) {
            await fetchExercises();
        }
        setHiddenAddExercise(!hiddenAddExercise);
    }

    const handleAddExercise = async (workoutId, name, idUser) => {
        addExerciseToWorkout(workoutId, name, idUser);
        fetchItemWorkoutData(id, workoutId);
        setHiddenAddExercise(!hiddenAddExercise);
    }

    const handleChangeSelect = event => {
        setNewExercise(event.target.value);
    }

    const fetchExercises = async () => {
        const exercises = await getAllExercises(id);
        setExercisesData(exercises);
    }

    const fetchItemWorkoutData = async (id, idWorkout) => {
        const workoutData = await getWorkoutData(id, idWorkout);
        setItemWorkoutData(workoutData);
    }

    useEffect(() => {
        fetchItemWorkoutData(id, idWorkout)
    }, [id, idWorkout])

    const dateObject = new Date(date);
    const displayedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;

    return (
        <div className="item-workout">
            <div className="top-bar">
                <p className="date">{displayedDate}</p>

                {
                    // console.log(itemWorkoutData)
                }
                {/* To add : Total volume ? */}
            </div>
            <div className="add-exercise">
                <img src={AddExerciseIcon} className="add-exercise-icon" alt="add an exercise" onClick={handleHidden} />
                <div className={`box ${hiddenAddExercise ? '' : 'opened'}`}>
                    Add an exercise :
                    <div className="select-exercise">
                        <select onChange={handleChangeSelect}>
                            <option>Choose an exercise</option>
                        {
                            exercisesData.map(exercise => {
                                return <option key={exercise}>{exercise}</option>
                            })
                        }
                        </select>
                        <ClassicButton onClick={() => handleAddExercise(idWorkout, newExercise, id)}>OK</ClassicButton>
                    </div>
                </div>
            </div>
            {
                // itemWorkoutData ?
                // itemWorkoutData.map(item => {
                //     return <ItemExercise />
                // })
                // : 'No exercises yet'
                Object.keys(itemWorkoutData).map(item => {
                    const {name, sets} = itemWorkoutData[item];
                    return <ItemExercise key={item} name={name} sets={sets} workoutId={idWorkout} fetchItemWorkoutData={fetchItemWorkoutData} />
                })
            }
        </div>
    )
}

export default ItemWorkout;
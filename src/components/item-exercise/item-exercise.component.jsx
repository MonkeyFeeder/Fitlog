import React, { useState, useEffect } from 'react';
import {
    useParams
} from 'react-router-dom';

import './item-exercise.styles.scss';

import ItemSet from '../item-set/item-set.component.jsx';
import ClassicButton from '../classic-button/classic-button.component';

import { addNewSet } from '../../firebase/firebase.utils';

const ItemExercise = ({ name, sets, workoutId, fetchItemWorkoutData, ...otherProps }) => {
    let {id} = useParams();
    const [totalVolume, setTotalVolume] = useState('');
    const [newSet, setNewSet] = useState({
        weight: '',
        reps: '',
        numberset: '',
    });
    // const [setList, setSetList] = useState([]);

    const handleAddNewSet = async () => {
        const setNotation = `${newSet.numberset}=${newSet.weight}+${newSet.reps}+${newSet.weight * newSet.reps}`;

        try{
            await addNewSet(id, workoutId, name, setNotation);
            await fetchItemWorkoutData(id, workoutId);
        } catch(err) {
            console.log(err);
        }

        setNewSet({
            ...newSet,
            weight: '',
            reps: '',
            numberset: ''
        })
    }

    const handleChangeNewSet = (event) => {
        let { name, value } = event.target;

        if(name === 'weight') {
            value = value.replace(/,/g, '.');
        }

        setNewSet({
            ...newSet,
            [name]: value
        })
    }

    const calculateExerciseVolume = () => {
        if(sets) {
            let volume = 0;
            sets.forEach(set => {
                const deconstructedSet = set.split(/\+|=/);
                volume = volume + parseInt(deconstructedSet[3]);
            })
            setTotalVolume(volume);
        }
    }

    useEffect(() => {
        try {
            calculateExerciseVolume();
        } catch(err) {
            console.log(err);
        }
    })

    return (
        <div className="item-exercise" {...otherProps} >
            <div className="top-bar">
                <h3 className="name">{name}</h3>

                <span>{totalVolume}</span>
            </div>
            <hr />
            <div className="exercise-meta">
                <span>N°</span>
                <span>Weight</span>
                <span>Reps</span>
            </div>
            {
                sets ?
                sets.map(set => {
                    const deconstructedSet = set.split(/\+|=/);
                    // setTotalVolume(totalVolume + deconstructedSet[3]);
                    return <ItemSet key={deconstructedSet[0]} weight={deconstructedSet[1]} reps={deconstructedSet[2]} numberset={deconstructedSet[0]} />
                })
                : null
            }
            <div className="add-new-set">
                <div className="fields">
                    <input type="text" placeholder="Nth set" name="numberset" onChange={(event) => handleChangeNewSet(event)} value={newSet.numberset} />
                    <input type="text" placeholder="Weight" name="weight" onChange={(event) => handleChangeNewSet(event)} value={newSet.weight} />
                    <input type="text" placeholder="Reps" name="reps" onChange={(event) => handleChangeNewSet(event)} value={newSet.reps} />
                </div>
                <ClassicButton onClick={handleAddNewSet}>Add set</ClassicButton>
            </div>
            
        </div>
    )
}

export default ItemExercise;
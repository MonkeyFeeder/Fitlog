import React, { useState, useEffect } from 'react';
import {
    useParams
} from 'react-router-dom';

import './item-exercise.styles.scss';

import ItemSet from '../item-set/item-set.component.jsx';
import ClassicButton from '../classic-button/classic-button.component';

import { addNewSet, getSetsByExercise } from '../../firebase/firebase.utils';

const ItemExercise = ({ name, workoutId, ...otherProps }) => {
    let {id} = useParams();
    // const [totalVolume, setTotalVolume] = useState('');
    const [newSet, setNewSet] = useState({
        weight: '',
        reps: '',
        numberset: '',
    });
    const [setList, setSetList] = useState([]);

    const handleAddNewSet = async () => {
        const setNotation = `${newSet.numberset}=${newSet.weight}+${newSet.reps}+${newSet.weight * newSet.reps}`;
        await addNewSet(id, workoutId, name, setNotation);

        setNewSet({
            ...newSet,
            weight: '',
            reps: '',
            numberset: ''
        })
    }

    const handleChangeNewSet = (event) => {
        const { name, value } = event.target;

        setNewSet({
            ...newSet,
            [name]: value
        })
    }

    const fetchSets = async (id, workoutId, name) => {
        const sets = await getSetsByExercise(id, workoutId, name);
        setSetList(sets);
    }

    // const calculateExerciseVolume = () => {
    //     if(setList) {
    //         let volume = 0;
    //         setList.forEach(set => {
    //             volume = volume + set.volume;
    //         })
    //         setTotalVolume(volume);
    //     }
    // }

    useEffect(() => {
        fetchSets(id, workoutId, name);
    }, [id, name, workoutId, newSet])

    return (
        <div className="item-exercise" {...otherProps} >
            <div>
                <h3 className="name">{name}</h3>
            </div>
            <hr />
            <div className="exercise-meta">
                <span>N°</span>
                <span>Weight</span>
                <span>Reps</span>
            </div>
            {
                setList ?
                setList.map(set => {
                    const { numberset, weight, reps } = set;
                    return <ItemSet key={numberset} weight={weight} reps={reps} numberset={numberset} />
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
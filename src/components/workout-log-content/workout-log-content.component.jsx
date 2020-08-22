import React from 'react';

import './workout-log-content.styles.scss';

import ItemWorkout from '../item-workout/item-workout.component';

const WorkoutLogContent = ({workouts}) => {
    return (
        <div className="workout-log-content">
            {
                workouts.map(workout => {
                    return <ItemWorkout key={workout.id} idWorkout={workout.id} date={workout.date} />
                })
            }
        </div>
    )
}

export default WorkoutLogContent;
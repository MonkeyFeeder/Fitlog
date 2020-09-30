import React, { useState, useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';

import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';

import { getVolumesForExercises ,getAllExercises} from '../../firebase/firebase.utils';

import './chart-with-data.styles.scss';

const ChartWithData = () => {
  let { id } = useParams();
  const [exercisesData, setExercisesData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const feedTheChart = async (name, id) => {
    const volumeData = await getVolumesForExercises(name, id);

    console.log(volumeData);

    volumeData.forEach(volume => {
      const dateObject = new Date(volume.name);
      const displayedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;

      volume.name = displayedDate;
    })

    setChartData(volumeData);
  }

  const handleChange = event => {
    const name = event.target.value;
    feedTheChart(name, id);
  }

  const fetchExercises = async () => {
    const exercises = await getAllExercises(id);
    setExercisesData(exercises);
  }

  useEffect(() => {
    if(exercisesData.length === 0) {
      fetchExercises(id);
    }
  })

  return(
    <div className="chart-with-data">
      <select className="select-exercise" onChange={handleChange}>
        <option>Choose an exercise</option>
        {
          exercisesData ?
          exercisesData.map(exercise => {
              return <option key={exercise}>{exercise}</option>
          })
          : ''
        }
      </select>
      {
        chartData.length ? 
        <LineChart width={800} height={200} data={chartData}>
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="uv" stroke="#ff7f51" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
        : 'Please select an exercise. If you did, you probably haven\'t used this exercise in a workout yet'
      } 
      
    </div>
  )
};

export default ChartWithData;
import React from 'react';

import './charts-page.styles.scss';

import ChartWithData from '../../components/chart-with-data/chart-with-data.component';

const ChartsPage = () => {

    return(
        <div className="charts-page">
            <h1>Charts</h1>
            <h3>See charts showing your evolutions on your exercises</h3>
            <ChartWithData />
        </div>
    )
};

export default ChartsPage;
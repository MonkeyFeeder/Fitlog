import React from 'react';

import './item-set.styles.scss';

const ItemSet = ({ weight, reps, numberset }) => {
    return (
        <div className="item-set">
            <span>{numberset}</span>
            <span>{weight}</span>
            <span>{reps}</span>
        </div>
    )
}

export default ItemSet;
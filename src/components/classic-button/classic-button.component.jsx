import React from 'react';

import './classic-button.styles.scss';

const ClassicButton = ({ children, handleClick, ...otherProps}) => {
    return(
        <button onClick={handleClick} {...otherProps} className="classic-button">
            {children}
        </button>
    )
}

export default ClassicButton;
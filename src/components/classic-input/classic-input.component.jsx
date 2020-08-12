import React from 'react';

import './classic-input.styles.scss';

const ClassicInput = ({ handleChange, label, color, ...otherProps }) => {
  return(
    <div className="classic-input">
      <input onChange={handleChange} {...otherProps} placeholder={label ? label : null} />
    </div>
  )
}

export default ClassicInput;
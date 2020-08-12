import React from 'react';

import './submit-button.styles.scss';

const SubmitButton = ({ children, color, ...otherProps }) => {
  return(
    <div className={`submit-button ${color}`}>
      <button {...otherProps}>{children}</button>
    </div>
  )
}

export default SubmitButton;
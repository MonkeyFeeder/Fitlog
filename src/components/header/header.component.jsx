import React, { useState } from 'react';
import {
  Link,
  useParams
} from 'react-router-dom'; 

import './header.component.scss';

import Logo from '../../assets/logo.png';

import ClassicButton from '../classic-button/classic-button.component';

const Header = () => {
  let {id} = useParams();
  const [hiddenDropdown, setHiddenDropdown] = useState(true);

  const handleHidden = () => {
    setHiddenDropdown(!hiddenDropdown);
  }

  return(
    <header>
      <div className="item-nav">
        <Link to={`/Fitlog/${id}`}>Workout Log</Link>
      </div>
      <img src={Logo} alt="logo" className="item-nav" />
      <div className="misc item-nav">
        <ClassicButton onClick={handleHidden}>Misc <span>&#x25BC;</span></ClassicButton>
        {
          hiddenDropdown ? ''
          : 
          <div className="dropdown">
            <Link to={`/Fitlog/${id}/charts`}>Charts</Link>
            <Link to={`/Fitlog/${id}/resources`}>Resources</Link>
          </div>
        }
      </div>
    </header>
  )
}

export default Header;
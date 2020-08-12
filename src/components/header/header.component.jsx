import React from 'react';

import './header.component.scss';

import Logo from '../../assets/logo.png';

const Header = () => {
  return(
    <header>
      <img src={Logo} alt="logo" />
    </header>
  )
}

export default Header;
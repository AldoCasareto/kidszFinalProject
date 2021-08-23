import React from 'react';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='headerTitle'>
        <span className='headerTitleSm'>KidzPass</span>
        <span className='headerTitleLg'>Activities</span>
      </div>
      <img
        className='headerImg'
        src='https://cdn.cogecolive.com/prod-20200330/article_1585576274559900_940x529.jpeg'
        alt='headerImg'
      />
    </div>
  );
};

export default Header;

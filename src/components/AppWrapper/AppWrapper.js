import React from 'react';
import './styles.css';

function AppWrapper({ children }) {
  return <div className='wrap'>
    {children}
  </div>;
}

export default AppWrapper;

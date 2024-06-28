import {React, useState} from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar'
import './App.css'


function App() {
  const [mode, setMode] = useState('light');
  

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };


  return (
    <>
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />

    </>
  )
}

export default App

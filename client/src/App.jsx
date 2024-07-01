import {React, useState} from 'react';
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom';


function App() {
  const [mode, setMode] = useState('light');
  

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };


  return (
    <>

        <div>
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />
        <div>
        <Outlet/>
        </div>
        </div>
    </>
  )
}

export default App

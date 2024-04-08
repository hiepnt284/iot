import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import Sidebar from './components/Sidebar';
import SensorData from './components/SensorData';
import LedData from './components/LedData';
import Profile from './components/Profile';


function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/sensor" element={<SensorData />} />
        <Route path="/led" element={<LedData />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

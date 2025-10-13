import React, { useState } from 'react'

import WelcomePage from './components/WelcomePage'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import LoginPage from './components/LoginPage';


const AppContent = () => {


return (
  <Router>
          <Routes>
            {<Route exact path="/" element={<WelcomePage/>} />}
            {<Route exact path="/login" element={<LoginPage/>} />}
           
           
          </Routes>
        </Router>

      

)

  
}

export default AppContent
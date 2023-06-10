import { useState } from 'react'
import reactLogo from './assets/react.svg'

import Dashboard from './pages/Dashboard'
import Agendamentos from './pages/Agendamentos'

import LoginScreen from './pages/LoginScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterScreen from './pages/Register';
import GlobalStyle from './globalStyles';

import Navbar from './pages/Navbar'
import Perfil from './pages/Perfil'
import Register from './pages/Register'

import { Circles } from './pages/Components/Circles'
import Templates from './pages/Templates'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={
            <>
              <Navbar />
              <Dashboard />
              {/* <Circles ballCount={4} />  */}
            </>
          } />
          <Route path="/agendamentos" element={
            <>
              <Navbar />
              <Agendamentos />
              {/* <Circles ballCount={4} /> */}
            </>
          } />
          <Route path="/register" element={<RegisterScreen />} />
          <Route element={<LoginScreen />} />
          <Route path="/perfil" element={
            <>
              <Navbar />
              <Perfil />
              <Circles ballCount={4} />
            </>
          } />
          <Route path="/templates" element={
            <>
              <Navbar />
              <Templates />
              <Circles ballCount={4} />
            </>
          } />
        </Routes>
        {/* <LoginScreen />
      <Calendar /> */}
      </Router>
      <GlobalStyle />
    </>
  )
}

export default App

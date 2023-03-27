import { useState } from 'react'
import reactLogo from './assets/react.svg'

import Dashboard from './pages/Dashboard'
import Agendamentos from './pages/Agendamentos/Agendamentos'

import LoginScreen from './pages/LoginScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterScreen from './pages/Register';
import GlobalStyle from './globalStyles';

import Navbar from './pages/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={
            <>
              <Navbar />
              <Dashboard />
            </>
          } />
          <Route path="/agendamentos" element={
            <>
              <Navbar />
              <Agendamentos />
            </>
          } />
         
          <Route path="/register" element={<RegisterScreen />} />
          <Route element={<LoginScreen />} />
        </Routes>
        {/* <LoginScreen />
      <Calendar /> */}
      </Router>
      <GlobalStyle />
    </>
  )
}

export default App

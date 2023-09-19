import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard'
import Agendamentos from './pages/Agendamentos'
import LoginScreen from './pages/LoginScreen'
import Navbar from './pages/Navbar'
import Perfil from './pages/Perfil'
import Templates from './pages/Templates'
import { Circles } from './pages/Components/Circles'
import NotificationConfig from './pages/NotificationConfig'
import RegisterScreen from './pages/Register';

import Gerenciamento from './pages/Gerenciamento';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from './colors';
import { useState } from 'react';


function App() {

  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Router>
          <Routes>
            <Route path="/" element={
              <>
                <LoginScreen />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/register" element={
              <>
                <RegisterScreen />
                {/* <Circles ballCount={4} /> */}
              </>
            } />

            <Route path="/dashboard" element={
              <>
                <Navbar toggleTheme={toggleTheme}/>
                <Dashboard />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/agendamentos" element={
              <>
                <Navbar />
                <Agendamentos />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/perfil" element={
              <>
                <Navbar />
                <Perfil />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/gerenciamento" element={
              <>
                <Navbar />
                <Gerenciamento />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/templates" element={
              <>
                <Navbar />
                <Templates />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/notification" element={
              <>
                <Navbar />
                <NotificationConfig />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
          </Routes>
        </Router>
      
      </ThemeProvider>
    </>
  )
}

export default App

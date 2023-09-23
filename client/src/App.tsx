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

import { lightTheme, lightThemeRed ,darkTheme, vancedTheme } from './colors';
import { useState } from 'react';
import GlobalStyle from './theme/globalStyle'

function App() {

  const [theme, setTheme] = useState(0); // Default theme is 'light'

  // Function to toggle the theme
  const toggleTheme = () => {

    if (theme > 2) {
      setTheme(0);
    }else {
      setTheme(theme + 1);
    }
  };

  const themeArray = [
    lightTheme,
    lightThemeRed,
    darkTheme,
    vancedTheme
  ]

  return (
    <>
      <ThemeProvider theme={themeArray[theme]}>
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
                <Navbar toggleTheme={toggleTheme} />
                <Dashboard />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/agendamentos" element={
              <>
                <Navbar toggleTheme={toggleTheme} />
                <Agendamentos />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/perfil" element={
              <>
                <Navbar toggleTheme={toggleTheme} />
                <Perfil />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/gerenciamento" element={
              <>
                <Navbar toggleTheme={toggleTheme} />
                <Gerenciamento />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/templates" element={
              <>
                <Navbar toggleTheme={toggleTheme} />
                <Templates />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
            <Route path="/notification" element={
              <>
                <Navbar toggleTheme={toggleTheme} />
                <NotificationConfig />
                {/* <Circles ballCount={4} /> */}
              </>
            } />
          </Routes>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}

export default App

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

import { lightTheme, lightThemeRed, darkTheme, vancedTheme } from './colors';
import { useEffect, useState } from 'react';
import GlobalStyle from './theme/globalStyle'
import { toast } from 'react-toastify';

const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);

function App() {

  const [theme, setTheme] = useState(0); // Default theme is 'light'

  const [ThemeName, setThemeName] = useState("LightTheme")


  useEffect(() => {

    const token = localStorage.getItem('gerenciamento-de-salas@v1.2');

    if (token) {

      const userDataJson = JSON.parse(token || '{}');

      const { userData } = userDataJson;

      console.log(userData.theme)

      // const themeResult = userData.theme;

      setTheme(userData.theme);
    }
  }
    , [])

  // Function to toggle the theme
  const toggleTheme = () => {

    //VARIABLES
    const url = apiUrl + "/theme"

    let ThemeValue = theme

    if (theme >= 3) {
      ThemeValue = 0
    } else
      ThemeValue = theme + 1

    setTheme(ThemeValue);

    setThemeName(ThemeNames[ThemeValue])

    //STORAGE THEME CHANGE 
    const storedToken = localStorage.getItem('gerenciamento-de-salas@v1.2');

    const userDataJson = JSON.parse(storedToken || '{}');

    const { userData, token } = userDataJson;

    console.log(userData, token)

    userData.theme = ThemeValue;

    localStorage.setItem('gerenciamento-de-salas@v1.2', JSON.stringify({ userData, token }));

    //REQUEST

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        theme: theme
      }),
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        toast.info('Tema alterado para ' + ThemeNames[ThemeValue] + ' com sucesso!',
          {
            theme: (theme == 0 || theme == 3) ? "light" : "dark"
          }
        )
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  const ThemeNames = [
    "LightTheme",
    "Cookie de Morango",
    "standart darkTheme",
    "VancedTheme"
  ]

  const themeArray = [
    lightTheme,
    lightThemeRed,
    darkTheme,
    vancedTheme
  ]



  return (
    <>
      <ThemeProvider theme={themeArray[theme]} >
        <Router>
          <Routes>
            <Route path="/" element={
              <>
                <LoginScreen
                  theme={themeArray[theme]}
                />
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
                <Dashboard
                  theme={themeArray[theme]}
                  themeName={ThemeName}
                />
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

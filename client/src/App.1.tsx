import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Agendamentos from './pages/Agendamentos';
import LoginScreen from './pages/LoginScreen';
import Navbar from './pages/Navbar';
import Perfil from './pages/Perfil';
import Templates from './pages/Templates';
import NotificationConfig from './pages/NotificationConfig';
import RegisterScreen from './pages/Register';
import Gerenciamento from './pages/Gerenciamento';
import { ThemeProvider } from 'styled-components';
import { lightTheme, lightThemeRed, darkTheme, vancedTheme } from './colors';
import { useEffect, useState } from 'react';
import GlobalStyle from './theme/globalStyle';
import { toast } from 'react-toastify';
import { apiUrl } from './App';

export function App() {

  const [theme, setTheme] = useState(0); // Default theme is 'light'


  useEffect(() => {

    const token = localStorage.getItem('gerenciamento-de-salas@v1.2');

    const userDataJson = JSON.parse(token || '{}');

    const { userData } = userDataJson;

    const themeResult = userData.theme;

    setTheme(themeResult);
  },
    []);

  // Function to toggle the theme
  const toggleTheme = () => {

    //VARIABLES
    const url = apiUrl + "/theme";

    const ThemeNames = [
      "LightTheme",
      "Cookie de Morango",
      "standart darkTheme",
      "VancedTheme"
    ];

    let ThemeValue = theme;

    if (theme >= 3) {
      ThemeValue = 0;
    }
    else
      ThemeValue = theme + 1;

    setTheme(ThemeValue);


    //STORAGE THEME CHANGE 
    const storedToken = localStorage.getItem('gerenciamento-de-salas@v1.2');

    const userDataJson = JSON.parse(storedToken || '{}');

    const { userData, token } = userDataJson;

    console.log(userData, token);

    userData.theme = themeResult;

    localStorage.setItem('gerenciamento-de-salas@v1.1', JSON.stringify({ userData, token }));

    //REQUEST
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        theme: theme
      }),
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        toast.info('Tema alterado para ' + ThemeNames[theme] + ' com sucesso!');
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  const themeArray = [
    lightTheme,
    lightThemeRed,
    darkTheme,
    vancedTheme
  ];

  return (
    <>
      <ThemeProvider theme={themeArray[theme]}>
        <Router>
          <Routes>
            <Route path="/" element={<>
              <LoginScreen />
              {/* <Circles ballCount={4} /> */}
            </>} />
            <Route path="/register" element={<>
              <RegisterScreen />
              {/* <Circles ballCount={4} /> */}
            </>} />

            <Route path="/dashboard" element={<>
              <Navbar toggleTheme={toggleTheme} />
              <Dashboard />
              {/* <Circles ballCount={4} /> */}
            </>} />
            <Route path="/agendamentos" element={<>
              <Navbar toggleTheme={toggleTheme} />
              <Agendamentos />
              {/* <Circles ballCount={4} /> */}
            </>} />
            <Route path="/perfil" element={<>
              <Navbar toggleTheme={toggleTheme} />
              <Perfil />
              {/* <Circles ballCount={4} /> */}
            </>} />
            <Route path="/gerenciamento" element={<>
              <Navbar toggleTheme={toggleTheme} />
              <Gerenciamento />
              {/* <Circles ballCount={4} /> */}
            </>} />
            <Route path="/templates" element={<>
              <Navbar toggleTheme={toggleTheme} />
              <Templates />
              {/* <Circles ballCount={4} /> */}
            </>} />
            <Route path="/notification" element={<>
              <Navbar toggleTheme={toggleTheme} />
              <NotificationConfig />
              {/* <Circles ballCount={4} /> */}
            </>} />
          </Routes>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

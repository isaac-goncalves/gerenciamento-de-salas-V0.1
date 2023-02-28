import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Calendar from './pages/Calendar'
import LoginScreen from './pages/LoginScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterScreen from './pages/Register/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route element={<LoginScreen />} />
      </Routes>
      {/* <LoginScreen />
      <Calendar /> */}
    </Router>
  )
}

export default App

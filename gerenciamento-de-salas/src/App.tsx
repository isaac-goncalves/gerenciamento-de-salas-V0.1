import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import LoginScreen from './pages/LoginScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <LoginScreen />
      </div>
  )
}

export default App

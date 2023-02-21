import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import LoginScreen from './pages/LoginScreen'
import GlobalStyle from './theme/globalStyle';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <GlobalStyle />
      <LoginScreen />
    </div>
  )
}

export default App

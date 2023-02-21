import { useState } from 'react'
import reactLogo from './assets/react.svg'
import LoginScreen from './pages/LoginScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LoginScreen />
    </div>
  )
}

export default App

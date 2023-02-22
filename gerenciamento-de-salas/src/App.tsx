import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Calendar from './pages/Calendar'
import LoginScreen from './pages/LoginScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <LoginScreen /> */}
      <Calendar />
    </div>
  )
}

export default App

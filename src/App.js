import React, { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import ThemeButton from './components/Theme-button'
import { createContext } from 'react'


// create the context
// provide the context
// consume the context

export const ThemeContext = createContext(null)

const App = () => {

  const [theme, setTheme] = useState(false)

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme
    }}>
      <div className="App" style={theme ? {backgroundColor:"#feb300"} : {}}>
        <ThemeButton />
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App
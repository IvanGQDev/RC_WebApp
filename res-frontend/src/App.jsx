import React from 'react'
import Login from "./Components/Login.jsx"
import Dashboard from "./Components/Dashboard.jsx"
import './App.css'

function App() {
  const[isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // Manejo de sesion
    const token = localStorage.getItem('token');
    if(token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  )
}

export default App

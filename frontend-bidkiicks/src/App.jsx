import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const Context = createContext({})

function App() {
  // Data product
  const [products, setProducts] = useState([]);

  // Data user profil
  const [user, setUser] = useState({});

  // Current path
  const [path, setPath] = useState(localStorage.getItem('path')||"/");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/products/search`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
  }, []);

  return (
    <Context.Provider value={{products, setProducts, path, setPath, user, setUser}}>
      <Header />
      <Outlet />
      <Footer />
    </Context.Provider>
  )
}

export default App

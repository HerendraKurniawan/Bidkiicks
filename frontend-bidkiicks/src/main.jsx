import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Help from './pages/Help.jsx';
import Sell from './pages/Sell.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Signup from './pages/Signup.jsx';
import PaymentInfo from './pages/PaymentInfo.jsx';

const routerPath = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/help",
        element: <Help />
      },
      {
        path: "/sell",
        element: <Sell />
      },
      {
        path: "/product/:id",
        element: <Product/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
    children: [
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/register/payment-info",
        element: <PaymentInfo/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routerPath} />
  </React.StrictMode>,
)

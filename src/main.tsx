import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css"
import Home from './routes/Home/Home.tsx'
import Time from './routes/Time/Time.tsx'
import ChatBot from './routes/ChatBot/ChatBot.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login/Login.tsx'
import Registro from './routes/Registro/Registro.tsx'
import App from './App.tsx'
import { LoginProvider } from './context/LoginContext.tsx'
import { ProtectedRoute } from './routes/ProtectedRoute/ProtectedRoute.tsx'

const router = createBrowserRouter([
  { path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: 'time',
        element: <Time/>,
      },
      {
        path: 'chatbot',
        element: <ProtectedRoute><ChatBot/></ProtectedRoute>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'registro',
        element: <Registro/>
      }
    ]    
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router}/>
    </LoginProvider>
  </StrictMode>,
)

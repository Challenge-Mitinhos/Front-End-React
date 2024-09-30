import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css"
import Home from './routes/Home/index.tsx'
import Time from './routes/Time/index.tsx'
import ChatBot from './routes/ChatBot/index.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login/index.tsx'
import Registro from './routes/Registro/index.tsx'
import App from './App.tsx'
import { LoginProvider } from './context/LoginContext.tsx'
import { ProtectedRoute } from './routes/ProtectedRoute/index.tsx'
import Profile from './routes/Profile/index.tsx'

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
        path: 'perfil',
        element: <Profile/>
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

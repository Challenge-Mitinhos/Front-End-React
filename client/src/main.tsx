import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css"
import Home from './routes/Home/Home.tsx'
import Time from './routes/Time/Time.tsx'
import ChatBot from './routes/ChatBot/ChatBot.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login/Login.tsx'
import Registro from './routes/Registro/Registro.tsx'

const router = createBrowserRouter([
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
    element: <ChatBot/>
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: 'registro',
    element: <Registro/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

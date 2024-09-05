import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css"
import Home from './routes/Home/Home.tsx'
import Time from './routes/Time/Time.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: 'time',
    element: <Time/>,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

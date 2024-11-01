import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


import { RouterProvider } from 'react-router-dom'
import router from './router/routes.jsx'
import { GlobalContextProvider } from './contexts/GlobalContext.jsx'
// import { ReactDOM } from 'react'

createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    
  </GlobalContextProvider>
)


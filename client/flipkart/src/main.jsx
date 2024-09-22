import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import Spineer from './Component/Spinner.jsx'
import './index.css'
// import Routing from './Routing.jsx'
import {BrowserRouter} from 'react-router-dom'
import Spinner from './Component/Spinner.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
   
    <Spinner />
  
    </BrowserRouter>
)

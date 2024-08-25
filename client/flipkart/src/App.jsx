import Header from './Component/Header'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Product from './Component/Product'
import ViewCart from './Component/ViewCart'


// import Routing from './Routing'
import {Route,Routes} from 'react-router-dom'
import React from 'react'



function App() {
  return (
    
    <>
     <Routes>
      
    <Route path='/' element={<Header/>} /> 
    <Route path='/login' element={<Login/>} /> 
    <Route path='/signup' element={<Signup/>} /> 
    <Route path='/addProduct' element={<Product/>} /> 
    <Route path='/viewcart' element={<ViewCart/>} /> 




    </Routes>
    </>
  )
}

export default App

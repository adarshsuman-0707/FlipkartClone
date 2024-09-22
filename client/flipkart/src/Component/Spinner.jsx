import React from 'react'
import '../StyleSheet/spinner.css'
import { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import App from '../App'
const Spinner = () => {
    const [showing,setShowing]=useState(true)
    useEffect(()=>{
        setTimeout(()=>{
            setShowing(false);

        },5000)
    })
  return (
   <>
     {showing?  ( <> <div style={{backgroundColor:"black" ,height:"100vh",zIndex:'1',marginTop:""}}>
     <div className="containerji">
  <div className="dot dot-1"></div>
  <div className="dot dot-2"></div>
  <div className="dot dot-3"></div>
</div>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="goo">
      <feGaussianBlur
        result="blur"
        stdDeviation="10"
        in="SourceGraphic"
      ></feGaussianBlur>
      <feColorMatrix
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
        mode="matrix"
        in="blur"
      ></feColorMatrix>
    </filter>
  </defs>
</svg></div>
</>):<><App/></>}
    </>
  )
}

export default Spinner
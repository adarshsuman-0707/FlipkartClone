import React, { useEffect, useState } from 'react'
import Header from './Header'
import '../Component/Signup.css'
import {CircleX} from  'lucide-react'
import {useNavigate } from 'react-router-dom'

import axios from 'axios'
const Signup = () => {
  let navigate=useNavigate();

  // useEffect(()=>{
  //       // Flag to keep track of whether the page has been reloaded
    
  //   localStorage.removeItem("userData")
   
  // },[])


  
  let [data,setData]=useState({firstname:"",lastname:"",email:"",password:"", contact:""});

  function fun1(e) {
    const { name, value } = e.target;

    setData({ ...data, [name]: value })

  }

  const done =async(e)=>{
    e.preventDefault()
console.log(data);
let res=await axios.post("http://localhost:3000/api/signup",data)
if(res.data=="successfully registered"){
  alert("Registered")
  navigate('/login')
}
else{
  alert("Not registered")
}

  }
 
  return (
    <>
    <Header/>
    <div className='Main'> 



    <div className='forms1'>
        <div className='content'>
    <p id="log"> Signup</p><br /><br />
    <p id="con">Get access to your Orders, 
    Wishlist and Recommendations</p>

    <br />
    <img  className = "imgLogo" src="https://t4.ftcdn.net/jpg/03/32/31/65/360_F_332316530_ofa4oQA3ZGWxd4tRLDqKuADfy2hnpWuU.jpg" alt="logo" height={195}/>
    </div></div>
    <div className='forms'>
      <span style={{marginLeft:'450px' ,position:'absolute'}}><a href="/"><CircleX/></a></span>



    <form className="form" onSubmit={done}>
    <p className="title">Signup </p>
    <p className="message">Signup now and get full access to our app. </p>
        <div className="flex" style={{marginLeft:'10px'}}>
        <label>
            <input className="input" type="text"  name="firstname" placeholder=""  onInput={fun1} value={data.firstname} required/>
            <span>Firstname</span>
        </label>

        <label>
            <input className="input" type="text"  name="lastname" placeholder="" onInput={fun1} value={data.lastname}required/>
            <span>Lastname</span>
        </label>
    </div>  
            
    <label>
        <input className="input" type="email" style={{width:'445px'}} name="email" onInput={fun1} value={data.email} placeholder="" required/>
        <span>Email</span>
    </label> 
        
    <label>
        <input className="input" type="password"  style={{width:'445px'}} name="password" onInput={fun1} value={data.password}placeholder="" required/>
        <span>Password</span>
    </label>
    <label>
        <input className="input" type="number" style={{width:'445px'}} name="contact" onInput={fun1} value={data.contact}placeholder="" required/>
        <span>Contact</span>
    </label>
<button className="signupbtn" style={{marginTop:"180px"}}>Submit</button>
    <p className="signin">Already have an acount ? <a href="/login">Signin</a> </p>
</form>
</div>
</div>

    </>
  )
}

export default Signup
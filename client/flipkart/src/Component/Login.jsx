import React from 'react'
import Header from './Header'
import '../Component/Login.css'
import {CircleX} from  'lucide-react'
import {Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const Login = () => {
  
  let navigate = useNavigate()
  let [input, setInput] = useState({
    email: ""
    , password: ""
  })
  function fun1(e) {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value })
    console.log(input);

  }

  const done = async(e) => {
    e.preventDefault();
    console.log(input , "From frontend");
    let res = await axios.post("http://localhost:3000/api/login", input)
    if (res.data == "login") {
      alert("Finally login")
      input = JSON.stringify(input)
     
      localStorage.setItem("userData", input)
      navigate("/")
    }
    else {
      alert("invalid password")
    }
    console.log(res, "From server");

  }
  return (
    <>
    <Header/>
    <div className='Main'> 



    <div className='forms1'>
    <div className='content'>
    <p id="log"> LOGIN</p><br /><br />
    <p id="con">Get access to your Orders, 
    Wishlist and Recommendations</p>

    <br />
    <img  className = "imgLogo" src="https://t4.ftcdn.net/jpg/03/32/31/65/360_F_332316530_ofa4oQA3ZGWxd4tRLDqKuADfy2hnpWuU.jpg" alt="logo" height={195}/>
    </div>
    
    
    </div>









    <div className='forms'>
    
    <form class="form" onSubmit={done}> 
    <span className='close' style={{marginLeft:'480px',paddingRight:'32px',paddingTop:'5px'}}><Link to='/'><CircleX/></Link></span>
        
  <span class="input-span">

    <br></br>
    <br />
    <label for="email" class="label">Email</label>
    <input type="email" name="email" onInput={fun1} value={input.email} id="email" required /></span>
  <span class="input-span">
    <label for="password" class="label">Password</label>
    <input type="password" name="password" onInput={fun1}  value = {input.password} id="password" required/></span>
  <span class="span"><a href="#">Forgot password?</a></span>
  <input class="submit" type="submit" value="Log in" />
  <span class="span">Don't have an account? <a href="/signup">Sign up</a></span>
</form>

    </div>

    </div>
    </>
  )
}

export default Login
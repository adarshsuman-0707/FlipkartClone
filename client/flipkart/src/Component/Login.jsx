import React from 'react'
import Header from './Header'
import '../StyleSheet/Login.css'
import {CircleX} from  'lucide-react'
import {json, Link,useNavigate } from 'react-router-dom'
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
  const predefinedToken = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN1bWFuYWRhc3JoQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWRhcnNoIn0.hy2CfCL63bWqmsB3uhmdyrDU8fLFgvpn2LAKSYsJKC0';

// Function to compare the tokens
function compareTokens(receivedToken) {
    if (receivedToken === predefinedToken) {
        console.log("Tokens match! Access granted.");
        localStorage.setItem('userType',JSON.stringify({
          token: receivedToken,
         role: 'admin',
         access:true
        }))
        return true;
    } else {
      localStorage.setItem('userType',JSON.stringify({
        token: receivedToken,
       role: 'user'
       ,access:false
      }))
        console.log("Tokens do not match! Access denied.");
        return false;
    }
}


  const done = async(e) => {
    e.preventDefault();
    console.log(input , "From frontend");
    let res = await axios.post("http://localhost:3000/api/login", input)
    if (res.data.message == "login") {
      compareTokens(res.data.token);
      alert("Finally login")
      input = JSON.stringify(input)
     
      localStorage.setItem("userData", input)
      navigate("/")
      window.location.reload();
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
    
    <form className="form" onSubmit={done}> 
    <span className='close' style={{marginLeft:'480px',paddingRight:'32px',paddingTop:'5px'}}><Link to='/'><CircleX/></Link></span>
        
  <span className="input-span">

    <br></br>
    <br />
    <label htmlFor="email" className="label">Email</label>
    <input type="email" name="email" onInput={fun1} value={input.email} id="email" required /></span>
  <span className="input-span">
    <label htmlFor="password" className="label">Password</label>
    <input type="password" name="password" onInput={fun1}  value = {input.password} id="password" required/></span>
  <span className="span"><Link to='/forgotpass/send-otp'>Forgot password?</Link></span>
  <input className="submit" type="submit" value="Log in" />
  <span className="span">Don't have an account? <a href="/signup">Sign up</a></span>
</form>

    </div>

    </div>
    </>
  )
}

export default Login
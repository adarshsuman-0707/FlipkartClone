import React, { useState } from 'react';
import '../StyleSheet/ForgotPassword.css'; // Import the CSS file
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    console.log(email , " " , newPassword);
    let Navigate=useNavigate();
    const verifyPasswords = async() => {
        try{
        

          if (newPassword === confirmPassword) {
            setMessage('Passwords match! You can proceed.');  
            let res= await axios.post('http://localhost:3000/api/forgot',{email,newPassword})
            if(res){
              alert("Successfully password change")
              Navigate('/login')
            }
        } else {
            setMessage('Passwords do not match. Please try again.');
        }
        }
        catch(e){
          alert("Email is Not Verified pls reEnter the email");
          
        }
       
    };

    return (
      <>  <Navbar/>   
       <div className="forgot-password-container" id="forgo">
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
                required
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                required
            />
            <button onClick={verifyPasswords} className="submit-button">Change password </button>
            {message && <p className="message">{message}</p>}
        </div>
        </>
    );
};

export default ForgotPassword;

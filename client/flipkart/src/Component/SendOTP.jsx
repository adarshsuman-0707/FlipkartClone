import React, { useState } from 'react';
import axios from 'axios';
import '../StyleSheet/Forgot.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const SendOTP = () => {
    let Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [enable, setEnable] = useState(false);
    const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
    const [otps, setOtps] = useState(''); // Store inputted OTP by user (as a string)
    const [otp, setOtp] = useState(''); // Store OTP from backend (as a string)

    // Function to verify if the email exists
    async function verify() {
        try {
            const check = await axios.post('http://localhost:3000/api/email-verification', { email });
            if (check.data === "User Found") {
                alert("User verified");
                setEnable(true); // Enable sending OTP
            } else {
                alert("User Not Exist. Please sign up.");
                await Navigate('/signup');
            }
        } catch (e) {
            setEnable(false);
            console.log("User not found");
        }
    }

    // Function to match OTP
    const ismatch = async () => {
        console.log("Entered OTP:", otps); // Debugging: log entered OTP
        console.log("Server OTP:", otp); // Debugging: log OTP from server
        // After OTP is successfully verified


        if (otps === otp) {  // Compare as strings
            await Navigate('/forgotpassword');
            localStorage.setItem('otpVerified', JSON.stringify(true));
            console.log("OTP matched");
        } else {
            alert("OTP did not match");
            console.log("OTP did not match");
        }
    }

    // Function to send OTP after email is verified
    const sendOTP = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/send-otp', { email });
            setOtp(response.data.otp.toString()); // Ensure OTP is stored as string
            setOtpSent(true); // Mark that OTP has been sent
            console.log("OTP sent:", response.data.otp); // Debugging: log OTP sent from server
        } catch (error) {
            console.error("Error sending OTP", error);
        }
    };

    return (
        <>
          
            <div className="otp-container">
                <h2>Verify Email</h2>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="otp-input"
                />

                {/* Show Verify button initially */}
                {!enable && (
                    <button onClick={verify} className="otp-button">
                        Verify
                    </button>
                )}

                {/* Show Send OTP button after verification */}
                {enable && !otpSent && (
                    <button onClick={sendOTP} className="otp-button">
                        Send OTP
                    </button>
                )}

                {/* Show message after OTP is sent */}
                {otpSent && <p className="otp-message">OTP has been sent to your email!</p>}

                {/* Show Verify OTP input and button after OTP is sent */}
                {otpSent && (
                    <>
                        <input
                            type="text"  // Use text input to avoid number/string issues
                            placeholder="Enter OTP"
                            value={otps}
                            onChange={(e) => setOtps(e.target.value)}
                            className="otp-input"
                        />
                        <button onClick={ismatch} className="otp-button">
                            Verify OTP
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default SendOTP;

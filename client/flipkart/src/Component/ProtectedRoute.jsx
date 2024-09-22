import React from "react";
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const isloggedin = JSON.parse(localStorage.getItem('userType')); // Ensure you use the correct key
    console.log(isloggedin);
    // Check if isloggedin is valid and has the access property
    return isloggedin && isloggedin.access === true ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedRoute;

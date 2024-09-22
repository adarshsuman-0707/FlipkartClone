import Header from './Component/Header';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Product from './Component/Product';
import ViewCart from './Component/ViewCart';
import Products from './Component/ProductsAll';
import UpdateProduct from './Component/UpdateProduct';
import SendOtp from './Component/SendOTP';
import Forgotpassword from './Component/Forgotpassword';
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './Component/Navbar';
import ProtectedRoute from './Component/ProtectedRoute';
import NotFound from './Component/NotFound';

function App() {
  const userType = JSON.parse(localStorage.getItem('userType'));
  const otpVerified = JSON.parse(localStorage.getItem('otpVerified'));

  let isloggedin = userType?.access;
  let isadmin = userType?.role;

  return (
    <>
      <div>
        {/* Navbar can be shown irrespective of route */}
        <Navbar isloggedin={isloggedin} isadmin={isadmin} />

        <Routes>
          {/* Always accessible routes */}
          <Route path='/' element={<Header />} />
          <Route path='/forgotpass/send-otp' element={<SendOtp />} />

          {/* Unauthenticated routes */}
          {!isloggedin && (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='/addproduct' element={<Navigate to='/' />} />
              <Route path='/products' element={<Navigate to='/'/>} />
              <Route path='/update/product' element={<Navigate to='/'/>} />

            </>
          )}

          {/* otp verification */}
          {!otpVerified ? (
            <Route path='/forgotpassword' element={<Navigate to='/forgotpass/send-otp' />} />
          ) : (
            <Route path='/forgotpassword' element={<Forgotpassword />} />
          )}


          {/* Protected routes */}
          {isloggedin && (
            <Route element={<ProtectedRoute />}>
              <Route path='/addProduct' element={<Product />} />
              <Route path='/viewcart' element={<ViewCart />} />
              <Route path='/products' element={<Products />} />
              <Route path='/update/product' element={<UpdateProduct />} />
              <Route path='/login' element={<Navigate to='/' />} />
              <Route path='/signup' element={<Navigate to='/' />} />
            </Route>
          )}
           <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

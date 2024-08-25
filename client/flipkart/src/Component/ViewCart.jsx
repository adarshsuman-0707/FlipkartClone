import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

const ViewCart = () => {
    const location = useLocation();
    let { cart } = location.state;
    let [getId,setGetId]=useState();
    let [res,setRes]=useState({});

    useEffect(()=>{
setGetId(cart)
        const fetchId=async()=>{
            if(getId){
                try{
          let response=await axios.get(`http://localhost:3000/api/products/${getId}`);
     
         console.log(response);
         setRes(response);
                }
                catch (e){
                    console.log(e);
                }
            }
        };
        // console.log(res);
            
    fetchId();


    },[])
 
  return (
    <div>ViewCart
        {
            <p>{res.name}</p>
        }
    </div>
  )
}

export default ViewCart
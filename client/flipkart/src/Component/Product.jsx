import React, { useState ,useEffect, useLayoutEffect } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gjbteqzcgvndznnfdhbk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqYnRlcXpjZ3ZuZHpubmZkaGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3NzQ1ODIsImV4cCI6MjAzODM1MDU4Mn0.XaLKP0kS6R8Pg2HhwYtLuFRhlfeQ7lhhWFpkX1PsdoM'
const supabase = createClient(supabaseUrl, supabaseKey)

import '../Component/Product.css'
// import { Container } from 'lucide-react';/
const Product = () => {
const [images,setImages] =useState([]);
let [data,setData]=useState([]);

  useEffect(()=>{
    const fetchImage=async()=>{
      let response=await axios.get('http://localhost:3000/api/products');
      response =response.data
      setImages(response)
    };
    fetchImage();
    
  },[])

  let navigate=useNavigate();

    let [input,setInput]=useState({
        name:"",
        brand: "",
        price:"",
        category:"",
        description:"",
        image:""
    })
    function fun1(e) {
        const { name, value } = e.target;
    
        setInput({ ...input, [name]: value })
    }
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      console.log(file);
      setInput({ ...input, image: file });
    };
    const done=async(e)=>{
      e.preventDefault();
      try {
        // Upload image to Supabase
        const { data, error } = await supabase.storage.from('image').upload('product_images/' + input.image.name, input.image);
        if (error) {
          throw error;
        }
        // https://fzdfcdjjbsnwmdvxhfrh.supabase.co/storage/v1/object/public/zomato/restaurant_images/india-flag.jpg
        // Get the URL of the uploaded image
        const imageUrl = `${supabaseUrl}/storage/v1/object/public/image/product_images/${input.image.name}`;
        console.log(imageUrl,"blocking zzzzzzz");
    
        // Save restaurant data to MongoDB with image URL
        const response = await axios.post('http://localhost:3000/api/product', { ...input, image:imageUrl});
        if (response) {
          alert('Restaurant added successfully');
          navigate('/',{state:{cart:images}})
          // Reset form fields
       
        } else {
          alert('Failed to add restaurant');
        }
      } catch (error) {
        console.error('Error adding restaurant:', error);
        alert('Failed to add restaurant');
      }

    }
  return (
    <>   
<Navbar/>
     <div className='container-fluid'>
      <div className='container'>
        <div className='formk'>
      
          <div className='innerform'>
            <br />
         <div className='Head'> <span  align='center'>Product Information</span><span>check</span> </div>
       

        <form onSubmit={done} >
            <div className='alignment'>
            {/* <input type="text" name="name"   onInput={fun1} value={input.name}placeholder='name' id="" /><br /> */}
            <div class="inputContainer">
        <input required="required" name="name"  onInput={fun1} value={input.name} id="inputField" placeholder="Product name" type="text"/>
        <label className="usernameLabel" for="inputField">ProductName</label>
        <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
    </div>
         {/*    <input type="text" name="brand"  onInput={fun1} value={input.brand} placeholder='brand 'id="" /><br /> */}
         <div className="inputContainer">
        <input required="required" id="inputField" placeholder="Brand" name="brand"  onInput={fun1} value={input.brand} type="text"/>
        <label className="usernameLabel" for="inputField">Brand</label>
        <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
    </div>
           
            </div>

            <div className='alignment'>
            <div className="inputContainer">
        <input required="required" id="inputField" placeholder="description" name="description"  onInput={fun1} value={input.description} type="text"/>
        <label className="usernameLabel" for="inputField">Description</label>
        <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
    </div>
    <div className="inputContainer">
        <input required="required" id="inputField" placeholder="price" name="price"  onInput={fun1} value={input.price} type="number"/>
        <label className="usernameLabel" for="inputField">Price</label>
        <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
    </div>
            {/* <input type="number" name="price"  onInput={fun1} value={input.price} placeholder='price 'id="" /><br /> */}
            {/* <input type="text" name="description"   onInput={fun1} value={input.description} placeholder='description' id="" /><br /> */}
            </div>
            <div className='alignment'>
            <div className="inputContainer">
        <input required="required" id="inputField" placeholder="category" name="category"  onInput={fun1} value={input.category} type="text"/>
        <label className="usernameLabel" for="inputField">Category</label>
        <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
    </div>
    <div className="inputContainer">
        <input required="required" id="inputField" name='image' onChange={handleImageChange}  placeholder='image' type="file"/>
        <label className="usernameLabel" for="inputField">Image</label>
        <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
    </div>
            {/* <input type="text" name="category"   onInput={fun1} value={input.category} placeholder='category' id="" /><br />
            <input type="file" name="image"   onChange={handleImageChange}  placeholder='image' id="" /> */}
            </div>
            <br />
            {/* <input type='submit' /> */}
          <div style={{display:"flex", justifyContent:'flex-end'}}>  <button className="btn"> submit</button> </div>


        </form>
</div>
        </div>
        </div>

     </div>


</>

  )
}

export default Product
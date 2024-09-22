import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../StyleSheet/viewcart.css'; // Import CSS file for styles

const ViewCart = () => {
    const location = useLocation();
    const { cart } = location.state;
    const [getId, setGetId] = useState(cart);
    const [res, setRes] = useState(null);
    const [quantity, setQuantity] = useState(1); // Quantity state
    const [isBuying, setIsBuying] = useState(false); // To toggle buy button

    useEffect(() => {
        const fetchId = async () => {
            if (getId) {
                try {
                    let response = await axios.get(`http://localhost:3000/api/products/${getId}`);
                    console.log(response.data);
                    setRes(response.data); // Save the response data, not the entire response object
                } catch (e) {
                    console.log(e);
                }
            }
        };

        fetchId();
    }, [getId]);

    // Function to handle the 'Buy' button click
    const handleBuyClick = () => {
        setIsBuying(true);
    };

    // Function to handle quantity change
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className='container'>
                <div className='innerContainer'></div>
                {res ? (
                    <div className='card'>
                        <img src={res.image} alt={res.name} className='product-image' />
                        <div className='product-details'>
                            <h2>{res.name}</h2>
                            <p><strong>Brand:</strong> {res.brand}</p>
                            <p><strong>Price:</strong> ${res.price}</p>
                            <p><strong>Description:</strong> {res.description}</p>
                            <p><strong>Category:</strong> {res.category}</p>
                            {!isBuying ? (
                                <button className='buy-btn' onClick={handleBuyClick}>Buy Now</button>
                            ) : (
                                <div className='quantity-selector'>
                                    <label htmlFor='quantity'>Quantity:</label>
                                    <input
                                        type='number'
                                        id='quantity'
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min='1'
                                        max='100'
                                    />
                                    <button className='confirm-btn'>Add to Cart</button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default ViewCart;

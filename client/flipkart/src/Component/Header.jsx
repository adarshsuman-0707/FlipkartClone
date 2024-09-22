import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../StyleSheet/Header.css';

const Header = () => {
  const slideContainerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Fetching images from API
  useEffect(() => {
    const fetchImage = async () => {
      let response = await axios.get('http://localhost:3000/api/products');
      response = response.data;
      setImages(response);
    };
    fetchImage();
  }, []);

  // AutoSlide functionality
  useEffect(() => {
    const slideContainer = slideContainerRef.current;
    const autoSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    
    const intervalId = setInterval(autoSlide, 3000); // Autoscroll every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [images.length]);

  // Update the transform style for sliding effect
  useEffect(() => {
    const slideContainer = slideContainerRef.current;
    slideContainer.style.transform = `translateX(-${currentIndex * 300}px)`;
  }, [currentIndex]);

  // Move to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Move to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // View product details
  const View = (id) => {
    navigate("/viewcart", { state: { cart: [id] } });
  };

  return (
    <>
      {/* Category section */}
      <div className='container-fluid secondPart'>
        {/* Repeated category section */}
        <span>
          <img id="imgmaintain" src="https://rukminim2.flixcart.com/flap/72/72/image/29327f40e9c4d26b.png?q=100" /><br />
          <p className='naming'>Grocery</p>
        </span>
        <span>
          <img id="imgmaintain" src="https://rukminim2.flixcart.com/flap/72/72/image/22fddf3c7da4c4f4.png?q=100" /><br />
          <p className='naming'>Mobiles</p>
        </span>
        <span>
          <img id="imgmaintain" src="https://rukminim2.flixcart.com/fk-p-flap/72/72/image/0d75b34f7d8fbcb3.png?q=100" /><br />
          <p className='naming'>Fashion</p>
        </span>
        <span>
        <img id="imgmaintain" src="https://rukminim2.flixcart.com/flap/72/72/image/69c6589653afdb9a.png?q=100" /><br />
        <p className='naming'>Electronics</p>
      </span>
      <span>
        <img id="imgmaintain" src="https://rukminim2.flixcart.com/flap/72/72/image/ab7e2b022a4587dd.jpg?q=100" /><br />
        <p className='naming'>Home&furniture</p>
      </span>
      <span>
        <img id="imgmaintain" src="https://rukminim2.flixcart.com/fk-p-flap/72/72/image/0139228b2f7eb413.jpg?q=100" /><br />
        <p className='naming'>Appliances</p>
      </span>
        {/* Add more categories as needed */}
      </div>

      {/* Carousel Section */}
      <div className="container-fluid" style={{ display: "flex", justifyContent: "center", width: "100%", position: 'relative' }}>
        <div className="container-fluid" style={{ overflow: 'hidden', height: "400px", marginTop: "7px", position: 'relative' }}>
          
          {/* Previous Button */}
          <button 
            style={{ position: 'absolute', top: '50%', left: '0', zIndex: 2, background: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
            onClick={prevSlide}
          >
            &#10094;
          </button>

          {/* Sliding Images */}
          <div
            ref={slideContainerRef}
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 'fit-content',
              gap: '20px',
              transition: 'transform 0.5s ease-in-out',
              marginTop: "5px",
            }}
          >
            {images.map((item, index) => (
              <div className='design_card' key={index} style={{ flexShrink: '0', width: 'fit-content' }} onClick={() => { View(item._id) }}>
                <img className="imgshad" src={item.image}  alt={`slide-${index}`} /><br />
                <div style={{ display: "flex", justifyContent: "space-around", gap: "10px" }}>
                  <span className='textres'>Product: <small style={{fontSize:"14px"}}>{item.name}</small></span>
                  <span className='textres'>Price: $ <small style={{fontSize:"14px"}}>{item.price}</small></span>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button 
            style={{ position: 'absolute', top: '50%', right: '0', zIndex: 2, background: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;

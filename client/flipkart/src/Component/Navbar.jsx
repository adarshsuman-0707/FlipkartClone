import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, ShoppingCart } from 'lucide-react';
import '../StyleSheet/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ isloggedin }) => {
  let [profile, setProfile] = useState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // state to manage mobile menu

  useEffect(() => {
    let name = localStorage.getItem("userData");
    name = JSON.parse(name);
    if (name) {
      setProfile(name.email);
    }
  }, []);

  function fun1() {
    localStorage.clear();
    window.location.reload();
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className='container-fluid' id='nav'>
        <div id='navi' className='container'>
          <div className='logo'>
            <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png' height={20} alt="Logo" />
            <br />
            <span style={{ color: "blue", fontSize: '12px', paddingTop: "-1px", marginTop: '-12px' }}>
              <b>EXPLORE</b> <span style={{ color: "yellow" }}>PLUS</span>
            </span>
          </div>

          {/* Search Box */}
          <div className='outerSearchbody'>         
             <div className='searchBox'>
            <form action="">
              <input className='inp' type="search" placeholder='Search for product, brand and more... ' />
              <Search height={30} style={{ marginTop: '9px' }} type='submit' />
            </form>
          </div>
          </div>

          {/* Toggle Button for Mobile View */}
          <button className='mobile-menu-toggle' onClick={toggleMobileMenu}>
            ☰
          </button>

          {/* Navbar Links - Hidden/Shown based on mobile menu state */}
          <div className={`nav-part2 ${isMobileMenuOpen ? 'open' : ''}`}>
            <div>
              {profile ? (
                <div className="menu">
                  <div className="item">
                    <a href="#" className="link">
                      <span className='B'> {profile} </span>
                      <svg viewBox="0 0 360 360" xmlSpace="preserve">
                        <g id="SVGRepo_iconCarrier">
                          <path
                            id="XMLID_225_"
                            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 
                                c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 
                                s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                          ></path>
                        </g>
                      </svg>
                    </a>
                    <div className="submenu">
                      <div className="submenu-item">
                        <a href="/signup" className="submenu-link" onClick={() => fun1()}> LogOut </a>
                      </div>
                      {isloggedin && (
                        <div className="submenu-item">
                          <a href="/addproduct" className="submenu-link"> Product </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link to='/login' className='Signbutt'>LOGIN</Link>
              )}
            </div>

            <div className='nav-child'>Become a Seller</div>
            <div className='nav-child'>More</div>
            <div className='nav-child' title='cart'>
              <ShoppingCart /> Cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

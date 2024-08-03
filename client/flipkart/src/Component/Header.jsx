import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Search,ShoppingCart} from 'lucide-react'
import '../Component/Header.css'
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import Imageslider from './Imageslider';
const Header = () => {

  let [profile,setProfile]=useState();
  useEffect(()=>{
let name=localStorage.getItem("userData")
name=JSON.parse(name)
if(name){
setProfile(name.email);  
console.log(profile);}
  },[])
  function fun1() {
    localStorage.clear();
    // navigate("/NavBar")
    window.location.reload()
  }

  return (<>
    <div className='container-fluid' id='nav'>
    <div id='navi' className='container'>
       <div> <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png' height={20} />
       <br /> <span style={{color:"blue" ,fontSize:'12px', paddingTop:"-1px",marginTop:'-12px'}}> <b>EXPLORE</b> <span style={{color:"yellow"}}>PLUS</span> </span>
      </div>
       
       <div>      <div className='searchBox'>
       <form action=""> <input className='inp' type="search" placeholder='Search for product , brand and more... '/>< Search height={20} style={{marginTop:'-2px'}} type='submit'/></form>
       </div>
</div>
       <div>
     { profile?  (<><div class="menu">
  <div className="item">
    <a href="#" className="link">
      <span className='B'> {profile} </span>
      <svg viewBox="0 0 360 360" xml:space="preserve">
        <g id="SVGRepo_iconCarrier">
          <path
            id="XMLID_225_"
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          ></path>
        </g>
      </svg>
    </a>
    <div className="submenu">
      <div className="submenu-item">
        <a href="/signup" className="submenu-link" onClick={()=>fun1()} > LogOut </a>
      </div>
      {/* <div className="submenu-item">
        <a href="#" className="submenu-link"> Design </a>
      </div>
      <div className="submenu-item">
        <a href="#" className="submenu-link"> Marketing </a>
      </div>
      <div className="submenu-item">
        <a href="#" className="submenu-link"> SEO </a>
      </div> */}
    </div>
  </div>
</div>
</>):(<> <Link  to='/login' className='Signbutt'> LOGIN</Link></>)}
       </div>
       <div className='nav-child'>
   Become a seller
       </div>
       <div className='nav-child'>
        More
       </div>
       <div className='nav-child' title='cart'>
       <ShoppingCart /> Cart
       </div>
  
    
</div>
</div>

<div className='container secondPart'>
  <span>
<img src="https://rukminim2.flixcart.com/flap/72/72/image/29327f40e9c4d26b.png?q=100"/><br />
<p className='naming'>Grocery</p>
</span>
<span>
<img src="https://rukminim2.flixcart.com/flap/72/72/image/22fddf3c7da4c4f4.png?q=100"/><br />
<p className='naming'>Mobiles</p>
</span>
<span>
<img src="https://rukminim2.flixcart.com/fk-p-flap/72/72/image/0d75b34f7d8fbcb3.png?q=100"/><br />
<p className='naming'>Fashion</p>
</span>
<span>
<img src="https://rukminim2.flixcart.com/flap/72/72/image/69c6589653afdb9a.png?q=100"/><br />
<p className='naming'>Electronics</p>
</span>
<span>
<img src="https://rukminim2.flixcart.com/flap/72/72/image/ab7e2b022a4587dd.jpg?q=100"/><br />
<p className='naming'>Home&furniture</p>
</span>
<span>
<img src="https://rukminim2.flixcart.com/fk-p-flap/72/72/image/0139228b2f7eb413.jpg?q=100"/><br />
<p className='naming'>Appliances</p>
</span><span>
<img src="https://rukminim2.flixcart.com/flap/72/72/image/71050627a56b4693.png?q=100"/><br />
<p className='naming'>Travel</p>
</span>
</div>


<Imageslider/>

</>
  )
}

export default Header
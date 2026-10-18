import React from 'react'
import {Link} from 'react-router-dom';

import heroimg from '../assets/images/hero.jpg'
const HeroSection = () => {
  
   let  category = "fruites"
  return (
   
   <>
      
    <div className='container'>
 <Link key={category.id} to={`/category/${encodeURIComponent(category)}`}  >

    <img src={heroimg} />
    </Link>
    </div>
    
   </>
  )
}

export default HeroSection
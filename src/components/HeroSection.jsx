import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/HeroSection.css'

import heroimg from '../assets/images/hero.jpg'
const HeroSection = () => {
  
   let  category = "fruites"
  return (
   
   <>
      
    <div className='container hero-banner'>
 <Link key={category.id} to={`/category/${encodeURIComponent(category)}`}  >

    <img src={heroimg} />
    </Link>

   
    </div>

   </>
  )
}

export default HeroSection
import React from 'react'
import '../styles/CategoryBanner.css';
import pharma from '../assets/images/pharma.png';
import petFood from '../assets/images/pet-food.png';
import babyCare from '../assets/images/baby-care.png';

const CategoryBanner = () => {



  return (
    <>
        <div className="container category-banner">
            <div className="category-banner-content">
               <img src={pharma} alt="Category 1" />
            </div>
             <div className="category-banner-content">
                <img src={petFood} alt="Category 2" />
            </div>
             <div className="category-banner-content">
                <img src={babyCare} alt="Category 3" />
            </div>
           
        </div>
    </>
  )
}

export default CategoryBanner

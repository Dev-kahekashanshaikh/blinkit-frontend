import React from 'react'
import {Link} from 'react-router-dom';

import '../styles/CategoryBanner.css';
import pharma from '../assets/images/pharma.png';
import petFood from '../assets/images/pet-food.png';
import babyCare from '../assets/images/baby-care.png';

const CategoryBanner = () => {
let categoryPharma = "pharmacy";
let categoryPet = "pet";
let categoryBaby = "babycare";



  return (
    <>
        <div className="container category-banner">
            <div className="category-banner-content">
             <Link key={categoryPharma} to={`/category/${encodeURIComponent(categoryPharma)}`}  >

               <img src={pharma} alt="Category 1" />
               </Link>
            </div>
             <div className="category-banner-content">
<Link key={categoryPet} to={`/category/${encodeURIComponent(categoryPet)}`}  >

                <img src={petFood} alt="Category 2" />  </Link>
            </div>
             <div className="category-banner-content">
 <Link key={categoryBaby} to={`/category/${encodeURIComponent(categoryBaby)}`}  >

                <img src={babyCare} alt="Category 3" />
                  </Link>
            </div>
           
        </div>
    </>
  )
}

export default CategoryBanner

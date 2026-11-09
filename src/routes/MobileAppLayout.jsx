import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SelectedCategoryProducts from '../pages/SelectedCategoryProducts';
import SelectedProduct from '../pages/SelectedProduct';

const MobileAppLayout = () => {
  return (
 <>
       <Routes className="mobile-routes">



  

      {/* Home page */}
      <Route
      index element={<Home />}
      />

      {/* Selected category products */}
      <Route
        path="/category/:categoryName"
        element={<SelectedCategoryProducts />}
      />

      {/* Selected product */}
      <Route
        path="/product/:productId"
        element={<SelectedProduct />}
      />
     

    </Routes>
 </>
  )
}

export default MobileAppLayout

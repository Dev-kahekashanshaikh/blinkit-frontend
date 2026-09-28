
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SelectedCategoryProducts from '../pages/SelectedCategoryProducts';
import SelectedProduct from '../pages/SelectedProduct';
import AppLayout from './AppLayout';

const AppRoutes = () => {
  return (

    <>
    <Routes>



    <Route path="/" element={<AppLayout />} >

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
      </Route>

    </Routes>
    </>
  );
};

export default AppRoutes;


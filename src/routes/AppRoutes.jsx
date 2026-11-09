import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import SelectedCategoryProducts from "../pages/SelectedCategoryProducts";
import SelectedProduct from "../pages/SelectedProduct";

import ResponsiveLayout from "./ResponsiveLayout";

const AppRoutes = () => {

    return (
        <Routes>

            <Route element={<ResponsiveLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/category/:categoryName"
                    element={<SelectedCategoryProducts />}
                />

                <Route
                    path="/product/:productId"
                    element={<SelectedProduct />}
                />

            </Route>

        </Routes>
    );
};

export default AppRoutes;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';

import '../styles/SelectedProduct.css';
import { useCategory } from '../context/CategoryContext';
import ProductsGrid from '../components/ProductsGrid';
import CategoryList from '../components/CategoryList';

const SelectedProduct = () => {


    // Get product ID from URL
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    //================================================================================
    //      get category based producte /  realated products
    //==============================================================================

    const {
        categoryProducts: categoryProducts,
        loading: categoryLoading,
        error: categoryError,
        fetchCategoryProducts: fetchCategoryProducts
    } = useCategory();



//==========================================================
//since we havn't created id based context api so till that 
//use the fetch directly here later we will update that with contextapi
//==================================================================


//create a seprate context for getting product id 

    useEffect(() => {


        const Product = decodeURIComponent(productId);

        setLoading(true);
//https://fakestoreapi.com/products
//https://blinkit-backend-1-e6wf.onrender.com/product/getProductById
//product/getProductById/
        fetch(
            `https://blinkit-backend-1-e6wf.onrender.com/product/getProductById/${Product}`
        )
            .then(response => response.json())
            .then(data => {

                setProduct(data.product);

                setLoading(false);
                console.log("ID based category", data.product.category);

                fetchCategoryProducts(data.product.category);
                // console.log(categoryProducts);
               
            })
            .catch(error => {

                console.error('Error fetching products:', error);

                setLoading(false);

            });

    }, [productId]);


    console.log(product);


    if (loading) {

        return (
            <div className="selected-product-loading">
                <h3>Loading product...</h3>
            </div>
        );

    }


    if (!product) {

        return (
            <div className="selected-product-loading">
                <h3>Product not found</h3>
            </div>
        );

    }


    /*
    =====================================================
        DYNAMIC VALUES
    =====================================================

    Prepare all values here and pass them to ProductCard.
    ProductCard should only display the values.
    */


    const image = product.image;

    const title = product.title;

    const category = product.category;

    const description = product.description;

    const price = product.price;

    const ratingCount = product.rating?.count ?? 0;


    /*
    FakeStore API doesn't provide these fields directly.

    So we create them here instead of inside ProductCard.
    */

    const brand = product.title;

    const packSize = `${ratingCount} pcs`;

    const discount = 41;

    const mrp = Math.round(
        price * (1 + discount / 100)
    );



    // ===========================================================
    // ProductsGrid function handleAdddisplay the action on btn click
    // ==================================================================

    let handleAdd = () => {
        console.log("btn-clicked");
    }


    return (
        <>

        {/*==========================================================
        ProductCard will display single product based on id of selected product
        we are using routes and link to that page
         ========================================================== */}
            <div className='container parent-section'>
                <ProductCard
                    image={image}
                    title={title}
                    category={category}
                    description={description}
                    price={price}
                    mrp={mrp}
                    discount={discount}
                    brand={brand}
                    packSize={packSize}
                    ratingCount={ratingCount}
                />

                <hr></hr>



{/*==================================================================
inside ProductsGrid component pass the any array of products this will 
map that list here we are passing category related data from categoryContext
====================================================================== */}
                <ProductsGrid
                    products={categoryProducts}
                    title="Similar Products"
                    onAdd={handleAdd}
                    loading={categoryLoading}
                />



<CategoryList />



            </div>




        </>



    );
};


export default SelectedProduct;


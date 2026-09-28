
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 import {useProducts} from '../context/ProductContext';

import '../styles/CategoryList.css';

const CategoryList = () => {

//use product is a context for products
  const { products, loading, error } = useProducts();

  const categories = products.filter(
    (product, index, array) =>
      index ===
      array.findIndex(
        item => item.category === product.category
      )
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="container category-list">
      {categories.map((category) => (

        <Link key={category.id} to={`/category/${encodeURIComponent(category.category)}`} className="category-list-content" >
        <div
          className="category-list-content"
          key={category.id}
        >
          <img
            src={category.image}
            alt={`Category ${category.category}`}
          />

          <h3>{category.category}</h3>
        </div></Link>
      ))}
    </div>
  );
};

export default CategoryList;


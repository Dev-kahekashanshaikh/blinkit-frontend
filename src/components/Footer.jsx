import React, { useEffect, useState } from 'react';
import '../styles/Footer.css'
const Footer = () => {
    const [categories, setCategories] = useState([]);
//https://fakestoreapi.com/products
//http://localhost:4000/product/getAllProducts
    useEffect(() => {
        fetch('https://blinkit-backend-1-e6wf.onrender.com/product/getAllProducts').then(response => response.json()).then(data => { // Get only unique category names 
            const uniqueCategories = [...new Set(data.map(product => product.category))]; setCategories(uniqueCategories);
        });
    }, []);
// console.log(categories);

    return (
        <>
            <div className="container-fluid footer">
                <div className="row footer-content">
                    <div className="col-8 footer-content-left">
                        <p>Useful Links</p>
                    </div>
                    <div className="col-4 footer-content-right">
                        <p>Categories <span>see all</span></p>
                        {
                            categories.map((category, index) => (
                                <p key={index}>{category}</p>
                            ))
                        }

                    </div>
                </div>

                <div className="row footer-bottom">
                    <div className="col-12 footer-bottom-content">
                        <p>Footer Bottom Content</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;

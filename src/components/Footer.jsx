import React, { useEffect, useState } from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const [categories, setCategories] = useState([]);

    const usefulLinks = [
        ['Blog', 'Partner', 'Recipes'],
        ['Privacy', 'Franchise', 'Bistro'],
        ['Terms', 'Seller', 'District'],
        ['FAQs', 'Warehouse', 'Blinkit Ambulance'],
        ['Security', 'Deliver', 'Feeding India'],
        ['Contact', 'Resources']
    ];

    useEffect(() => {
        fetch('https://blinkit-backend-1-e6wf.onrender.com/product/getAllProducts')
            .then(response => response.json())
            .then(data => {
                const uniqueCategories = [
                    ...new Set(
                        data
                            .map(product => product.category)
                            .filter(category => category)
                    )
                ];

                setCategories(uniqueCategories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const getCategoryColumns = () => {
        const columns = [[], [], []];

        categories.forEach((category, index) => {
            columns[index % 3].push(category);
        });

        return columns;
    };

    const categoryColumns = getCategoryColumns();

    return (
        <footer className="footer">

            <div className="footer-main">

                <div className="footer-useful">
                    <h4>Useful Links</h4>

                    <div className="useful-links-grid">
                        {usefulLinks.map((column, index) => (
                            <div className="footer-link-column" key={index}>
                                {column.map((link, linkIndex) => (
                                    <a href="#" key={linkIndex}>
                                        {link}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-categories">

                    <div className="category-heading">
                        <h4>Categories</h4>
                        <a href="#">see all</a>
                    </div>

                    <div className="category-grid">
                        {categoryColumns.map((column, columnIndex) => (
                            <div
                                className="category-column"
                                key={columnIndex}
                            >
                                {column.map((category, categoryIndex) => (
                                    <a
                                        href="#"
                                        key={categoryIndex}
                                    >
                                        {category}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                <div className="footer-bottom-top">

                    <div className="copyright">
                        © Blink Commerce Private Limited, 2016-2026
                    </div>

                    <div className="download-app">
                        <span>Download App</span>

                        <a href="#">
                            <img
                                src="https://blinkit.com/images/appstore-1.png"
                                alt="Download on App Store"
                            />
                        </a>

                        <a href="#">
                            <img
                                src="https://blinkit.com/images/playstore-1.png"
                                alt="Get it on Google Play"
                            />
                        </a>
                    </div>

                    <div className="social-links">
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="X">𝕏</a>
                        <a href="#" aria-label="Instagram">◎</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="Threads">◎</a>
                    </div>

                </div>

                <p className="disclaimer">
                    “Blinkit” is owned & managed by "Blink Commerce Private Limited"
                    and is not related, linked or interconnected in whatsoever manner
                    or nature, to “GROFFR.COM” which is a real estate services
                    business operated by “Redstone Consultancy Services Private Limited”.
                </p>

            </div>

        </footer>
    );
};

export default Footer;
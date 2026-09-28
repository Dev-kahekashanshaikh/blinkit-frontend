
import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

/* React Icons */
import {
    FaShoppingBasket,
} from 'react-icons/fa';

import {
    FiChevronRight,
    FiShoppingCart,
} from 'react-icons/fi';

import {
    MdLocalShipping,
    MdOutlineLocalOffer,
} from 'react-icons/md';

import '../styles/SelectedProduct.css';


const ProductCard = ({
    image,
    title,
    category,
    description,
    price,
    mrp,
    discount,
    brand,
    packSize,
    ratingCount,
}) => {

    return (
        <>


            <div className="selected-product-card">

                <Container className="SelectedProduct-Container">

                    {/* =====================================================
                            FIRST ROW
                        ====================================================== */}

                    <Row className="product-main-row">


                        {/* =================================================
                                LEFT SIDE - PRODUCT IMAGE
                            ================================================== */}

                        <Col
                            xs={12}
                            lg={5}
                            className="product-image-section"
                        >

                            <div className='left-section'>

                                {/* Main Product Image */}

                                <div className="product-main-image">

                                    <img
                                        src={image}
                                        alt={title}
                                        className="img-fluid"
                                    />

                                </div>


                                {/* =================================================
                                    PRODUCT THUMBNAILS
                                ================================================== */}

                                <div className="product-thumbnails">

                                    <div className="thumbnail active">
                                        <img
                                            src={image}
                                            alt={title}
                                        />
                                    </div>

                                    <div className="thumbnail">
                                        <img
                                            src={image}
                                            alt={title}
                                        />
                                    </div>

                                    <div className="thumbnail">
                                        <img
                                            src={image}
                                            alt={title}
                                        />
                                    </div>

                                    <div className="thumbnail">
                                        <img
                                            src={image}
                                            alt={title}
                                        />
                                    </div>

                                    <div className="thumbnail">
                                        <img
                                            src={image}
                                            alt={title}
                                        />
                                    </div>

                                    <div className="thumbnail">
                                        <img
                                            src={image}
                                            alt={title}
                                        />
                                    </div>


                                    {/* Thumbnail Next Button */}

                                    <button
                                        type="button"
                                        className="thumbnail-next"
                                        aria-label="Next images"
                                    >
                                        <FiChevronRight />
                                    </button>

                                </div>

                                <div>



                                    {/* =================================================
                                    PRODUCT DETAILS
                                ================================================== */}

                                    <Accordion defaultActiveKey="0">

                                        <Accordion.Item eventKey="0">

                                            <Accordion.Header>
                                                View more details...
                                            </Accordion.Header>

                                            <Accordion.Body>

                                                <Row className="product-details-row">

                                                    <Col xs={12}>

                                                        <div className="product-details">

                                                            <h2>
                                                                Product Details
                                                            </h2>


                                                            {/* Name */}

                                                            <div className="details-item">

                                                                <strong>
                                                                    Name
                                                                </strong>

                                                                <p>
                                                                    {title}
                                                                </p>

                                                            </div>


                                                            {/* Product Type */}

                                                            <div className="details-item">

                                                                <strong>
                                                                    Product Type
                                                                </strong>

                                                                <p>
                                                                    {category}
                                                                </p>

                                                            </div>


                                                            {/* Brand */}

                                                            <div className="details-item">

                                                                <strong>
                                                                    Brand
                                                                </strong>

                                                                <p>
                                                                    {brand}
                                                                </p>

                                                            </div>


                                                            {/* Pack Size */}

                                                            <div className="details-item">

                                                                <strong>
                                                                    Pack Size
                                                                </strong>

                                                                <p>
                                                                    {packSize}
                                                                </p>

                                                            </div>


                                                            {/* Features */}

                                                            <div className="details-item">

                                                                <strong>
                                                                    Features
                                                                </strong>

                                                                <p>
                                                                    {description}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </Col>

                                                </Row>

                                            </Accordion.Body>

                                        </Accordion.Item>

                                    </Accordion>

                                </div>


                            </div>
                        </Col>


                        {/* =================================================
                                RIGHT SIDE - PRODUCT INFORMATION
                            ================================================== */}

                        <Col
                            xs={12}
                            lg={7}
                            className="product-info-section"
                        >
                            <div className='right-section'>



                                <Row className='right-section-top-row'>
                                    <Col lg={8}
                                        className='product-info-left'>
                                        {/* Breadcrumb */}

                                    <div className="product-breadcrumb">

                                        <span>
                                            Home
                                        </span>

                                        <FiChevronRight className="breadcrumb-icon" />

                                        <span>
                                            {category} & More
                                        </span>

                                        <FiChevronRight className="breadcrumb-icon" />

                                        <span>
                                            {title}
                                        </span>

                                    </div>


                                    {/* Product Name */}

                                    <h1 className="product-title">
                                        {title}
                                    </h1>


                                    {/* =================================================
                                    SELECTED PRODUCT PRICE
                                ================================================== */}

                                    <div className="selected-product-price">

                                        {/* Rating / Review Count */}

                                        <p>
                                           Qty {ratingCount}
                                        </p>


                                        <div className="price-row">

                                            {/* Selling Price */}

                                            <strong>
                                                ₹{price}
                                            </strong>


                                            {/* MRP */}

                                            <del>
                                                MRP ₹{mrp}
                                            </del>


                                            {/* Discount */}

                                            <span className="discount-small">
                                                {discount}% OFF
                                            </span>

                                        </div>


                                        <small>
                                            (Inclusive of all taxes)
                                        </small>

                                    </div>

                                </Col>
                                <Col > {/* =================================================
                                    ADD TO CART
                                ================================================== */}

                                        <div className='product-info-right'>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        type="button"
                                        className="btn add-cart-btn"
                                    >

                                        <FiShoppingCart />

                                        <span>
                                            Add to cart
                                        </span>

                                    </Button></div>
                                </Col>
                            </Row>



                            {/* =================================================
                                    WHY SHOP FROM BLINKIT
                                ================================================== */}

                            <div className="why-shop">

                                <h2>
                                    Why shop from blinkit?
                                </h2>


                                {/* FEATURE 1 */}

                                <div className="shop-feature">

                                    <div className="feature-icon">
                                        <MdLocalShipping />
                                    </div>

                                    <div className="feature-content">

                                        <h4>
                                            Round The Clock Delivery
                                        </h4>

                                        <p>
                                            Get items delivered to your doorstep from dark
                                            stores near you, whenever you need them.
                                        </p>

                                    </div>

                                </div>


                                {/* FEATURE 2 */}

                                <div className="shop-feature">

                                    <div className="feature-icon">
                                        <MdOutlineLocalOffer />
                                    </div>

                                    <div className="feature-content">

                                        <h4>
                                            Best Prices & Offers
                                        </h4>

                                        <p>
                                            Best price destination with offers directly
                                            from the manufacturers.
                                        </p>

                                    </div>

                                </div>


                                {/* FEATURE 3 */}

                                <div className="shop-feature">

                                    <div className="feature-icon">
                                        <FaShoppingBasket />
                                    </div>

                                    <div className="feature-content">

                                        <h4>
                                            Wide Assortment
                                        </h4>

                                        <p>
                                            Choose from 30,000+ products across food,
                                            personal care, household & other categories.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </Col>

                </Row>

            </Container>

        </div >

           
        </>
    );
};

export default ProductCard;


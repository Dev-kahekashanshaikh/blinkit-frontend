import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import { useParams } from "react-router-dom";

import { useCategory } from "../context/CategoryContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import "../styles/SelectedCategoryProducts.css";


const SelectedCategoryProduct = () => {

    const { categoryName } = useParams();

    const {
        categoryProducts,
        loading,
        error,
        fetchCategoryProducts
    } = useCategory();


    useEffect(() => {

        console.log("URL category:", categoryName);

        fetchCategoryProducts(categoryName);

    }, [categoryName]);


    // filters
    const [priceFilter, setPriceFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [sortBy, setSortBy] = useState("default");


    // =========================
    // FILTER + SORT PRODUCTS
    // =========================

   const filteredProducts = useMemo(() => {

    let result = [...categoryProducts];


    // PRICE

    if (priceFilter === "under-50") {

        result = result.filter(
            product => product.price < 50
        );

    }


    if (priceFilter === "50-100") {

        result = result.filter(
            product =>
                product.price >= 50 &&
                product.price <= 100
        );

    }


    if (priceFilter === "above-100") {

        result = result.filter(
            product => product.price > 100
        );

    }


    // RATING

    if (ratingFilter === "4") {

        result = result.filter(
            product => product.rating?.rate >= 4
        );

    }


    if (ratingFilter === "3") {

        result = result.filter(
            product => product.rating?.rate >= 3
        );

    }


    // SORT

    if (sortBy === "price-low") {

        result.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortBy === "price-high") {

        result.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sortBy === "rating") {

        result.sort(
            (a, b) =>
                (b.rating?.rate || 0) -
                (a.rating?.rate || 0)
        );

    }


    return result;

}, [
    categoryProducts,
    priceFilter,
    ratingFilter,
    sortBy
]);

    // =========================
    // CLEAR FILTERS
    // =========================

    const clearFilters = () => {

        setPriceFilter("all");
        setRatingFilter("all");
        setSortBy("default");

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="selected-category-loading">

                <h3>Loading products...</h3>

            </div>
        );

    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return <h2>{error}</h2>;

    }


    // =========================
    // UI
    // =========================

    return (

        <div className="selected-category-product">

            <Container fluid>

                {/* =========================
                    CATEGORY HEADER
                ========================== */}

                <div className="category-header">

                    <div>

                        <h1>
                            {decodeURIComponent(categoryName)}
                        </h1>

                        <p>
                            {filteredProducts.length} products
                        </p>

                    </div>


                    {/* SORT */}

                    <div className="sort-container">

                        <Form.Select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value)
                            }
                        >

                            <option value="default">
                                Sort by
                            </option>

                            <option value="price-low">
                                Price: Low to High
                            </option>

                            <option value="price-high">
                                Price: High to Low
                            </option>

                            <option value="rating">
                                Rating
                            </option>

                        </Form.Select>

                    </div>

                </div>


                <Row>

                    {/* =========================
                        LEFT FILTER SIDEBAR
                    ========================== */}

                    <Col
                        lg={2}
                        md={2}
                        sm={2}
                        xs={2}
                        className="filter-column"
                    >

                        <div className="filter-sidebar">

                            <div className="filter-heading">

                                <h3>Filters</h3>

                                <button
                                    onClick={clearFilters}
                                    className="clear-filter"
                                >
                                    Clear
                                </button>

                            </div>


                            {/* PRICE FILTER */}

                            <div className="filter-section">

                                <h4>Price</h4>

                                <Form.Check
                                    type="radio"
                                    label="All"
                                    name="price"
                                    value="all"
                                    checked={priceFilter === "all"}
                                    onChange={(e) =>
                                        setPriceFilter(e.target.value)
                                    }
                                />

                                <Form.Check
                                    type="radio"
                                    label="Under ₹50"
                                    name="price"
                                    value="under-50"
                                    checked={priceFilter === "under-50"}
                                    onChange={(e) =>
                                        setPriceFilter(e.target.value)
                                    }
                                />

                                <Form.Check
                                    type="radio"
                                    label="₹50 - ₹100"
                                    name="price"
                                    value="50-100"
                                    checked={priceFilter === "50-100"}
                                    onChange={(e) =>
                                        setPriceFilter(e.target.value)
                                    }
                                />

                                <Form.Check
                                    type="radio"
                                    label="Above ₹100"
                                    name="price"
                                    value="above-100"
                                    checked={priceFilter === "above-100"}
                                    onChange={(e) =>
                                        setPriceFilter(e.target.value)
                                    }
                                />

                            </div>


                            {/* RATING FILTER */}

                            <div className="filter-section">

                                <h4>Rating</h4>

                                <Form.Check
                                    type="radio"
                                    label="All ratings"
                                    name="rating"
                                    value="all"
                                    checked={ratingFilter === "all"}
                                    onChange={(e) =>
                                        setRatingFilter(e.target.value)
                                    }
                                />

                                <Form.Check
                                    type="radio"
                                    label="4★ & above"
                                    name="rating"
                                    value="4"
                                    checked={ratingFilter === "4"}
                                    onChange={(e) =>
                                        setRatingFilter(e.target.value)
                                    }
                                />

                                <Form.Check
                                    type="radio"
                                    label="3★ & above"
                                    name="rating"
                                    value="3"
                                    checked={ratingFilter === "3"}
                                    onChange={(e) =>
                                        setRatingFilter(e.target.value)
                                    }
                                />

                            </div>


                            {/* SORT */}

                            <div className="filter-section">

                                <h4>Sort</h4>

                                <Form.Check
                                    type="radio"
                                    label="Default"
                                    name="sort"
                                    value="default"
                                    checked={sortBy === "default"}
                                    onChange={(e) =>
                                        setSortBy(e.target.value)
                                    }
                                />

                                <Form.Check
                                    type="radio"
                                    label="Price: Low to High"
                                    name="sort"
                                    value="price-low"
                                    checked={sortBy === "price-low"}
                                    onChange={(e) =>
                                        setSortBy(e.target.value)
                                    }
                                />

                                <Form.Check
                                    type="radio"
                                    label="Price: High to Low"
                                    name="sort"
                                    value="price-high"
                                    checked={sortBy === "price-high"}
                                    onChange={(e) =>
                                        setSortBy(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </Col>


                    {/* =========================
                        RIGHT PRODUCTS
                    ========================== */}

                    <Col
                        lg={10}
                        md={10}
                        sm={10}
                        xs={10}
                        className="products-column"
                    >

                        <div className="products-grid">

                            {filteredProducts.length === 0 ? (

                                <div className="no-products">

                                    <h3>
                                        No products found
                                    </h3>

                                    <Button
                                        variant="outline-success"
                                        onClick={clearFilters}
                                    >
                                        Clear Filters
                                    </Button>

                                </div>

                            ) : (

                                // IMPORTANT:
                                // Use filteredProducts here
                                // NOT categoryProducts

                                filteredProducts.map(product => (

                                    <Link
                                        to={`/product/${product._id}`}
                                        className="product-link"
                                        key={product.id}
                                    >

                                        <Card className="product-card">

                                            <div className="product-image-container">

                                                <Card.Img
                                                    variant="top"
                                                    src={product.image}
                                                    className="product-image"
                                                    alt={product.title}
                                                />

                                            </div>


                                            <Card.Body>

                                                {/* RATING */}

                                                <div className="product-rating">

                                                    <span className="rating-star">
                                                        ★
                                                    </span>

                                                    {product.rating?.rate || "N/A"}

                                                    <span className="rating-count">
                                                        ({product.rating?.count || 0})
                                                    </span>

                                                </div>


                                                {/* TITLE */}

                                                <Card.Title className="product-title">

                                                    {product.title}

                                                </Card.Title>


                                                {/* DESCRIPTION */}

                                                <Card.Text className="product-description">

                                                    {product.description}

                                                </Card.Text>


                                                {/* PRICE */}

                                                <div className="price-add-button-container">

                                                    <span className="product-price">

                                                        ₹{product.price}

                                                    </span>


                                                    {/* ADD BUTTON */}

                                                    <Button
                                                        variant="outline-success"
                                                        size="sm"
                                                        as="input"
                                                        type="button"
                                                        value="ADD"
                                                        className="add-button"
                                                    />

                                                </div>

                                            </Card.Body>

                                        </Card>

                                    </Link>

                                ))

                            )}

                        </div>

                    </Col>

                </Row>

            </Container>

        </div>

    );

};


export default SelectedCategoryProduct;
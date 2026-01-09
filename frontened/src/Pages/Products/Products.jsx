import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper.js";
import { useSelector } from "react-redux";

const Products = () => {
    const products = useSelector(state => state.products.products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);
    // const [loading, setLoading] = useState(true);

    // Filters
    const [filters, setFilters] = useState({
        category: "",
        rating: false,
        price: ""
    });

    // Sorting
    const [sortBy, setSortBy] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    useEffect(() => {
        applyFiltersAndSort();
        setCurrentPage(1); // reset page on filter/sort change
    }, [products, filters, sortBy]);

    // const fetchProducts = async () => {
    //     try {
    //         const res = await fetch(`${BASE_URL}/products`);
    //         const data = await res.json();
    //         setProducts(data);
    //         setFilteredProducts(data);
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const applyFiltersAndSort = () => {
        let updated = [...products];

        // Category
        if (filters.category) {
            updated = updated.filter(p => p.category === filters.category);
        }

        // Rating >= 4
        if (filters.rating) {
            updated = updated.filter(p => p.rating.rate >= 4);
        }

        // Price
        if (filters.price === "lt100") {
            updated = updated.filter(p => p.price < 100);
        }

        if (filters.price === "gte100") {
            updated = updated.filter(p => p.price >= 100);
        }

        // Sorting
        if (sortBy === "price-asc") {
            updated.sort((a, b) => a.price - b.price);
        }
        if (sortBy === "price-desc") {
            updated.sort((a, b) => b.price - a.price);
        }
        if (sortBy === "rating-asc") {
            updated.sort((a, b) => a.rating.rate - b.rating.rate);
        }
        if (sortBy === "rating-desc") {
            updated.sort((a, b) => b.rating.rate - a.rating.rate);
        }

        setFilteredProducts(updated);
    };

    const resetFilters = () => {
        setFilters({ category: "", rating: false, price: "" });
        setSortBy("");
        setCurrentPage(1);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // if (loading) {
    //     return <h2>Loading products...</h2>;
    // }

    return (
        <div style={{ padding: "20px" }}>
            <h1>All Products</h1>

            {/* Filters & Sort */}
            <div style={{ marginBottom: "20px" }}>
                <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                    <option value="">All Categories</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                </select>

                <label style={{ marginLeft: "15px" }}>
                    <input type="checkbox" checked={filters.rating} onChange={(e) => setFilters({ ...filters, rating: e.target.checked })} />
                    Rating ≥ 4
                </label>

                <select value={filters.price} onChange={(e) => setFilters({ ...filters, price: e.target.value })} style={{ marginLeft: "15px" }}>
                    <option value="">All Prices</option>
                    <option value="lt100">Below ₹100</option>
                    <option value="gte100">₹100 & Above</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginLeft: "15px" }}>
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating-asc">Rating: Low → High</option>
                    <option value="rating-desc">Rating: High → Low</option>
                </select>

                <button onClick={resetFilters} style={{ marginLeft: "15px" }}>
                    Reset
                </button>
            </div>

            {/* Products */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "20px"
                }}
            >
                {paginatedProducts.map(product => (
                    <div
                        key={product.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            borderRadius: "8px"
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "contain"
                            }}
                        />
                        <h3>{product.title}</h3>
                        <p>₹{product.price}</p>
                        <p>⭐ {product.rating.rate}</p>
                        <p style={{ fontSize: "14px" }}>
                            {product.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Prev
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;

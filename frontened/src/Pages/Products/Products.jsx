import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Products = () => {
    const products = useSelector(state => state.products.products);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const [filters, setFilters] = useState({
        category: "",
        rating: false,
        price: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        applyFiltersAndSort();
        setCurrentPage(1);
    }, [products, filters, sortBy]);

    const applyFiltersAndSort = () => {
        let updated = [...products];

        if (filters.category) {
            updated = updated.filter(p => p.category === filters.category);
        }

        if (filters.rating) {
            updated = updated.filter(p => p.rating?.rate >= 4);
        }

        if (filters.price === "lt100") {
            updated = updated.filter(p => p.price < 100);
        }

        if (filters.price === "gte100") {
            updated = updated.filter(p => p.price >= 100);
        }

        if (sortBy === "price-asc") {
            updated.sort((a, b) => a.price - b.price);
        }

        if (sortBy === "price-desc") {
            updated.sort((a, b) => b.price - a.price);
        }

        if (sortBy === "rating-asc") {
            updated.sort((a, b) => a.rating?.rate - b.rating?.rate);
        }

        if (sortBy === "rating-desc") {
            updated.sort((a, b) => b.rating?.rate - a.rating?.rate);
        }

        setFilteredProducts(updated);
    };

    const resetFilters = () => {
        setFilters({
            category: "",
            rating: false,
            price: ""
        });

        setSortBy("");
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-8">
            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-center">
                    All Products
                </h1>
                <p className="text-center text-gray-500 mt-2">
                    Browse our collection
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow mb-8 flex flex-wrap gap-4 justify-center">
                <select
                    className="border rounded-lg px-4 py-2"
                    value={filters.category}
                    onChange={e =>
                        setFilters({
                            ...filters,
                            category: e.target.value
                        })
                    }
                >
                    <option value="">All Categories</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                </select>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={filters.rating}
                        onChange={e =>
                            setFilters({
                                ...filters,
                                rating: e.target.checked
                            })
                        }
                    />
                    Rating ≥ 4
                </label>

                <select
                    className="border rounded-lg px-4 py-2"
                    value={filters.price}
                    onChange={e =>
                        setFilters({
                            ...filters,
                            price: e.target.value
                        })
                    }
                >
                    <option value="">All Prices</option>
                    <option value="lt100">Below ₹100</option>
                    <option value="gte100">₹100 & Above</option>
                </select>

                <select
                    className="border rounded-lg px-4 py-2"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price Low → High</option>
                    <option value="price-desc">Price High → Low</option>
                    <option value="rating-asc">Rating Low → High</option>
                    <option value="rating-desc">Rating High → Low</option>
                </select>

                <button
                    onClick={resetFilters}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Reset
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map(product => (
                    <div
                        key={product._id || product.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
                    >
                        <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-full object-contain"
                            />
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-semibold text-lg line-clamp-2 min-h-[60px]">
                                {product.title}
                            </h3>

                            <p className="text-sm text-gray-500 capitalize mt-1">
                                {product.category}
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <span className="text-yellow-500 font-medium">
                                    ⭐ {product.rating?.rate || 0}
                                </span>

                                <span className="text-xl font-bold text-green-600">
                                    ₹{product.price}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mt-3 flex-grow">
                                {product.description?.length > 120
                                    ? product.description.substring(0, 120) + "..."
                                    : product.description}
                            </p>
                            <NavLink to={`/products/${product.id}`}>
                                <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                                    View Product
                                </button>
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-5 py-2 bg-black text-white rounded-lg disabled:bg-gray-300"
                >
                    Prev
                </button>

                <span className="font-medium">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="px-5 py-2 bg-black text-white rounded-lg disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div >
    );
};

export default Products;
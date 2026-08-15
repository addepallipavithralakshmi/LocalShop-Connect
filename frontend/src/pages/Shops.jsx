import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API =
    import.meta.env.VITE_API_URL;
function Shops() {

    // ========================================
    // STATES
    // ========================================

    const [shops, setShops] = useState([]);

    const [search, setSearch] = useState("");

    const [city, setCity] = useState("");

    const [category, setCategory] = useState("All");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ========================================
    // LOAD SHOPS
    // ========================================

    useEffect(() => {

        fetchShops();

    }, []);


    // ========================================
    // FETCH ALL SHOPS
    // ========================================

    const fetchShops = async () => {

        try {

            setLoading(true);

            setError("");


            const response = await axios.get(
                `${API}/api/shops`
            );


            console.log(
                "Shops response:",
                response.data
            );


            setShops(
                response.data.shops || []
            );


        } catch (error) {

            console.error(
                "Error fetching shops:",
                error
            );


            if (error.response) {

                setError(

                    error.response.data.message ||

                    "Unable to load shops"

                );

            } else {

                setError(
                    "Unable to connect to server"
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // FILTER SHOPS
    // ========================================

    const filteredShops =
        shops.filter((shop) => {

            const searchText =
                search
                    .toLowerCase()
                    .trim();


            // Search

            const matchesSearch =

                shop.shop_name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                shop.description
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                shop.category
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                shop.city
                    ?.toLowerCase()
                    .includes(searchText);


            // City

            const matchesCity =

                city === ""

                ||

                shop.city
                    ?.toLowerCase()
                    .includes(
                        city.toLowerCase()
                    );


            // Category

            const matchesCategory =

                category === "All"

                ||

                shop.category
                    ?.toLowerCase() ===
                category.toLowerCase();


            return (

                matchesSearch &&

                matchesCity &&

                matchesCategory

            );

        });


    // ========================================
    // CLEAR FILTERS
    // ========================================

    const clearFilters = () => {

        setSearch("");

        setCity("");

        setCategory("All");

    };


    // ========================================
    // LOADING
    // ========================================

    if (loading) {

        return (

            <div className="shops-loading">

                <div
                    className="spinner-border"
                    role="status"
                >
                </div>


                <p className="mt-3 text-muted">

                    Loading local shops...

                </p>

            </div>

        );

    }


    // ========================================
    // ERROR
    // ========================================

    if (error) {

        return (

            <div className="container mt-5">

                <div className="alert alert-danger">

                    <i
                        className="bi bi-exclamation-triangle-fill me-2"
                    ></i>

                    {error}

                </div>


                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={fetchShops}
                >

                    <i
                        className="bi bi-arrow-clockwise me-2"
                    ></i>

                    Try Again

                </button>

            </div>

        );

    }


    // ========================================
    // MAIN PAGE
    // ========================================

    return (

        <div className="shops-page">

            <div className="container">


                {/* ========================================
                    PAGE HEADER
                ======================================== */}

                <div className="shops-header">

                    <span
                        className="badge"
                        style={{
                            background:
                                "#f3e8ff",
                            color:
                                "#7c3aed"
                        }}
                    >

                        <i
                            className="bi bi-shop me-2"
                        ></i>

                        LOCAL BUSINESSES

                    </span>


                    <h1 className="display-5 mt-3">

                        Discover Local Shops

                    </h1>


                    <p>

                        Explore local businesses,
                        discover their products and
                        connect with shops near you.

                    </p>

                </div>


                {/* ========================================
                    SEARCH + FILTER
                ======================================== */}

                <div className="shop-filter-card">

                    <div className="row g-3 align-items-end">


                        {/* SEARCH */}

                        <div className="col-lg-5">

                            <label
                                className="form-label fw-bold"
                            >

                                Search Shops

                            </label>


                            <div className="shop-search-wrapper">

                                <i
                                    className="bi bi-search"
                                ></i>


                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search shops, products..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* CITY */}

                        <div className="col-lg-3">

                            <label
                                className="form-label fw-bold"
                            >

                                City

                            </label>


                            <div className="shop-search-wrapper">

                                <i
                                    className="bi bi-geo-alt"
                                ></i>


                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter city"
                                    value={city}
                                    onChange={(e) =>
                                        setCity(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {/* CATEGORY */}

                        <div className="col-lg-3">

                            <label
                                className="form-label fw-bold"
                            >

                                Category

                            </label>


                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="All">

                                    All Categories

                                </option>


                                <option value="Clothing">

                                    Clothing

                                </option>


                                <option value="Electronics">

                                    Electronics

                                </option>


                                <option value="Footwear">

                                    Footwear

                                </option>


                                <option value="Grocery">

                                    Grocery

                                </option>


                                <option value="Beauty">

                                    Beauty

                                </option>

                            </select>

                        </div>


                        {/* CLEAR */}

                        <div className="col-lg-1">

                            {(search !== "" ||
                                city !== "" ||
                                category !== "All") && (

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-100"
                                    onClick={clearFilters}
                                    title="Clear filters"
                                >

                                    <i
                                        className="bi bi-x-lg"
                                    ></i>

                                </button>

                            )}

                        </div>

                    </div>

                </div>


                {/* ========================================
                    RESULT COUNT
                ======================================== */}

                {shops.length > 0 && (

                    <div className="shops-result-count">

                        Showing{" "}

                        <strong>
                            {filteredShops.length}
                        </strong>

                        {" "}of{" "}

                        <strong>
                            {shops.length}
                        </strong>

                        {" "}shops

                    </div>

                )}


                {/* ========================================
                    NO SHOPS
                ======================================== */}

                {shops.length === 0 ? (

                    <div className="shops-empty">

                        <i
                            className="bi bi-shop"
                        ></i>


                        <h3>

                            No Shops Available

                        </h3>


                        <p>

                            There are no local shops
                            registered yet.

                        </p>


                        <Link
                            to="/create-shop"
                            className="btn btn-primary"
                        >

                            <i
                                className="bi bi-plus-circle me-2"
                            ></i>

                            Create a Shop

                        </Link>

                    </div>

                ) : filteredShops.length === 0 ? (

                    <div className="shops-empty">

                        <i
                            className="bi bi-search"
                        ></i>


                        <h3>

                            No Shops Found

                        </h3>


                        <p>

                            Try changing your search
                            or filter options.

                        </p>


                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={clearFilters}
                        >

                            <i
                                className="bi bi-arrow-counterclockwise me-2"
                            ></i>

                            Clear Filters

                        </button>

                    </div>

                ) : (


                    /* ========================================
                       SHOP GRID
                    ======================================== */

                    <div className="row g-4">

                        {filteredShops.map(
                            (shop) => (

                                <div
                                    className="col-md-6 col-lg-4"
                                    key={
                                        shop.shop_id
                                    }
                                >

                                    <div className="shop-card">


                                        {/* ========================================
                                            SHOP IMAGE
                                        ======================================== */}

                                        <div className="shop-card-header">

                                            {shop.shop_image ? (

                                                <img
                                                    src={
                                                        `${API}/uploads/shop-images/${shop.shop_image}`
                                                    }
                                                    alt={
                                                        shop.shop_name
                                                    }
                                                    className="shop-card-image"
                                                />

                                            ) : (

                                                <i
                                                    className="bi bi-shop"
                                                ></i>

                                            )}

                                        </div>


                                        {/* ========================================
                                            SHOP BODY
                                        ======================================== */}

                                        <div className="shop-card-body">


                                            {/* CATEGORY */}

                                            <span
                                                className="shop-category"
                                            >

                                                <i
                                                    className="bi bi-tag-fill me-1"
                                                ></i>

                                                {shop.category ||
                                                    "General"}

                                            </span>


                                            {/* SHOP NAME */}

                                            <h5
                                                className="shop-card-title"
                                            >

                                                {shop.shop_name}

                                            </h5>


                                            {/* DESCRIPTION */}

                                            <p
                                                className="shop-description"
                                            >

                                                {shop.description ||

                                                    "No description available."

                                                }

                                            </p>


                                            {/* ADDRESS */}

                                            <div
                                                className="shop-detail"
                                            >

                                                <i
                                                    className="bi bi-geo-alt-fill"
                                                ></i>

                                                <span>

                                                    {shop.address ||

                                                        "Address not available"

                                                    }

                                                </span>

                                            </div>


                                            {/* CITY */}

                                            <div
                                                className="shop-detail"
                                            >

                                                <i
                                                    className="bi bi-building"
                                                ></i>

                                                <span>

                                                    {shop.city ||

                                                        "City not available"

                                                    }

                                                </span>

                                            </div>


                                            {/* PHONE */}

                                            <div
                                                className="shop-detail"
                                            >

                                                <i
                                                    className="bi bi-telephone-fill"
                                                ></i>

                                                <span>

                                                    {shop.phone ||

                                                        "Phone not available"

                                                    }

                                                </span>

                                            </div>


                                            {/* VIEW SHOP */}

                                            <Link
                                                to={
                                                    `/shops/${shop.shop_id}`
                                                }
                                                className="view-shop-btn d-block text-center"
                                            >

                                                <i
                                                    className="bi bi-eye me-2"
                                                ></i>

                                                View Shop

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Shops;
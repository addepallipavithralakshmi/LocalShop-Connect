import { Link } from "react-router-dom";

function Home() {

    return (

        <div>

            {/* =========================================
                HERO SECTION
            ========================================= */}

            <section
                className="py-5"
                style={{
                    background:
                        "linear-gradient(135deg, #faf5ff, #fce7f3)"
                }}
            >

                <div className="container py-5">

                    <div className="row align-items-center">

                        {/* HERO LEFT */}

                        <div className="col-lg-7 hero-content">

                            <span
                                className="badge mb-3"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #7c3aed, #ec4899)",
                                    color: "white"
                                }}
                            >

                                <i className="bi bi-shop me-2"></i>

                                LocalShop Connect

                            </span>


                            <h1
                                className="display-4 fw-bold"
                                style={{
                                    color: "#1e1b4b"
                                }}
                            >

                                Discover Local Shops

                                <br />

                                <span
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #7c3aed, #ec4899)",
                                        WebkitBackgroundClip:
                                            "text",
                                        WebkitTextFillColor:
                                            "transparent"
                                    }}
                                >

                                    & Great Products

                                </span>

                            </h1>


                            <p
                                className="lead mt-4"
                                style={{
                                    color: "#6b7280",
                                    maxWidth: "650px"
                                }}
                            >

                                Connect with local shops,
                                discover their latest products
                                and offers, and support
                                businesses in your community.

                            </p>


                            <div className="mt-4 d-flex gap-3 flex-wrap">

                                <Link
                                    to="/shops"
                                    className="btn btn-primary btn-lg"
                                >

                                    <i className="bi bi-shop me-2"></i>

                                    Explore Shops

                                </Link>


                                <Link
                                    to="/posts"
                                    className="btn btn-outline-primary btn-lg"
                                >

                                    <i className="bi bi-grid me-2"></i>

                                    View Posts

                                </Link>

                            </div>


                            <div className="mt-4">

                                <div className="d-flex flex-wrap gap-4">

                                    <div>

                                        <i
                                            className="bi bi-check-circle-fill me-2"
                                            style={{
                                                color: "#7c3aed"
                                            }}
                                        ></i>

                                        Local Businesses

                                    </div>


                                    <div>

                                        <i
                                            className="bi bi-check-circle-fill me-2"
                                            style={{
                                                color: "#ec4899"
                                            }}
                                        ></i>

                                        Latest Products

                                    </div>


                                    <div>

                                        <i
                                            className="bi bi-check-circle-fill me-2"
                                            style={{
                                                color: "#7c3aed"
                                            }}
                                        ></i>

                                        Easy Connection

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* HERO RIGHT */}

                        <div
                            className="col-lg-5 mt-5 mt-lg-0 hero-image"
                        >

                            <div
                                className="card shadow-lg p-4 text-center"
                                style={{
                                    borderRadius: "25px",
                                    background:
                                        "rgba(255,255,255,0.9)"
                                }}
                            >

                                <div
                                    className="mx-auto d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "50%",
                                        background:
                                            "linear-gradient(135deg, #7c3aed, #ec4899)",
                                        color: "white",
                                        fontSize: "75px"
                                    }}
                                >

                                    <i className="bi bi-shop"></i>

                                </div>


                                <h3
                                    className="fw-bold mt-4"
                                    style={{
                                        color: "#1e1b4b"
                                    }}
                                >

                                    Shop Local

                                </h3>


                                <p className="text-muted">

                                    Find products and services
                                    from shops near you.

                                </p>


                                <div className="row g-3 mt-3">

                                    <div className="col-4">

                                        <div
                                            className="p-3 rounded-3"
                                            style={{
                                                background:
                                                    "#faf5ff"
                                            }}
                                        >

                                            <i
                                                className="bi bi-shop"
                                                style={{
                                                    color: "#7c3aed",
                                                    fontSize: "25px"
                                                }}
                                            ></i>

                                            <small className="d-block mt-2">

                                                Shops

                                            </small>

                                        </div>

                                    </div>


                                    <div className="col-4">

                                        <div
                                            className="p-3 rounded-3"
                                            style={{
                                                background:
                                                    "#fdf2f8"
                                            }}
                                        >

                                            <i
                                                className="bi bi-bag"
                                                style={{
                                                    color: "#ec4899",
                                                    fontSize: "25px"
                                                }}
                                            ></i>

                                            <small className="d-block mt-2">

                                                Products

                                            </small>

                                        </div>

                                    </div>


                                    <div className="col-4">

                                        <div
                                            className="p-3 rounded-3"
                                            style={{
                                                background:
                                                    "#faf5ff"
                                            }}
                                        >

                                            <i
                                                className="bi bi-heart"
                                                style={{
                                                    color: "#7c3aed",
                                                    fontSize: "25px"
                                                }}
                                            ></i>

                                            <small className="d-block mt-2">

                                                Connect

                                            </small>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                FEATURES
            ========================================= */}

            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <span
                            className="badge"
                            style={{
                                background: "#f3e8ff",
                                color: "#7c3aed"
                            }}
                        >

                            OUR FEATURES

                        </span>


                        <h2
                            className="fw-bold mt-3"
                            style={{
                                color: "#1e1b4b"
                            }}
                        >

                            Everything You Need

                        </h2>


                        <p className="text-muted">

                            A simple platform connecting
                            customers and local shop owners.

                        </p>

                    </div>


                    <div className="row g-4">

                        {/* FEATURE 1 */}

                        <div className="col-md-4 fade-in">

                            <div
                                className="card h-100 shadow-sm p-4 text-center"
                            >

                                <div
                                    className="mx-auto d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "75px",
                                        height: "75px",
                                        borderRadius: "20px",
                                        background: "#f3e8ff"
                                    }}
                                >

                                    <i
                                        className="bi bi-shop"
                                        style={{
                                            color: "#7c3aed",
                                            fontSize: "38px"
                                        }}
                                    ></i>

                                </div>


                                <h4 className="fw-bold mt-4">

                                    Discover Shops

                                </h4>


                                <p className="text-muted">

                                    Browse local shops,
                                    categories and locations
                                    to find what you need.

                                </p>


                                <Link
                                    to="/shops"
                                    className="btn btn-outline-primary mt-auto"
                                >

                                    Browse Shops

                                </Link>

                            </div>

                        </div>


                        {/* FEATURE 2 */}

                        <div className="col-md-4 fade-in">

                            <div
                                className="card h-100 shadow-sm p-4 text-center"
                            >

                                <div
                                    className="mx-auto d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "75px",
                                        height: "75px",
                                        borderRadius: "20px",
                                        background: "#fce7f3"
                                    }}
                                >

                                    <i
                                        className="bi bi-bag-check"
                                        style={{
                                            color: "#ec4899",
                                            fontSize: "38px"
                                        }}
                                    ></i>

                                </div>


                                <h4 className="fw-bold mt-4">

                                    Discover Products

                                </h4>


                                <p className="text-muted">

                                    See the latest products,
                                    offers and updates posted
                                    by local shops.

                                </p>


                                <Link
                                    to="/posts"
                                    className="btn btn-outline-primary mt-auto"
                                >

                                    View Products

                                </Link>

                            </div>

                        </div>


                        {/* FEATURE 3 */}

                        <div className="col-md-4 fade-in">

                            <div
                                className="card h-100 shadow-sm p-4 text-center"
                            >

                                <div
                                    className="mx-auto d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "75px",
                                        height: "75px",
                                        borderRadius: "20px",
                                        background: "#f3e8ff"
                                    }}
                                >

                                    <i
                                        className="bi bi-heart"
                                        style={{
                                            color: "#7c3aed",
                                            fontSize: "38px"
                                        }}
                                    ></i>

                                </div>


                                <h4 className="fw-bold mt-4">

                                    Show Interest

                                </h4>


                                <p className="text-muted">

                                    Interested in a product?
                                    Show your interest and
                                    connect with the shop.

                                </p>


                                <Link
                                    to="/posts"
                                    className="btn btn-outline-primary mt-auto"
                                >

                                    Find Products

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                HOW IT WORKS
            ========================================= */}

            <section
                className="py-5"
                style={{
                    background:
                        "linear-gradient(135deg, #faf5ff, #fdf2f8)"
                }}
            >

                <div className="container">

                    <div className="text-center mb-5">

                        <span
                            className="badge"
                            style={{
                                background: "#fce7f3",
                                color: "#ec4899"
                            }}
                        >

                            SIMPLE PROCESS

                        </span>


                        <h2
                            className="fw-bold mt-3"
                            style={{
                                color: "#1e1b4b"
                            }}
                        >

                            How It Works

                        </h2>

                    </div>


                    <div className="row g-4">

                        {/* STEP 1 */}

                        <div className="col-md-4 slide-left">

                            <div className="text-center">

                                <div
                                    className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto mb-4"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                        background:
                                            "linear-gradient(135deg, #7c3aed, #ec4899)"
                                    }}
                                >

                                    1

                                </div>


                                <h5 className="fw-bold">

                                    Browse Shops

                                </h5>


                                <p className="text-muted">

                                    Explore shops available
                                    in your area.

                                </p>

                            </div>

                        </div>


                        {/* STEP 2 */}

                        <div className="col-md-4 fade-in">

                            <div className="text-center">

                                <div
                                    className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto mb-4"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                        background:
                                            "linear-gradient(135deg, #7c3aed, #ec4899)"
                                    }}
                                >

                                    2

                                </div>


                                <h5 className="fw-bold">

                                    Explore Products

                                </h5>


                                <p className="text-muted">

                                    Discover products,
                                    offers and updates.

                                </p>

                            </div>

                        </div>


                        {/* STEP 3 */}

                        <div className="col-md-4 slide-right">

                            <div className="text-center">

                                <div
                                    className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto mb-4"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                        background:
                                            "linear-gradient(135deg, #7c3aed, #ec4899)"
                                    }}
                                >

                                    3

                                </div>


                                <h5 className="fw-bold">

                                    Connect

                                </h5>


                                <p className="text-muted">

                                    Show interest and
                                    contact the shop.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                CTA
            ========================================= */}

            <section className="py-5">

                <div className="container">

                    <div
                        className="card text-white text-center p-5"
                        style={{
                            background:
                                "linear-gradient(135deg, #7c3aed, #ec4899)",
                            borderRadius: "25px"
                        }}
                    >

                        <i
                            className="bi bi-stars"
                            style={{
                                fontSize: "40px"
                            }}
                        ></i>


                        <h2 className="fw-bold mt-3">

                            Ready to Explore Local Shops?

                        </h2>


                        <p className="mb-4">

                            Discover products and connect
                            with businesses near you.

                        </p>


                        <Link
                            to="/shops"
                            className="btn btn-light btn-lg"
                        >

                            <i className="bi bi-arrow-right me-2"></i>

                            Start Exploring

                        </Link>

                    </div>

                </div>

            </section>


            {/* =========================================
                SHORT FOOTER
            ========================================= */}

            <footer
                className="py-3"
                style={{
                    background:
                        "linear-gradient(90deg, #1e1b4b, #4c1d95)"
                }}
            >

                <div className="container">

                    <div
                        className="d-flex flex-column flex-md-row justify-content-between align-items-center"
                    >

                        {/* LEFT */}

                        <div className="text-center text-md-start">

                            <span className="fw-bold text-white">

                                <i className="bi bi-shop me-2"></i>

                                LocalShop Connect

                            </span>


                            <span
                                className="text-white-50 ms-md-3 d-block d-md-inline"
                            >

                                Connecting customers with
                                local shops.

                            </span>

                        </div>


                        {/* RIGHT */}

                        <div className="mt-2 mt-md-0">

                            <Link
                                to="/"
                                className="text-white me-3"
                            >

                                Home

                            </Link>


                            <Link
                                to="/shops"
                                className="text-white me-3"
                            >

                                Shops

                            </Link>


                            <Link
                                to="/posts"
                                className="text-white"
                            >

                                Posts

                            </Link>

                        </div>

                    </div>


                    <div
                        className="text-center text-white-50 mt-2"
                        style={{
                            fontSize: "13px"
                        }}
                    >

                        © {new Date().getFullYear()}
                        {" "}
                        LocalShop Connect. All rights reserved.

                    </div>

                </div>

            </footer>

        </div>

    );

}

export default Home;
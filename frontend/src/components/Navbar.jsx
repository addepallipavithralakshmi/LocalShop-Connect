import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    let user = null;

    try {

        user = storedUser
            ? JSON.parse(storedUser)
            : null;

    } catch (error) {

        console.error(
            "Error reading user:",
            error
        );

        user = null;

    }


    // Support both formats
    const userName =
        user?.fullName ||
        user?.full_name ||
        "User";


    const userRole =
        user?.role;


    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };


    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{
                background:
                    "linear-gradient(90deg, #0f172a, #1d4ed8)"
            }}
        >

            <div className="container">


                {/* ================================= */}
                {/* LOGO */}
                {/* ================================= */}

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >

                    <i className="bi bi-shop me-2"></i>

                    LocalShop Connect

                </Link>


                {/* ================================= */}
                {/* MOBILE MENU */}
                {/* ================================= */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>


                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >


                    {/* ================================= */}
                    {/* LEFT MENU */}
                    {/* ================================= */}

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">


                        {/* HOME */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >

                                <i className="bi bi-house me-1"></i>

                                Home

                            </Link>

                        </li>


                        {/* CUSTOMER MENU */}

                        {(!token ||
                            userRole !== "shop_owner") && (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/shops"
                                    >

                                        <i className="bi bi-shop-window me-1"></i>

                                        Shops

                                    </Link>

                                </li>


                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/posts"
                                    >

                                        <i className="bi bi-grid me-1"></i>

                                        Posts

                                    </Link>

                                </li>

                            </>

                        )}


                        {/* SHOP OWNER MENU */}

                        {token &&
                            userRole === "shop_owner" && (

                            <>

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/dashboard"
                                    >

                                        <i className="bi bi-speedometer2 me-1"></i>

                                        Dashboard

                                    </Link>

                                </li>


                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/create-post"
                                    >

                                        <i className="bi bi-plus-circle me-1"></i>

                                        Create Post

                                    </Link>

                                </li>

                            </>

                        )}

                    </ul>


                    {/* ================================= */}
                    {/* RIGHT MENU */}
                    {/* ================================= */}

                    <ul className="navbar-nav align-items-lg-center">


                        {token && user ? (

                            <>

                                {/* ================================= */}
                                {/* HELLO USER */}
                                {/* ================================= */}

                                <li className="nav-item">

                                    <span className="nav-link">

                                        <i className="bi bi-person-circle me-1"></i>

                                        Hello, {userName}

                                    </span>

                                </li>


                                {/* ================================= */}
                                {/* PROFILE */}
                                {/* ================================= */}

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/profile"
                                    >

                                        <i className="bi bi-person me-1"></i>

                                        Profile

                                    </Link>

                                </li>


                                {/* ================================= */}
                                {/* LOGOUT */}
                                {/* ================================= */}

                                <li className="nav-item ms-lg-2">

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={
                                            handleLogout
                                        }
                                    >

                                        <i className="bi bi-box-arrow-right me-1"></i>

                                        Logout

                                    </button>

                                </li>

                            </>

                        ) : (

                            <>

                                {/* LOGIN */}

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/login"
                                    >

                                        Login

                                    </Link>

                                </li>


                                {/* REGISTER */}

                                <li className="nav-item ms-lg-2">

                                    <Link
                                        className="btn btn-light btn-sm"
                                        to="/register"
                                    >

                                        <i className="bi bi-person-plus me-1"></i>

                                        Register

                                    </Link>

                                </li>

                            </>

                        )}

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;
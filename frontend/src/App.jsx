import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// ========================================
// PAGES
// ========================================

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shops from "./pages/Shops";
import ShopDetails from "./pages/ShopDetails";
import Posts from "./pages/Posts";
import CreateShop from "./pages/CreateShop";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";

// ========================================
// COMPONENTS
// ========================================

import Navbar from "./components/Navbar";


function App() {

    return (

        <BrowserRouter>

            {/* ======================================== */}
            {/* NAVBAR */}
            {/* ======================================== */}

            <Navbar />


            {/* ======================================== */}
            {/* ROUTES */}
            {/* ======================================== */}

            <Routes>


                {/* ======================================== */}
                {/* HOME */}
                {/* ======================================== */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* ======================================== */}
                {/* REGISTER */}
                {/* ======================================== */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ======================================== */}
                {/* LOGIN */}
                {/* ======================================== */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ======================================== */}
                {/* PROFILE */}
                {/* THIS WAS MISSING */}
                {/* ======================================== */}

                <Route
                    path="/profile"
                    element={<Profile />}
                />


                {/* ======================================== */}
                {/* ALL SHOPS */}
                {/* ======================================== */}

                <Route
                    path="/shops"
                    element={<Shops />}
                />


                {/* ======================================== */}
                {/* SHOP DETAILS */}
                {/* ======================================== */}

                <Route
                    path="/shops/:id"
                    element={<ShopDetails />}
                />


                {/* ======================================== */}
                {/* ALL POSTS */}
                {/* ======================================== */}

                <Route
                    path="/posts"
                    element={<Posts />}
                />


                {/* ======================================== */}
                {/* CREATE SHOP */}
                {/* ======================================== */}

                <Route
                    path="/create-shop"
                    element={<CreateShop />}
                />


                {/* ======================================== */}
                {/* CREATE POST */}
                {/* ======================================== */}

                <Route
                    path="/create-post"
                    element={<CreatePost />}
                />


                {/* ======================================== */}
                {/* SHOP OWNER DASHBOARD */}
                {/* ======================================== */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


                {/* ======================================== */}
                {/* 404 */}
                {/* ======================================== */}

                <Route
                    path="*"
                    element={

                        <div className="container mt-5 text-center">

                            <h1>
                                404
                            </h1>

                            <p>
                                Page not found
                            </p>

                        </div>

                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
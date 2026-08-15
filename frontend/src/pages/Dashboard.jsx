import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const API =
    import.meta.env.VITE_API_URL;
    
function Dashboard() {

    


    // ======================================================
    // SHOP
    // ======================================================

    const [shop, setShop] =
        useState(null);


    // ======================================================
    // POSTS
    // ======================================================

    const [posts, setPosts] =
        useState([]);


    const [interestCounts, setInterestCounts] =
        useState({});


    // ======================================================
    // LOADING / ERROR
    // ======================================================

    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    // ======================================================
    // SHOP EDIT
    // ======================================================

    const [editingShop, setEditingShop] =
        useState(false);


    const [shopForm, setShopForm] =
        useState({

            shop_name: "",

            category: "",

            description: "",

            address: "",

            city: "",

            phone: ""

        });


    const [savingShop, setSavingShop] =
        useState(false);


    const [deletingShop, setDeletingShop] =
        useState(false);


    // ======================================================
    // POST EDIT
    // ======================================================

    const [editingPost, setEditingPost] =
        useState(null);


    const [editForm, setEditForm] =
        useState({

            title: "",

            description: "",

            price: ""

        });


    const [saving, setSaving] =
        useState(false);


    // ======================================================
    // LOAD DASHBOARD
    // ======================================================

    useEffect(() => {

        fetchDashboard();

    }, []);


    // ======================================================
    // FETCH DASHBOARD
    // ======================================================

    const fetchDashboard =
        async () => {

            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                setError(
                    "Please login first"
                );

                setLoading(false);

                return;

            }


            try {

                // ========================================
                // GET SHOP
                // ========================================

                const shopResponse =
                    await axios.get(

                        `${API}/api/shops/my-shop`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }

                    );


                console.log(
                    "My Shop:",
                    shopResponse.data
                );


                const ownerShop =
                    shopResponse.data.shop;


                if (!ownerShop) {

                    setShop(null);

                    setPosts([]);

                    return;

                }


                setShop(
                    ownerShop
                );


                // ========================================
                // GET POSTS
                // ========================================

                const postResponse =
                    await axios.get(

                        `${API}/api/posts/shop/${ownerShop.shop_id}`

                    );


                console.log(
                    "My Posts:",
                    postResponse.data
                );


                const postList =
                    postResponse.data.posts ||
                    [];


                setPosts(
                    postList
                );


                // ========================================
                // INTEREST COUNTS
                // ========================================

                fetchInterestCounts(
                    postList
                );

            } catch (error) {

                console.error(
                    "Dashboard error:",
                    error
                );


                if (
                    error.response?.status ===
                    404
                ) {

                    setShop(null);

                    setPosts([]);

                    setError("");

                } else {

                    setError(

                        error.response?.data?.message ||

                        "Failed to load dashboard"

                    );

                }

            } finally {

                setLoading(false);

            }

        };


    // ======================================================
    // INTEREST COUNTS
    // ======================================================

    const fetchInterestCounts =
        async (postList) => {

            try {

                const counts = {};


                for (
                    const post of postList
                ) {

                    const response =
                        await axios.get(

                            `${API}/api/posts/${post.post_id}/interests`

                        );


                    counts[
                        post.post_id
                    ] =
                        Number(
                            response.data.interestCount ||
                            0
                        );

                }


                setInterestCounts(
                    counts
                );

            } catch (error) {

                console.error(
                    "Interest count error:",
                    error
                );

            }

        };


    // ======================================================
    // START EDIT SHOP
    // ======================================================

    const startEditShop = () => {

        setShopForm({

            shop_name:
                shop.shop_name || "",

            category:
                shop.category || "",

            description:
                shop.description || "",

            address:
                shop.address || "",

            city:
                shop.city || "",

            phone:
                shop.phone || ""

        });


        setEditingShop(
            true
        );

    };


    // ======================================================
    // SHOP FORM CHANGE
    // ======================================================

    const handleShopChange =
        (e) => {

            setShopForm({

                ...shopForm,

                [e.target.name]:
                    e.target.value

            });

        };


    // ======================================================
    // CANCEL SHOP EDIT
    // ======================================================

    const cancelShopEdit = () => {

        setEditingShop(
            false
        );

        setShopForm({

            shop_name: "",

            category: "",

            description: "",

            address: "",

            city: "",

            phone: ""

        });

    };


    // ======================================================
    // UPDATE SHOP
    // ======================================================

    const handleUpdateShop =
        async () => {

            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                alert(
                    "Please login again"
                );

                return;

            }


            if (
                !shopForm.shop_name.trim()
            ) {

                alert(
                    "Shop name is required"
                );

                return;

            }


            if (
                !shopForm.category.trim()
            ) {

                alert(
                    "Category is required"
                );

                return;

            }


            if (
                !shopForm.address.trim()
            ) {

                alert(
                    "Address is required"
                );

                return;

            }


            if (
                !shopForm.city.trim()
            ) {

                alert(
                    "City is required"
                );

                return;

            }


            if (
                !shopForm.phone.trim()
            ) {

                alert(
                    "Phone number is required"
                );

                return;

            }


            try {

                setSavingShop(
                    true
                );


                const response =
                    await axios.put(

                        `${API}/api/shops/my-shop`,

                        {

                            shop_name:
                                shopForm.shop_name,

                            category:
                                shopForm.category,

                            description:
                                shopForm.description,

                            address:
                                shopForm.address,

                            city:
                                shopForm.city,

                            phone:
                                shopForm.phone

                        },

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }

                    );


                console.log(
                    "Updated shop:",
                    response.data
                );


                if (
                    response.data.shop
                ) {

                    setShop(
                        response.data.shop
                    );

                }


                setEditingShop(
                    false
                );


                alert(
                    "Shop updated successfully"
                );


            } catch (error) {

                console.error(
                    "Update shop error:",
                    error
                );


                alert(

                    error.response?.data?.message ||

                    "Failed to update shop"

                );

            } finally {

                setSavingShop(
                    false
                );

            }

        };


    // ======================================================
    // DELETE SHOP
    // ======================================================

    const handleDeleteShop =
        async () => {

            const firstConfirm =
                window.confirm(
                    "Are you sure you want to delete your shop?"
                );


            if (!firstConfirm) {
                return;
            }


            const secondConfirm =
                window.confirm(

                    "Deleting your shop will also delete all its posts and interests. This action cannot be undone. Continue?"

                );


            if (!secondConfirm) {
                return;
            }


            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                alert(
                    "Please login again"
                );

                return;

            }


            try {

                setDeletingShop(
                    true
                );


                const response =
                    await axios.delete(

                        `${API}/api/shops/my-shop`,

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }

                    );


                console.log(
                    "Delete shop response:",
                    response.data
                );


                setShop(null);

                setPosts([]);

                setInterestCounts({});


                alert(
                    "Shop deleted successfully"
                );


            } catch (error) {

                console.error(
                    "Delete shop error:",
                    error
                );


                alert(

                    error.response?.data?.message ||

                    "Failed to delete shop"

                );

            } finally {

                setDeletingShop(
                    false
                );

            }

        };


    // ======================================================
    // START EDIT POST
    // ======================================================

    const startEdit =
        (post) => {

            setEditingPost(
                post.post_id
            );


            setEditForm({

                title:
                    post.title || "",

                description:
                    post.description || "",

                price:
                    post.price ?? ""

            });

        };


    // ======================================================
    // CANCEL POST EDIT
    // ======================================================

    const cancelEdit = () => {

        setEditingPost(
            null
        );


        setEditForm({

            title: "",

            description: "",

            price: ""

        });

    };


    // ======================================================
    // POST INPUT
    // ======================================================

    const handleEditChange =
        (e) => {

            setEditForm({

                ...editForm,

                [e.target.name]:
                    e.target.value

            });

        };


    // ======================================================
    // UPDATE POST
    // ======================================================

    const handleUpdate =
        async (postId) => {

            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                alert(
                    "Please login again"
                );

                return;

            }


            if (
                !editForm.title.trim()
            ) {

                alert(
                    "Post title is required"
                );

                return;

            }


            try {

                setSaving(
                    true
                );


                const response =
                    await axios.put(

                        `${API}/api/posts/${postId}`,

                        {

                            title:
                                editForm.title,

                            description:
                                editForm.description,

                            price:
                                editForm.price

                        },

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }

                    );


                console.log(
                    "Update response:",
                    response.data
                );


                setPosts(
                    previous =>

                        previous.map(
                            post => {

                                if (
                                    post.post_id ===
                                    postId
                                ) {

                                    return {

                                        ...post,

                                        title:
                                            editForm.title,

                                        description:
                                            editForm.description,

                                        price:
                                            editForm.price

                                    };

                                }


                                return post;

                            }
                        )
                );


                setEditingPost(
                    null
                );


                alert(
                    "Post updated successfully"
                );


            } catch (error) {

                console.error(
                    "Update post error:",
                    error
                );


                alert(

                    error.response?.data?.message ||

                    "Failed to update post"

                );

            } finally {

                setSaving(
                    false
                );

            }

        };


    // ======================================================
    // DELETE POST
    // ======================================================

    const handleDelete =
        async (postId) => {

            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this post?"
                );


            if (!confirmDelete) {
                return;
            }


            const token =
                localStorage.getItem(
                    "token"
                );


            try {

                await axios.delete(

                    `${API}/api/posts/${postId}`,

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


                setPosts(

                    previous =>

                        previous.filter(
                            post =>
                                post.post_id !==
                                postId
                        )

                );


                setInterestCounts(
                    previous => {

                        const updated = {
                            ...previous
                        };


                        delete updated[
                            postId
                        ];


                        return updated;

                    }
                );


                alert(
                    "Post deleted successfully"
                );


            } catch (error) {

                console.error(
                    "Delete post error:",
                    error
                );


                alert(

                    error.response?.data?.message ||

                    "Failed to delete post"

                );

            }

        };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <div
                    className="spinner-border"
                    role="status"
                />

                <p className="mt-3">

                    Loading dashboard...

                </p>

            </div>

        );

    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error) {

        return (

            <div className="container mt-5">

                <div className="alert alert-danger">

                    {error}

                </div>


                <Link
                    to="/create-shop"
                    className="btn btn-primary"
                >

                    Create Shop

                </Link>

            </div>

        );

    }


    // ======================================================
    // NO SHOP
    // ======================================================

    if (!shop) {

        return (

            <div className="container mt-5 mb-5">

                <div
                    className="text-center py-5"
                >

                    <div
                        className="display-1 mb-3"
                    >

                        🏪

                    </div>


                    <h2 className="fw-bold">

                        You don't have a shop yet

                    </h2>


                    <p className="text-muted">

                        Create your shop to start
                        publishing products and offers.

                    </p>


                    <Link
                        to="/create-shop"
                        className="btn btn-primary btn-lg"
                    >

                        + Create Shop

                    </Link>

                </div>

            </div>

        );

    }


    // ======================================================
    // TOTAL INTERESTS
    // ======================================================

    const totalInterests =
        Object
            .values(
                interestCounts
            )
            .reduce(
                (
                    total,
                    count
                ) =>
                    total +
                    Number(count),
                0
            );


    // ======================================================
    // DASHBOARD
    // ======================================================

    return (

        <div
            className="container mt-5 mb-5"
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-4">

                <h1 className="fw-bold">

                    Shop Owner Dashboard

                </h1>


                <p className="text-muted">

                    Manage your shop and posts.

                </p>

            </div>


            {/* ==================================================
                SHOP CARD
            ================================================== */}

            <div className="card shadow-sm mb-5">

                <div className="card-body">


                    {/* ==================================================
                        NORMAL VIEW
                    ================================================== */}

                    {!editingShop ? (

                        <>

                            <div className="row">

                                {/* SHOP INFORMATION */}

                                <div className="col-md-8">


                                    {/* SHOP IMAGE */}

                                    {shop.shop_image ? (

                                        <img
                                            src={
                                                `${API}/uploads/shop-images/${shop.shop_image}`
                                            }
                                            alt={
                                                shop.shop_name
                                            }
                                            className="rounded mb-3"
                                            style={{
                                                width:
                                                    "220px",
                                                height:
                                                    "150px",
                                                objectFit:
                                                    "cover"
                                            }}
                                        />

                                    ) : (

                                        <div
                                            className="bg-light rounded mb-3 d-flex align-items-center justify-content-center"
                                            style={{
                                                width:
                                                    "220px",
                                                height:
                                                    "150px"
                                            }}
                                        >

                                            <span className="text-muted">

                                                No Shop Image

                                            </span>

                                        </div>

                                    )}


                                    <h2 className="fw-bold">

                                        {
                                            shop.shop_name
                                        }

                                    </h2>


                                    <span
                                        className="badge bg-primary mb-3"
                                    >

                                        {
                                            shop.category
                                        }

                                    </span>


                                    <p>

                                        {
                                            shop.description ||
                                            "No description available."
                                        }

                                    </p>


                                    <p className="mb-1">

                                        📍 {
                                            shop.address
                                        }

                                    </p>


                                    <p className="mb-1">

                                        🏙️ {
                                            shop.city
                                        }

                                    </p>


                                    <p>

                                        📞 {
                                            shop.phone
                                        }

                                    </p>


                                    {/* SHOP BUTTONS */}

                                    <div
                                        className="d-flex gap-2 flex-wrap"
                                    >

                                        <Link
                                            to={
                                                `/shops/${shop.shop_id}`
                                            }
                                            className="btn btn-outline-primary"
                                        >

                                            👁️ View My Shop

                                        </Link>


                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={
                                                startEditShop
                                            }
                                        >

                                            ✏️ Edit Shop

                                        </button>

                                    </div>

                                </div>


                                {/* STATISTICS */}

                                <div className="col-md-4">

                                    <div className="row g-3">

                                        {/* POSTS */}

                                        <div className="col-6">

                                            <div
                                                className="card bg-light"
                                            >

                                                <div
                                                    className="card-body text-center"
                                                >

                                                    <small className="text-muted">

                                                        POSTS

                                                    </small>


                                                    <h2 className="fw-bold">

                                                        {
                                                            posts.length
                                                        }

                                                    </h2>

                                                </div>

                                            </div>

                                        </div>


                                        {/* INTERESTS */}

                                        <div className="col-6">

                                            <div
                                                className="card bg-light"
                                            >

                                                <div
                                                    className="card-body text-center"
                                                >

                                                    <small className="text-muted">

                                                        INTERESTS

                                                    </small>


                                                    <h2 className="fw-bold">

                                                        {
                                                            totalInterests
                                                        }

                                                    </h2>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* SHOP ACTIONS */}

                            <div
                                className="mt-4 d-flex gap-2 flex-wrap"
                            >

                                <Link
                                    to="/create-post"
                                    className="btn btn-primary"
                                >

                                    + Create New Post

                                </Link>


                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={
                                        handleDeleteShop
                                    }
                                    disabled={
                                        deletingShop
                                    }
                                >

                                    {deletingShop
                                        ? "Deleting Shop..."
                                        : "🗑️ Delete My Shop"
                                    }

                                </button>

                            </div>

                        </>

                    ) : (

                        /* ==================================================
                           EDIT SHOP FORM
                        ================================================== */

                        <>

                            <h2 className="fw-bold mb-4">

                                ✏️ Edit Shop

                            </h2>


                            <div className="row g-3">

                                {/* SHOP NAME */}

                                <div className="col-md-6">

                                    <label
                                        className="form-label fw-semibold"
                                    >

                                        Shop Name

                                    </label>


                                    <input
                                        type="text"
                                        name="shop_name"
                                        className="form-control"
                                        value={
                                            shopForm.shop_name
                                        }
                                        onChange={
                                            handleShopChange
                                        }
                                        placeholder="Enter shop name"
                                    />

                                </div>


                                {/* CATEGORY */}

                                <div className="col-md-6">

                                    <label
                                        className="form-label fw-semibold"
                                    >

                                        Category

                                    </label>


                                    <select
                                        name="category"
                                        className="form-select"
                                        value={
                                            shopForm.category
                                        }
                                        onChange={
                                            handleShopChange
                                        }
                                    >

                                        <option value="">
                                            Select Category
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

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>


                                {/* DESCRIPTION */}

                                <div className="col-12">

                                    <label
                                        className="form-label fw-semibold"
                                    >

                                        Description

                                    </label>


                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="4"
                                        value={
                                            shopForm.description
                                        }
                                        onChange={
                                            handleShopChange
                                        }
                                        placeholder="Enter shop description"
                                    />

                                </div>


                                {/* ADDRESS */}

                                <div className="col-md-6">

                                    <label
                                        className="form-label fw-semibold"
                                    >

                                        Address

                                    </label>


                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={
                                            shopForm.address
                                        }
                                        onChange={
                                            handleShopChange
                                        }
                                        placeholder="Enter address"
                                    />

                                </div>


                                {/* CITY */}

                                <div className="col-md-6">

                                    <label
                                        className="form-label fw-semibold"
                                    >

                                        City

                                    </label>


                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        value={
                                            shopForm.city
                                        }
                                        onChange={
                                            handleShopChange
                                        }
                                        placeholder="Enter city"
                                    />

                                </div>


                                {/* PHONE */}

                                <div className="col-md-6">

                                    <label
                                        className="form-label fw-semibold"
                                    >

                                        Phone Number

                                    </label>


                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        value={
                                            shopForm.phone
                                        }
                                        onChange={
                                            handleShopChange
                                        }
                                        placeholder="Enter phone number"
                                    />

                                </div>

                            </div>


                            {/* EDIT BUTTONS */}

                            <div
                                className="mt-4 d-flex gap-2"
                            >

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={
                                        handleUpdateShop
                                    }
                                    disabled={
                                        savingShop
                                    }
                                >

                                    {savingShop
                                        ? "Saving..."
                                        : "💾 Save Changes"
                                    }

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={
                                        cancelShopEdit
                                    }
                                    disabled={
                                        savingShop
                                    }
                                >

                                    Cancel

                                </button>

                            </div>

                        </>

                    )}

                </div>

            </div>


            {/* ==================================================
                POSTS
            ================================================== */}

            <h2 className="fw-bold mb-4">

                My Posts

            </h2>


            {posts.length === 0 ? (

                <div className="alert alert-info">

                    You haven't created any posts yet.

                </div>

            ) : (

                <div className="row g-4">

                    {posts.map(
                        (post) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={
                                    post.post_id
                                }
                            >

                                <div
                                    className="card shadow-sm h-100"
                                >

                                    {/* POST IMAGE */}

                                    {post.image ? (

                                        <img
                                            src={
                                                `${API}/uploads/post-images/${post.image}`
                                            }
                                            className="card-img-top"
                                            alt={
                                                post.title
                                            }
                                            style={{
                                                height:
                                                    "220px",
                                                objectFit:
                                                    "cover"
                                            }}
                                        />

                                    ) : (

                                        <div
                                            className="bg-light d-flex align-items-center justify-content-center"
                                            style={{
                                                height:
                                                    "220px"
                                            }}
                                        >

                                            <span className="text-muted">

                                                No Image

                                            </span>

                                        </div>

                                    )}


                                    <div
                                        className="card-body"
                                    >

                                        {/* ========================================
                                            EDIT POST
                                        ======================================== */}

                                        {editingPost ===
                                        post.post_id ? (

                                            <>

                                                <h5 className="fw-bold mb-3">

                                                    ✏️ Edit Post

                                                </h5>


                                                <div className="mb-3">

                                                    <label className="form-label">

                                                        Title

                                                    </label>


                                                    <input
                                                        type="text"
                                                        name="title"
                                                        className="form-control"
                                                        value={
                                                            editForm.title
                                                        }
                                                        onChange={
                                                            handleEditChange
                                                        }
                                                    />

                                                </div>


                                                <div className="mb-3">

                                                    <label className="form-label">

                                                        Description

                                                    </label>


                                                    <textarea
                                                        name="description"
                                                        className="form-control"
                                                        rows="4"
                                                        value={
                                                            editForm.description
                                                        }
                                                        onChange={
                                                            handleEditChange
                                                        }
                                                    />

                                                </div>


                                                <div className="mb-3">

                                                    <label className="form-label">

                                                        Price

                                                    </label>


                                                    <input
                                                        type="number"
                                                        name="price"
                                                        className="form-control"
                                                        value={
                                                            editForm.price
                                                        }
                                                        onChange={
                                                            handleEditChange
                                                        }
                                                    />

                                                </div>


                                                <div className="d-flex gap-2">

                                                    <button
                                                        type="button"
                                                        className="btn btn-success"
                                                        disabled={
                                                            saving
                                                        }
                                                        onClick={() =>
                                                            handleUpdate(
                                                                post.post_id
                                                            )
                                                        }
                                                    >

                                                        {saving
                                                            ? "Saving..."
                                                            : "💾 Save Changes"
                                                        }

                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={
                                                            cancelEdit
                                                        }
                                                    >

                                                        Cancel

                                                    </button>

                                                </div>

                                            </>

                                        ) : (

                                            /* ========================================
                                               NORMAL POST
                                            ======================================== */

                                            <>

                                                <h5 className="fw-bold">

                                                    {
                                                        post.title
                                                    }

                                                </h5>


                                                <p>

                                                    {
                                                        post.description ||
                                                        "No description available."
                                                    }

                                                </p>


                                                {post.price !== null &&
                                                    post.price !== undefined &&
                                                    post.price !== "" && (

                                                        <h5 className="text-success fw-bold">

                                                            ₹
                                                            {
                                                                post.price
                                                            }

                                                        </h5>

                                                    )}


                                                <small
                                                    className="text-muted"
                                                >

                                                    Posted on{" "}

                                                    {
                                                        new Date(
                                                            post.created_at
                                                        ).toLocaleDateString()
                                                    }

                                                </small>


                                                {/* INTEREST COUNT */}

                                                <div className="mt-3">

                                                    <span className="badge bg-danger">

                                                        ❤️{" "}

                                                        {
                                                            interestCounts[
                                                                post.post_id
                                                            ] || 0
                                                        }

                                                        {" "}
                                                        Interested

                                                    </span>

                                                </div>


                                                {/* POST BUTTONS */}

                                                <div
                                                    className="d-flex gap-2 mt-3"
                                                >

                                                    <button
                                                        type="button"
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() =>
                                                            startEdit(
                                                                post
                                                            )
                                                        }
                                                    >

                                                        ✏️ Edit

                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                post.post_id
                                                            )
                                                        }
                                                    >

                                                        🗑️ Delete

                                                    </button>

                                                </div>

                                            </>

                                        )}

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

}

export default Dashboard;
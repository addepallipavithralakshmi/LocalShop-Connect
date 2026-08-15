import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const API =
    import.meta.env.VITE_API_URL;
function ShopDetails() {

    // ========================================
    // SHOP ID
    // ========================================

    const { id } = useParams();


    // ========================================
    // STATES
    // ========================================

    const [shop, setShop] = useState(null);

    const [posts, setPosts] = useState([]);

    const [interestCounts, setInterestCounts] =
        useState({});

    const [interestStatus, setInterestStatus] =
        useState({});

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ========================================
    // LOAD DATA
    // ========================================

    useEffect(() => {

        fetchShop();

        fetchPosts();

    }, [id]);


    // ========================================
    // FETCH SHOP
    // ========================================

    const fetchShop = async () => {

        try {

            const response = await axios.get(
                `${API}/api/shops/${id}`
            );


            console.log(
                "Shop response:",
                response.data
            );


            setShop(
                response.data.shop
            );


        } catch (error) {

            console.error(
                "Error fetching shop:",
                error
            );


            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Shop not found"
                );

            } else {

                setError(
                    "Unable to connect to server"
                );

            }

        }

    };


    // ========================================
    // FETCH POSTS
    // ========================================

    const fetchPosts = async () => {

        try {

            const response = await axios.get(
                `${API}/api/posts/shop/${id}`
            );


            console.log(
                "Posts response:",
                response.data
            );


            const postList =
                response.data.posts || [];


            setPosts(postList);


            // Fetch counts

            fetchInterestCounts(
                postList
            );


            // Fetch current user status

            fetchInterestStatuses(
                postList
            );


        } catch (error) {

            console.error(
                "Error fetching posts:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // FETCH INTEREST COUNTS
    // ========================================

    const fetchInterestCounts =
        async (postList) => {

            try {

                const counts = {};


                for (
                    const post
                    of postList
                ) {

                    const response =
                        await axios.get(
                            `${API}/api/posts/${post.post_id}/interests`
                        );


                    counts[
                        post.post_id
                    ] =
                        Number(
                            response.data.interestCount
                        );

                }


                setInterestCounts(
                    counts
                );


            } catch (error) {

                console.error(
                    "Error fetching interest counts:",
                    error
                );

            }

        };


    // ========================================
    // FETCH INTEREST STATUS
    // ========================================

    const fetchInterestStatuses =
        async (postList) => {

            const token =
                localStorage.getItem(
                    "token"
                );


            // User not logged in

            if (!token) {

                return;

            }


            try {

                const status = {};


                for (
                    const post
                    of postList
                ) {

                    try {

                        const response =
                            await axios.get(

                                `${API}/api/posts/${post.post_id}/interest-status`,

                                {
                                    headers: {

                                        Authorization:
                                            `Bearer ${token}`

                                    }

                                }

                            );


                        status[
                            post.post_id
                        ] =
                            response.data.interested;

                    } catch (error) {

                        // Ignore individual status errors

                        console.error(
                            `Interest status error for post ${post.post_id}:`,
                            error
                        );

                    }

                }


                setInterestStatus(
                    status
                );


            } catch (error) {

                console.error(
                    "Error fetching interest statuses:",
                    error
                );

            }

        };


    // ========================================
    // TOGGLE INTEREST
    // ========================================

    const handleInterest =
        async (postId) => {

            const token =
                localStorage.getItem(
                    "token"
                );


            // Login required

            if (!token) {

                alert(
                    "Please login to show interest"
                );

                return;

            }


            try {

                const currentlyInterested =
                    interestStatus[postId] === true;


                // ========================================
                // REMOVE INTEREST
                // ========================================

                if (currentlyInterested) {

                    await axios.delete(

                        `${API}/api/posts/${postId}/interest`,

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }

                    );


                    // Decrease count

                    setInterestCounts(
                        (previous) => ({

                            ...previous,

                            [postId]:
                                Math.max(
                                    0,
                                    (
                                        previous[
                                            postId
                                        ] || 0
                                    ) - 1
                                )

                        })
                    );


                    // Mark not interested

                    setInterestStatus(
                        (previous) => ({

                            ...previous,

                            [postId]:
                                false

                        })
                    );


                    return;

                }


                // ========================================
                // ADD INTEREST
                // ========================================

                await axios.post(

                    `${API}/api/posts/${postId}/interest`,

                    {},

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


                // Increase count

                setInterestCounts(
                    (previous) => ({

                        ...previous,

                        [postId]:
                            (
                                previous[
                                    postId
                                ] || 0
                            ) + 1

                    })
                );


                // Mark interested

                setInterestStatus(
                    (previous) => ({

                        ...previous,

                        [postId]:
                            true

                    })
                );


            } catch (error) {

                console.error(
                    "Interest toggle error:",
                    error
                );


                alert(

                    error.response
                        ?.data
                        ?.message ||

                    "Unable to update interest"

                );

            }

        };


    // ========================================
    // LOADING
    // ========================================

    if (loading) {

        return (

            <div className="shop-details-page">

                <div className="container">

                    <div className="shops-loading">

                        <div
                            className="spinner-border"
                            role="status"
                        >
                        </div>


                        <p className="mt-3 text-muted">

                            Loading shop...

                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ========================================
    // ERROR
    // ========================================

    if (error || !shop) {

        return (

            <div className="shop-details-page">

                <div className="container">

                    <div className="alert alert-danger">

                        <i
                            className="bi bi-exclamation-triangle-fill me-2"
                        ></i>

                        {error ||
                            "Shop not found"}

                    </div>


                    <Link
                        to="/shops"
                        className="shop-back-btn"
                    >

                        <i
                            className="bi bi-arrow-left me-2"
                        ></i>

                        Back to Shops

                    </Link>

                </div>

            </div>

        );

    }


    // ========================================
    // PAGE
    // ========================================

    return (

        <div className="shop-details-page">

            <div className="container">


                {/* ========================================
                    SHOP PROFILE
                ======================================== */}

                <div className="row justify-content-center">

                    <div className="col-lg-9">

                        <div className="shop-profile-card">


                            {/* ========================================
                                SHOP IMAGE
                            ======================================== */}

                            {shop.shop_image ? (

                                <div className="shop-details-image-wrapper">

                                    <img
                                        src={
                                            `${API}/uploads/shop-images/${shop.shop_image}`
                                        }
                                        alt={
                                            shop.shop_name
                                        }
                                        className="shop-details-image"
                                    />

                                </div>

                            ) : (

                                <div className="shop-details-placeholder">

                                    <i
                                        className="bi bi-shop"
                                    ></i>

                                </div>

                            )}


                            {/* ========================================
                                SHOP BODY
                            ======================================== */}

                            <div className="shop-profile-body">


                                {/* SHOP NAME */}

                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                                    <h1 className="shop-details-title mb-0">

                                        {shop.shop_name}

                                    </h1>


                                    <span className="shop-details-category">

                                        <i
                                            className="bi bi-tag-fill me-1"
                                        ></i>

                                        {shop.category ||
                                            "General"}

                                    </span>

                                </div>


                                {/* ========================================
                                    ABOUT
                                ======================================== */}

                                <div className="shop-about">

                                    <h4>

                                        <i
                                            className="bi bi-info-circle me-2"
                                        ></i>

                                        About the Shop

                                    </h4>


                                    <p>

                                        {shop.description ||

                                            "No description available."

                                        }

                                    </p>

                                </div>


                                {/* ========================================
                                    LOCATION
                                ======================================== */}

                                <div className="mt-4">

                                    <div className="shop-info-box">

                                        <div className="shop-info-icon">

                                            <i
                                                className="bi bi-geo-alt-fill"
                                            ></i>

                                        </div>


                                        <div>

                                            <h6>
                                                Address
                                            </h6>

                                            <p>
                                                {shop.address ||
                                                    "Address not available"}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="shop-info-box">

                                        <div className="shop-info-icon">

                                            <i
                                                className="bi bi-building"
                                            ></i>

                                        </div>


                                        <div>

                                            <h6>
                                                City
                                            </h6>

                                            <p>
                                                {shop.city ||
                                                    "City not available"}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="shop-info-box">

                                        <div className="shop-info-icon">

                                            <i
                                                className="bi bi-telephone-fill"
                                            ></i>

                                        </div>


                                        <div>

                                            <h6>
                                                Phone
                                            </h6>

                                            <p>
                                                {shop.phone ||
                                                    "Phone not available"}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* ========================================
                                    CONTACT SHOP
                                ======================================== */}

                                {shop.phone && (

                                    <div className="d-grid mt-4">

                                        <button
                                            type="button"
                                            className="shop-contact-btn"
                                            onClick={() => {

                                                window.location.href =
                                                    `tel:${shop.phone}`;

                                            }}
                                        >

                                            <i
                                                className="bi bi-telephone-fill me-2"
                                            ></i>

                                            Contact Shop

                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>


                {/* ========================================
                    POSTS
                ======================================== */}

                <div className="shop-posts-section">


                    {/* HEADER */}

                    <div className="mb-4">

                        <h2 className="shop-posts-title">

                            Latest Posts

                        </h2>


                        <p className="shop-posts-subtitle">

                            Explore the latest products,
                            offers and updates from this shop.

                        </p>

                    </div>


                    {/* ========================================
                        NO POSTS
                    ======================================== */}

                    {posts.length === 0 ? (

                        <div className="shop-no-posts">

                            <i
                                className="bi bi-images"
                            ></i>


                            <h4>

                                No Posts Yet

                            </h4>


                            <p>

                                This shop has not published
                                any posts yet.

                            </p>

                        </div>

                    ) : (


                        /* ========================================
                            POSTS GRID
                        ======================================== */

                        <div className="row g-4">

                            {posts.map(
                                (post) => (

                                    <div
                                        className="col-md-6 col-lg-4"
                                        key={
                                            post.post_id
                                        }
                                    >

                                        <div className="shop-details-post-card">


                                            {/* ========================================
                                                POST IMAGE
                                            ======================================== */}

                                            {post.image ? (

                                                <img
                                                    src={
                                                        `${API}/uploads/post-images/${post.image}`
                                                    }
                                                    alt={
                                                        post.title
                                                    }
                                                    className="shop-details-post-image"
                                                />

                                            ) : (

                                                <div className="shop-details-post-placeholder">

                                                    <i
                                                        className="bi bi-image"
                                                    ></i>

                                                </div>

                                            )}


                                            {/* ========================================
                                                POST BODY
                                            ======================================== */}

                                            <div className="shop-details-post-body">


                                                {/* TITLE */}

                                                <h5 className="shop-details-post-title">

                                                    {post.title}

                                                </h5>


                                                {/* DESCRIPTION */}

                                                <p className="shop-details-post-description">

                                                    {post.description ||

                                                        "No description available."

                                                    }

                                                </p>


                                                {/* PRICE */}

                                                {post.price !== null &&
                                                    post.price !== undefined &&
                                                    post.price !== "" && (

                                                        <div className="shop-details-post-price mb-2">

                                                            ₹{post.price}

                                                        </div>

                                                    )}


                                                {/* DATE */}

                                                <small className="text-muted">

                                                    <i
                                                        className="bi bi-calendar3 me-1"
                                                    ></i>

                                                    Posted on{" "}

                                                    {new Date(
                                                        post.created_at
                                                    ).toLocaleDateString()}

                                                </small>


                                                {/* ========================================
                                                    INTEREST BUTTON
                                                ======================================== */}

                                                <div className="mt-3">

                                                    <button
                                                        type="button"
                                                        className={
                                                            interestStatus[
                                                                post.post_id
                                                            ]

                                                                ? "shop-interest-btn interested"

                                                                : "shop-interest-btn"
                                                        }
                                                        onClick={() =>
                                                            handleInterest(
                                                                post.post_id
                                                            )
                                                        }
                                                    >

                                                        {interestStatus[
                                                            post.post_id
                                                        ] ? (

                                                            <>

                                                                ❤️ Interested

                                                            </>

                                                        ) : (

                                                            <>

                                                                🤍 Not Interested

                                                            </>

                                                        )}


                                                        <span className="ms-2">

                                                            {
                                                                interestCounts[
                                                                    post.post_id
                                                                ] || 0
                                                            }

                                                        </span>

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>


                {/* ========================================
                    BACK BUTTON
                ======================================== */}

                <div className="text-center mt-5">

                    <Link
                        to="/shops"
                        className="shop-back-btn"
                    >

                        <i
                            className="bi bi-arrow-left me-2"
                        ></i>

                        Back to Shops

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ShopDetails;
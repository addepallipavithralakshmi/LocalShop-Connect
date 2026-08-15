import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/posts.css";

function Posts() {

    const API =
    import.meta.env.VITE_API_URL;

    const [posts, setPosts] = useState([]);

    const [interestCounts, setInterestCounts] =
        useState({});

    const [interestStatus, setInterestStatus] =
        useState({});

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [processingPost, setProcessingPost] =
        useState(null);


    // ========================================
    // LOAD POSTS
    // ========================================

    useEffect(() => {

        fetchPosts();

    }, []);


    // ========================================
    // FETCH ALL POSTS
    // ========================================

    const fetchPosts = async () => {

        try {

            setLoading(true);

            const response =
                await axios.get(
                    `${API}/api/posts`
                );

            console.log(
                "Posts response:",
                response.data
            );

            const postList =
                response.data.posts || [];

            setPosts(postList);

            await fetchInterestCounts(
                postList
            );

            await fetchInterestStatus(
                postList
            );

        } catch (error) {

            console.error(
                "Error fetching posts:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load posts"
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

                await Promise.all(

                    postList.map(
                        async (post) => {

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
                    )

                );

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


    // ========================================
    // FETCH USER INTEREST STATUS
    // ========================================

    const fetchInterestStatus =
        async (postList) => {

            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {

                return;

            }


            try {

                const status = {};

                await Promise.all(

                    postList.map(
                        async (post) => {

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
                                    response.data.interested === true;

                            } catch (error) {

                                console.error(
                                    `Status error for post ${post.post_id}:`,
                                    error
                                );

                                status[
                                    post.post_id
                                ] = false;

                            }

                        }
                    )

                );

                setInterestStatus(
                    status
                );

            } catch (error) {

                console.error(
                    "Interest status error:",
                    error
                );

            }

        };


    // ========================================
    // REFRESH ONE POST INTEREST
    // ========================================

    const refreshInterest =
        async (postId) => {

            try {

                // Get latest count

                const countResponse =
                    await axios.get(
                        `${API}/api/posts/${postId}/interests`
                    );

                setInterestCounts(
                    previous => ({
                        ...previous,

                        [postId]:
                            Number(
                                countResponse.data.interestCount
                            )
                    })
                );


                // Get latest user status

                const token =
                    localStorage.getItem(
                        "token"
                    );

                if (token) {

                    const statusResponse =
                        await axios.get(
                            `${API}/api/posts/${postId}/interest-status`,
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    setInterestStatus(
                        previous => ({
                            ...previous,

                            [postId]:
                                statusResponse.data.interested === true
                        })
                    );

                }

            } catch (error) {

                console.error(
                    "Refresh interest error:",
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


            // Prevent double click

            if (
                processingPost === postId
            ) {

                return;

            }


            const currentlyInterested =
                interestStatus[postId] === true;


            try {

                setProcessingPost(
                    postId
                );


                // ========================================
                // REMOVE INTEREST
                // ========================================

                if (
                    currentlyInterested
                ) {

                    console.log(
                        "Removing interest:",
                        postId
                    );


                    const response =
                        await axios.delete(
                            `${API}/api/posts/${postId}/interest`,
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );


                    console.log(
                        "Remove interest response:",
                        response.data
                    );

                }


                // ========================================
                // ADD INTEREST
                // ========================================

                else {

                    console.log(
                        "Adding interest:",
                        postId
                    );


                    const response =
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


                    console.log(
                        "Add interest response:",
                        response.data
                    );

                }


                // Get actual database values

                await refreshInterest(
                    postId
                );


            } catch (error) {

                console.error(
                    "Interest toggle error:",
                    error
                );


                console.error(
                    "Status:",
                    error.response?.status
                );


                console.error(
                    "Response:",
                    error.response?.data
                );


                alert(
                    error.response?.data?.message ||
                    "Unable to update interest"
                );

            } finally {

                setProcessingPost(
                    null
                );

            }

        };


    // ========================================
    // FILTER POSTS
    // ========================================

    const filteredPosts =
        posts.filter(
            (post) => {

                const searchText =
                    search
                        .toLowerCase()
                        .trim();


                const matchesSearch =

                    post.title
                        ?.toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    post.description
                        ?.toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    post.shop_name
                        ?.toLowerCase()
                        .includes(
                            searchText
                        );


                const matchesCategory =

                    category === "All"

                    ||

                    post.category
                        ?.toLowerCase() ===
                    category.toLowerCase();


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    // ========================================
    // CLEAR FILTERS
    // ========================================

    const clearFilters = () => {

        setSearch("");

        setCategory(
            "All"
        );

    };


    // ========================================
    // LOADING
    // ========================================

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <div
                    className="spinner-border"
                ></div>

                <p className="mt-3">

                    Loading posts...

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

                    {error}

                </div>

            </div>

        );

    }


    // ========================================
    // PAGE
    // ========================================

    return (

        <div className="container mt-5 mb-5">


            {/* ========================================
                HEADER
            ======================================== */}

            <div
                className="text-center mb-5"
            >

                <h1 className="fw-bold">

                    Local Shop Posts

                </h1>

                <p className="text-muted">

                    Discover products and offers
                    from local shops.

                </p>

            </div>


            {/* ========================================
                SEARCH
            ======================================== */}

            <div
                className="row justify-content-center mb-5"
            >

                <div className="col-md-8">

                    <input
                        type="text"
                        className="form-control form-control-lg mb-3"
                        placeholder="Search products or shops..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />


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


                    {(search !== "" ||
                        category !== "All") && (

                        <button
                            type="button"
                            className="btn btn-outline-secondary mt-3"
                            onClick={
                                clearFilters
                            }
                        >

                            Clear Filters

                        </button>

                    )}

                </div>

            </div>


            {/* ========================================
                POSTS
            ======================================== */}

            {filteredPosts.length === 0 ? (

                <div
                    className="alert alert-info text-center"
                >

                    No posts found.

                </div>

            ) : (

                <div className="row g-4">

                    {filteredPosts.map(
                        (post) => {

                            const interested =
                                interestStatus[
                                    post.post_id
                                ] === true;


                            const processing =
                                processingPost ===
                                post.post_id;


                            return (

                                <div
                                    className="col-md-6 col-lg-4"
                                    key={
                                        post.post_id
                                    }
                                >

                                    <div
                                        className="card shadow-sm h-100"
                                    >


                                        {/* IMAGE */}

                                        {post.image ? (

                                            <img
                                                src={`${API}/uploads/post-images/${post.image}`}
                                                className="card-img-top"
                                                alt={
                                                    post.title
                                                }
                                                style={{
                                                    height:
                                                        "230px",
                                                    objectFit:
                                                        "cover"
                                                }}
                                            />

                                        ) : (

                                            <div
                                                className="bg-light d-flex align-items-center justify-content-center"
                                                style={{
                                                    height:
                                                        "230px"
                                                }}
                                            >

                                                <span className="text-muted">

                                                    No Image

                                                </span>

                                            </div>

                                        )}


                                        {/* CONTENT */}

                                        <div
                                            className="card-body d-flex flex-column"
                                        >


                                            {/* SHOP */}

                                            <span
                                                className="badge bg-primary mb-2"
                                            >

                                                🏪{" "}

                                                {
                                                    post.shop_name
                                                }

                                            </span>


                                            {/* CATEGORY */}

                                            <small
                                                className="text-muted"
                                            >

                                                {
                                                    post.category ||
                                                    "General"
                                                }

                                                {post.city &&
                                                    ` • ${post.city}`}

                                            </small>


                                            {/* TITLE */}

                                            <h5
                                                className="fw-bold mt-2"
                                            >

                                                {
                                                    post.title
                                                }

                                            </h5>


                                            {/* DESCRIPTION */}

                                            <p
                                                className="text-muted"
                                            >

                                                {
                                                    post.description ||
                                                    "No description available."
                                                }

                                            </p>


                                            {/* PRICE */}

                                            {post.price !==
                                                null &&
                                                post.price !==
                                                undefined &&
                                                post.price !==
                                                "" && (

                                                    <h5
                                                        className="text-success fw-bold"
                                                    >

                                                        ₹
                                                        {
                                                            post.price
                                                        }

                                                    </h5>

                                                )}


                                            {/* DATE */}

                                            <small
                                                className="text-muted"
                                            >

                                                Posted on{" "}

                                                {new Date(
                                                    post.created_at
                                                ).toLocaleDateString()}

                                            </small>


                                            {/* BUTTONS */}

                                            <div
                                                className="mt-auto pt-3"
                                            >


                                                {/* INTEREST */}

                                                <button
                                                    type="button"

                                                    className={
                                                        interested
                                                            ? "btn btn-danger w-100 mb-2"
                                                            : "btn btn-outline-danger w-100 mb-2"
                                                    }

                                                    onClick={() =>
                                                        handleInterest(
                                                            post.post_id
                                                        )
                                                    }

                                                    disabled={
                                                        processing
                                                    }
                                                >

                                                    {processing ? (

                                                        <>
                                                            <span
                                                                className="spinner-border spinner-border-sm me-2"
                                                            ></span>

                                                            Updating...

                                                        </>

                                                    ) : (

                                                        <>

                                                            {interested
                                                                ? "❤️ Interested"
                                                                : "🤍 Not Interested"
                                                            }

                                                            <span
                                                                className="ms-2"
                                                            >

                                                                {
                                                                    interestCounts[
                                                                        post.post_id
                                                                    ] || 0
                                                                }

                                                            </span>

                                                        </>

                                                    )}

                                                </button>


                                                {/* VIEW SHOP */}

                                                <Link
                                                    to={`/shops/${post.shop_id}`}
                                                    className="btn btn-outline-primary w-100"
                                                >

                                                    🏪 View Shop

                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}

export default Posts;
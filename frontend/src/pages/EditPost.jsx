import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import axios from "axios";

const API =
    import.meta.env.VITE_API_URL;
function EditPost() {

    const { postId } =
        useParams();

    const navigate =
        useNavigate();


    // ========================================
    // STATES
    // ========================================

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        price: ""

    });


    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [message, setMessage] =
        useState("");


    // ========================================
    // LOAD POST
    // ========================================

    useEffect(() => {

        fetchPost();

    }, [postId]);


    // ========================================
    // FETCH POST
    // ========================================

const fetchPost = async () => {

    try {

        const response =
            await axios.get(

                `${API}/api/posts/${postId}`

            );

        const post =
            response.data.post;

        setFormData({

            title:
                post.title || "",

            description:
                post.description || "",

            price:
                post.price ?? ""

        });

    

        } catch (error) {

            console.error(error);


            setError(

                error.response?.data?.message ||

                "Unable to load post"

            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };


    // ========================================
    // UPDATE POST
    // ========================================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setError("");

            setMessage("");


            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                setError(
                    "Please login first"
                );

                return;

            }


            // Basic validation

            if (
                !formData.title.trim()
            ) {

                setError(
                    "Post title is required"
                );

                return;

            }


            try {

                setSaving(true);


                await axios.put(

                    `${API}/api/posts/${postId}`,

                    {

                        title:
                            formData.title,

                        description:
                            formData.description,

                        price:
                            formData.price

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


                setMessage(
                    "Post updated successfully!"
                );


                // Go to dashboard

                setTimeout(() => {

                    navigate(
                        "/dashboard"
                    );

                }, 1000);


            } catch (error) {

                console.error(error);


                setError(

                    error.response?.data?.message ||

                    "Failed to update post"

                );

            } finally {

                setSaving(false);

            }

        };


    // ========================================
    // LOADING
    // ========================================

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <div className="spinner-border"></div>

                <p className="mt-3">

                    Loading post...

                </p>

            </div>

        );

    }


    // ========================================
    // UI
    // ========================================

    return (

        <div className="container mt-5 mb-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-body p-4">


                            <h2 className="fw-bold text-center mb-4">

                                Edit Post

                            </h2>


                            {/* SUCCESS */}

                            {message && (

                                <div className="alert alert-success">

                                    {message}

                                </div>

                            )}


                            {/* ERROR */}

                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >


                                {/* TITLE */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Post Title

                                    </label>


                                    <input

                                        type="text"

                                        name="title"

                                        className="form-control"

                                        value={
                                            formData.title
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Enter post title"

                                        required

                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Description

                                    </label>


                                    <textarea

                                        name="description"

                                        className="form-control"

                                        rows="5"

                                        value={
                                            formData.description
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Describe your product or offer"

                                    />

                                </div>


                                {/* PRICE */}

                                <div className="mb-4">

                                    <label className="form-label fw-bold">

                                        Price

                                    </label>


                                    <input

                                        type="number"

                                        name="price"

                                        className="form-control"

                                        value={
                                            formData.price
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="799"

                                        min="0"

                                    />

                                </div>


                                {/* BUTTONS */}

                                <div className="d-flex gap-2">


                                    <button

                                        type="submit"

                                        className="btn btn-primary flex-grow-1"

                                        disabled={
                                            saving
                                        }

                                    >

                                        {saving

                                            ? "Updating..."

                                            : "Update Post"

                                        }

                                    </button>


                                    <button

                                        type="button"

                                        className="btn btn-secondary"

                                        onClick={() =>
                                            navigate(
                                                "/dashboard"
                                            )
                                        }

                                    >

                                        Cancel

                                    </button>

                                </div>


                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default EditPost;
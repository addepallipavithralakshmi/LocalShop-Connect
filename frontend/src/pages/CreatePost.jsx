import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ========================================
// API URL
// ========================================

const API =
    import.meta.env.VITE_API_URL;

function CreatePost() {

    const navigate = useNavigate();


    // ========================================
    // FORM DATA
    // ========================================

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        price: ""

    });


    const [image, setImage] =
        useState(null);


    const [message, setMessage] =
        useState("");


    const [error, setError] =
        useState("");


    const [loading, setLoading] =
        useState(false);


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
    // HANDLE IMAGE
    // ========================================

    const handleImageChange = (e) => {

        const selectedFile =
            e.target.files[0];


        if (!selectedFile) {

            setImage(null);

            return;

        }


        // ========================================
        // CHECK FILE SIZE
        // ========================================

        if (
            selectedFile.size >
            5 * 1024 * 1024
        ) {

            setError(
                "Image size must be less than 5MB"
            );

            setImage(null);

            return;

        }


        // ========================================
        // CHECK FILE TYPE
        // ========================================

        const allowedTypes = [

            "image/jpeg",

            "image/jpg",

            "image/png",

            "image/webp"

        ];


        if (
            !allowedTypes.includes(
                selectedFile.type
            )
        ) {

            setError(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            );

            setImage(null);

            return;

        }


        setError("");

        setImage(selectedFile);

    };


    // ========================================
    // SUBMIT
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        setMessage("");

        setError("");


        // ========================================
        // GET TOKEN
        // ========================================

        const token =
            localStorage.getItem(
                "token"
            );


        // ========================================
        // LOGIN CHECK
        // ========================================

        if (!token) {

            setError(
                "Please login first"
            );

            return;

        }


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !formData.title.trim()
        ) {

            setError(
                "Post title is required"
            );

            return;

        }


        try {

            setLoading(true);


            // ========================================
            // CREATE FORM DATA
            // ========================================

            const data =
                new FormData();


            data.append(

                "title",

                formData.title

            );


            data.append(

                "description",

                formData.description

            );


            // ========================================
            // ADD PRICE
            // ========================================

            if (
                formData.price !== ""
            ) {

                data.append(

                    "price",

                    formData.price

                );

            }


            // ========================================
            // ADD IMAGE
            // ========================================

            if (image) {

                data.append(

                    "image",

                    image

                );

            }


            // ========================================
            // SEND TO BACKEND
            // ========================================

            const response =
                await axios.post(

                    `${API}/api/posts`,

                    data,

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            // ========================================
            // SUCCESS MESSAGE
            // ========================================

            setMessage(

                response.data.message ||

                "Post created successfully"

            );


            // ========================================
            // CLEAR FORM
            // ========================================

            setFormData({

                title: "",

                description: "",

                price: ""

            });


            setImage(null);


            // ========================================
            // RESET FILE INPUT
            // ========================================

            const fileInput =
                document.getElementById(
                    "postImage"
                );


            if (fileInput) {

                fileInput.value = "";

            }


            // ========================================
            // REDIRECT TO DASHBOARD
            // ========================================

            setTimeout(() => {

                navigate(
                    "/dashboard"
                );

            }, 1000);


        } catch (error) {

            console.error(
                "Create post error:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Failed to create post"

            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // UI
    // ========================================

    return (

        <div className="container mt-5 mb-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-body p-4">


                            {/* =================================
                                HEADING
                            ================================= */}

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">

                                    Create New Post

                                </h2>


                                <p className="text-muted">

                                    Share your latest
                                    product or offer
                                    with customers.

                                </p>

                            </div>


                            {/* =================================
                                SUCCESS
                            ================================= */}

                            {message && (

                                <div className="alert alert-success">

                                    {message}

                                </div>

                            )}


                            {/* =================================
                                ERROR
                            ================================= */}

                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}


                            {/* =================================
                                FORM
                            ================================= */}

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >


                                {/* =================================
                                    TITLE
                                ================================= */}

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

                                        placeholder="New Summer Collection"

                                        required

                                    />

                                </div>


                                {/* =================================
                                    DESCRIPTION
                                ================================= */}

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


                                {/* =================================
                                    PRICE
                                ================================= */}

                                <div className="mb-3">

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


                                {/* =================================
                                    IMAGE
                                ================================= */}

                                <div className="mb-4">

                                    <label className="form-label fw-bold">

                                        Post Image

                                    </label>


                                    <input

                                        id="postImage"

                                        type="file"

                                        name="image"

                                        className="form-control"

                                        accept="image/png,image/jpeg,image/jpg,image/webp"

                                        onChange={
                                            handleImageChange
                                        }

                                    />


                                    <div className="form-text">

                                        JPG, PNG or WEBP.
                                        Maximum 5MB.

                                    </div>

                                </div>


                                {/* =================================
                                    BUTTONS
                                ================================= */}

                                <div className="d-flex gap-2">


                                    <button

                                        type="submit"

                                        className="btn btn-primary flex-grow-1"

                                        disabled={
                                            loading
                                        }

                                    >

                                        {loading

                                            ? "Publishing..."

                                            : "Publish Post"

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


export default CreatePost;
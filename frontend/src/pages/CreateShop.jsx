import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API =
    import.meta.env.VITE_API_URL;

function CreateShop() {

    // ========================================
    // STATES
    // ========================================

    const [shopName, setShopName] = useState("");

    const [description, setDescription] = useState("");

    const [address, setAddress] = useState("");

    const [city, setCity] = useState("");

    const [phone, setPhone] = useState("");

    const [category, setCategory] = useState("");

    const [image, setImage] = useState(null);

    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const navigate = useNavigate();


    // ========================================
    // HANDLE IMAGE
    // ========================================

    const handleImageChange = (e) => {

        const selectedImage =
            e.target.files[0];


        if (!selectedImage) {

            setImage(null);

            setImagePreview("");

            return;

        }


        // Check file type

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];


        if (
            !allowedTypes.includes(
                selectedImage.type
            )
        ) {

            setError(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            );

            setImage(null);

            setImagePreview("");

            return;

        }


        // Check file size

        if (
            selectedImage.size >
            5 * 1024 * 1024
        ) {

            setError(
                "Image size must be less than 5 MB"
            );

            setImage(null);

            setImagePreview("");

            return;

        }


        setError("");

        setImage(selectedImage);


        // Create preview

        const previewUrl =
            URL.createObjectURL(
                selectedImage
            );


        setImagePreview(
            previewUrl
        );

    };


    // ========================================
    // SUBMIT FORM
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        setError("");

        setSuccess("");


        // ========================================
        // CHECK LOGIN
        // ========================================

        const token =
            localStorage.getItem("token");


        if (!token) {

            setError(
                "Please login before creating a shop"
            );

            return;

        }


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !shopName.trim() ||
            !address.trim() ||
            !city.trim() ||
            !phone.trim() ||
            !category
        ) {

            setError(
                "Please fill all required fields"
            );

            return;

        }


        // ========================================
        // CREATE FORMDATA
        // ========================================

        const formData =
            new FormData();


        formData.append(
            "shop_name",
            shopName.trim()
        );


        formData.append(
            "description",
            description.trim()
        );


        formData.append(
            "address",
            address.trim()
        );


        formData.append(
            "city",
            city.trim()
        );


        formData.append(
            "phone",
            phone.trim()
        );


        formData.append(
            "category",
            category
        );


        // Add image only if selected

        if (image) {

            formData.append(
                "shop_image",
                image
            );

        }


        // ========================================
        // SEND REQUEST
        // ========================================

        try {

            setLoading(true);


            const response =
    await axios.post(

        `${API}/api/shops`,

        formData,

        {
            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );

            console.log(
                "Create shop response:",
                response.data
            );


            setSuccess(
                "Shop created successfully!"
            );


            // ========================================
            // REDIRECT
            // ========================================

            setTimeout(() => {

                navigate("/dashboard");

            }, 1000);


        } catch (error) {

            console.error(
                "Create shop error:",
                error
            );


            if (
                error.response
            ) {

                setError(

                    error.response.data.message ||

                    "Failed to create shop"

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
    // UI
    // ========================================

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">


                    {/* ========================================
                        HEADER
                    ======================================== */}

                    <div className="text-center mb-4">

                        <span
                            className="badge"
                            style={{
                                background:
                                    "#f3e8ff",
                                color:
                                    "#7c3aed"
                            }}
                        >

                            <i className="bi bi-shop me-2"></i>

                            SHOP OWNER

                        </span>


                        <h1
                            className="fw-bold mt-3"
                            style={{
                                background:
                                    "linear-gradient(90deg, #7c3aed, #ec4899)",
                                WebkitBackgroundClip:
                                    "text",
                                WebkitTextFillColor:
                                    "transparent"
                            }}
                        >

                            Create Your Shop

                        </h1>


                        <p className="text-muted">

                            Add your local shop and
                            showcase your products.

                        </p>

                    </div>


                    {/* ========================================
                        FORM CARD
                    ======================================== */}

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body p-4 p-md-5">


                            {/* ========================================
                                ERROR
                            ======================================== */}

                            {error && (

                                <div
                                    className="alert alert-danger"
                                >

                                    <i
                                        className="bi bi-exclamation-triangle-fill me-2"
                                    ></i>

                                    {error}

                                </div>

                            )}


                            {/* ========================================
                                SUCCESS
                            ======================================== */}

                            {success && (

                                <div
                                    className="alert alert-success"
                                >

                                    <i
                                        className="bi bi-check-circle-fill me-2"
                                    ></i>

                                    {success}

                                </div>

                            )}


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >


                                {/* ========================================
                                    SHOP NAME
                                ======================================== */}

                                <div className="mb-3">

                                    <label
                                        className="form-label fw-bold"
                                    >

                                        Shop Name
                                        <span className="text-danger">
                                            *
                                        </span>

                                    </label>


                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter shop name"
                                        value={shopName}
                                        onChange={(e) =>
                                            setShopName(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* ========================================
                                    DESCRIPTION
                                ======================================== */}

                                <div className="mb-3">

                                    <label
                                        className="form-label fw-bold"
                                    >

                                        Description

                                    </label>


                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Describe your shop"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* ========================================
                                    SHOP PHOTO
                                ======================================== */}

                                <div className="mb-4">

                                    <label
                                        className="form-label fw-bold"
                                    >

                                        Shop Photo

                                    </label>


                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={
                                            handleImageChange
                                        }
                                    />


                                    <small
                                        className="text-muted"
                                    >

                                        JPG, JPEG, PNG or WEBP.
                                        Maximum 5 MB.

                                    </small>


                                    {/* IMAGE PREVIEW */}

                                    {imagePreview && (

                                        <div className="mt-3">

                                            <p className="fw-bold mb-2">

                                                Preview

                                            </p>


                                            <img
                                                src={
                                                    imagePreview
                                                }
                                                alt="Shop preview"
                                                style={{
                                                    width:
                                                        "100%",
                                                    maxHeight:
                                                        "300px",
                                                    objectFit:
                                                        "cover",
                                                    borderRadius:
                                                        "15px"
                                                }}
                                            />

                                        </div>

                                    )}

                                </div>


                                {/* ========================================
                                    ADDRESS
                                ======================================== */}

                                <div className="mb-3">

                                    <label
                                        className="form-label fw-bold"
                                    >

                                        Address
                                        <span className="text-danger">
                                            *
                                        </span>

                                    </label>


                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder="Enter complete shop address"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* ========================================
                                    CITY + PHONE
                                ======================================== */}

                                <div className="row">


                                    {/* CITY */}

                                    <div className="col-md-6 mb-3">

                                        <label
                                            className="form-label fw-bold"
                                        >

                                            City
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>


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
                                            required
                                        />

                                    </div>


                                    {/* PHONE */}

                                    <div className="col-md-6 mb-3">

                                        <label
                                            className="form-label fw-bold"
                                        >

                                            Phone
                                            <span className="text-danger">
                                                *
                                            </span>

                                        </label>


                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                </div>


                                {/* ========================================
                                    CATEGORY
                                ======================================== */}

                                <div className="mb-4">

                                    <label
                                        className="form-label fw-bold"
                                    >

                                        Category
                                        <span className="text-danger">
                                            *
                                        </span>

                                    </label>


                                    <select
                                        className="form-select"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(
                                                e.target.value
                                            )
                                        }
                                        required
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

                                    </select>

                                </div>


                                {/* ========================================
                                    SUBMIT
                                ======================================== */}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    disabled={loading}
                                >

                                    {loading ? (

                                        <>

                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                            ></span>

                                            Creating Shop...

                                        </>

                                    ) : (

                                        <>

                                            <i
                                                className="bi bi-shop me-2"
                                            ></i>

                                            Create Shop

                                        </>

                                    )}

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CreateShop;
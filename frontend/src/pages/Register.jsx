import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const API =
    import.meta.env.VITE_API_URL;
function Register() {

    const navigate = useNavigate();


    // ========================================
    // FORM DATA
    // ========================================

    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        password: "",

        confirmPassword: "",

        phone: "",

        city: "",

        role: "customer"

    });


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    const [message, setMessage] =
        useState("");


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
    // SUBMIT REGISTER
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        setError("");

        setMessage("");


        // ========================================
        // VALIDATION
        // ========================================

        if (!formData.fullName.trim()) {

            setError(
                "Full name is required"
            );

            return;

        }


        if (!formData.email.trim()) {

            setError(
                "Email is required"
            );

            return;

        }


        if (!formData.password) {

            setError(
                "Password is required"
            );

            return;

        }


        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError(
                "Passwords do not match"
            );

            return;

        }


        if (
            formData.password.length < 6
        ) {

            setError(
                "Password must contain at least 6 characters"
            );

            return;

        }


        if (!formData.phone.trim()) {

            setError(
                "Phone number is required"
            );

            return;

        }


        if (!/^[0-9]{10}$/.test(
            formData.phone
        )) {

            setError(
                "Phone number must contain exactly 10 digits"
            );

            return;

        }


        if (!formData.city.trim()) {

            setError(
                "City is required"
            );

            return;

        }


        try {

            setLoading(true);


            // ========================================
            // SEND DATA TO BACKEND
            // ========================================

            const response =
                await axios.post(

                    `${API}/api/auth/register`,

                    {

                        fullName:
                            formData.fullName,

                        email:
                            formData.email,

                        password:
                            formData.password,

                        phone:
                            formData.phone,

                        city:
                            formData.city,

                        role:
                            formData.role

                    }

                );


            // ========================================
            // SUCCESS
            // ========================================

            setMessage(

                response.data.message ||

                "Registration successful"

            );


            // Clear form

            setFormData({

                fullName: "",

                email: "",

                password: "",

                confirmPassword: "",

                phone: "",

                city: "",

                role: "customer"

            });


            // Redirect to login

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Unable to register. Please try again."

            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="container mt-5 mb-5">

            <div className="row justify-content-center">

                <div className="col-md-7 col-lg-6">

                    <div className="card shadow">

                        <div className="card-body p-4">


                            {/* ================================= */}
                            {/* HEADER */}
                            {/* ================================= */}

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">

                                    Create Account

                                </h2>


                                <p className="text-muted">

                                    Join LocalShop Connect

                                </p>

                            </div>


                            {/* ================================= */}
                            {/* SUCCESS MESSAGE */}
                            {/* ================================= */}

                            {message && (

                                <div className="alert alert-success">

                                    {message}

                                </div>

                            )}


                            {/* ================================= */}
                            {/* ERROR MESSAGE */}
                            {/* ================================= */}

                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}


                            {/* ================================= */}
                            {/* FORM */}
                            {/* ================================= */}

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >


                                {/* ================================= */}
                                {/* FULL NAME */}
                                {/* ================================= */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Full Name

                                    </label>


                                    <input

                                        type="text"

                                        name="fullName"

                                        className="form-control"

                                        value={
                                            formData.fullName
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Enter your full name"

                                        required

                                    />

                                </div>


                                {/* ================================= */}
                                {/* EMAIL */}
                                {/* ================================= */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Email

                                    </label>


                                    <input

                                        type="email"

                                        name="email"

                                        className="form-control"

                                        value={
                                            formData.email
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Enter your email"

                                        required

                                    />

                                </div>


                                {/* ================================= */}
                                {/* PHONE */}
                                {/* ================================= */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Phone Number

                                    </label>


                                    <input

                                        type="tel"

                                        name="phone"

                                        className="form-control"

                                        value={
                                            formData.phone
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Enter 10-digit phone number"

                                        maxLength="10"

                                        inputMode="numeric"

                                        required

                                    />

                                </div>


                                {/* ================================= */}
                                {/* CITY */}
                                {/* ================================= */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        City

                                    </label>


                                    <input

                                        type="text"

                                        name="city"

                                        className="form-control"

                                        value={
                                            formData.city
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Enter your city"

                                        required

                                    />

                                </div>


                                {/* ================================= */}
                                {/* PASSWORD */}
                                {/* ================================= */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Password

                                    </label>


                                    <input

                                        type="password"

                                        name="password"

                                        className="form-control"

                                        value={
                                            formData.password
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Enter password"

                                        required

                                    />

                                </div>


                                {/* ================================= */}
                                {/* CONFIRM PASSWORD */}
                                {/* ================================= */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Confirm Password

                                    </label>


                                    <input

                                        type="password"

                                        name="confirmPassword"

                                        className="form-control"

                                        value={
                                            formData.confirmPassword
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="Confirm password"

                                        required

                                    />

                                </div>


                                {/* ================================= */}
                                {/* ROLE */}
                                {/* ================================= */}

                                <div className="mb-4">

                                    <label className="form-label fw-bold">

                                        Register As

                                    </label>


                                    <select

                                        name="role"

                                        className="form-select"

                                        value={
                                            formData.role
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    >

                                        <option value="customer">

                                            Customer

                                        </option>


                                        <option value="shop_owner">

                                            Shop Owner

                                        </option>

                                    </select>

                                </div>


                                {/* ================================= */}
                                {/* REGISTER BUTTON */}
                                {/* ================================= */}

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={
                                        loading
                                    }

                                >

                                    {loading

                                        ? "Creating Account..."

                                        : "Register"

                                    }

                                </button>

                            </form>


                            {/* ================================= */}
                            {/* LOGIN LINK */}
                            {/* ================================= */}

                            <div className="text-center mt-4">

                                <p className="mb-0">

                                    Already have an account?{" "}

                                    <Link
                                        to="/login"
                                        className="text-decoration-none"
                                    >
                                        Login
                                    </Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;
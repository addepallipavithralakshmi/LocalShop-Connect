import { useEffect, useState } from "react";
import axios from "axios";
const API =
    import.meta.env.VITE_API_URL;
function Profile() {

    // ========================================
    // STATES
    // ========================================

    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        city: "",
        role: ""
    });

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    // ========================================
    // LOAD PROFILE
    // ========================================

    useEffect(() => {

        fetchProfile();

    }, []);


    // ========================================
    // FETCH PROFILE
    // ========================================

    const fetchProfile = async () => {

        const token =
            localStorage.getItem("token");


        if (!token) {

            setError("Please login first");

            setLoading(false);

            return;

        }


        try {

            const response = await axios.get(

                `${API}/api/auth/profile`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            const profile =
                response.data.user;


            setUser(profile);


            setFormData({

                full_name:
                    profile.full_name || "",

                email:
                    profile.email || "",

                phone:
                    profile.phone || "",

                city:
                    profile.city || "",

                role:
                    profile.role || ""

            });


        } catch (error) {

            console.error(
                "Profile error:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Failed to load profile"

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
    // UPDATE PROFILE
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setMessage("");


        const token =
            localStorage.getItem("token");


        if (!token) {

            setError(
                "Please login first"
            );

            return;

        }


        if (!formData.full_name.trim()) {

            setError(
                "Full name is required"
            );

            return;

        }


        try {

            setSaving(true);


            const response =
                await axios.put(

                    `${API}/api/auth/profile`,

                    {
                        full_name:
                            formData.full_name,

                        phone:
                            formData.phone,

                        city:
                            formData.city
                    },

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            setMessage(
                response.data.message
            );


            // ========================================
            // UPDATE LOCAL USER DATA
            // ========================================

            const storedUser =
                localStorage.getItem("user");


            const localUser =
                storedUser
                    ? JSON.parse(storedUser)
                    : {};


            const updatedUser = {

                ...localUser,

                full_name:
                    formData.full_name,

                phone:
                    formData.phone,

                city:
                    formData.city

            };


            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );


            // Update current profile

            setUser(updatedUser);


        } catch (error) {

            console.error(
                "Update profile error:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Failed to update profile"

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

                    Loading profile...

                </p>

            </div>

        );

    }


    // ========================================
    // ERROR
    // ========================================

    if (error && !user) {

        return (

            <div className="container mt-5">

                <div className="alert alert-danger">

                    {error}

                </div>

            </div>

        );

    }


    // ========================================
    // PROFILE PAGE
    // ========================================

    return (

        <div className="container mt-5 mb-5">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card shadow">

                        <div className="card-body p-4">


                            {/* ================================= */}
                            {/* HEADER */}
                            {/* ================================= */}

                            <div className="text-center mb-4">

                                <div className="display-3">

                                    👤

                                </div>


                                <h2 className="fw-bold">

                                    My Profile

                                </h2>


                                <p className="text-muted">

                                    View and update your profile information.

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


                                {/* FULL NAME */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Full Name

                                    </label>


                                    <input

                                        type="text"

                                        name="full_name"

                                        className="form-control"

                                        value={
                                            formData.full_name
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        required

                                    />

                                </div>


                                {/* EMAIL */}

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

                                        disabled

                                    />


                                    <div className="form-text">

                                        Email cannot be changed.

                                    </div>

                                </div>


                                {/* PHONE */}

                                <div className="mb-3">

                                    <label className="form-label fw-bold">

                                        Phone

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

                                        placeholder="Enter phone number"

                                    />

                                </div>


                                {/* CITY */}

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

                                    />

                                </div>


                                {/* ROLE */}

                                <div className="mb-4">

                                    <label className="form-label fw-bold">

                                        Account Type

                                    </label>


                                    <input

                                        type="text"

                                        className="form-control"

                                        value={
                                            formData.role
                                        }

                                        disabled

                                    />

                                </div>


                                {/* UPDATE BUTTON */}

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={
                                        saving
                                    }

                                >

                                    {saving

                                        ? "Updating..."

                                        : "Update Profile"

                                    }

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;
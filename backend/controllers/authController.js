const db = require("../config/db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// ========================================
// REGISTER USER
// ========================================

const registerUser = async (req, res) => {

    try {

        const {
            fullName,
            email,
            password,
            phone,
            city,
            role
        } = req.body;


        // Check required fields

        if (
            !fullName ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Full name, email and password are required"

            });

        }


        // Check existing email

        const checkSql = `
            SELECT user_id
            FROM users
            WHERE email = ?
        `;


        db.query(
            checkSql,
            [email],
            async (err, results) => {

                if (err) {

                    console.error(err);

                    return res.status(500).json({

                        message:
                            "Database error"

                    });

                }


                if (results.length > 0) {

                    return res.status(400).json({

                        message:
                            "Email already registered"

                    });

                }


                // Hash password

                const hashedPassword =
                    await bcrypt.hash(
                        password,
                        10
                    );


                // Default role

                const userRole =
                    role || "customer";


                // Insert user

                const insertSql = `
                    INSERT INTO users
                    (
                        full_name,
                        email,
                        password,
                        phone,
                        city,
                        role
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                `;


                db.query(

                    insertSql,

                    [
                        fullName,
                        email,
                        hashedPassword,
                        phone || null,
                        city || null,
                        userRole
                    ],

                    (err, result) => {

                        if (err) {

                            console.error(err);

                            return res.status(500).json({

                                message:
                                    "Failed to register user"

                            });

                        }


                        res.status(201).json({

                            message:
                                "User registered successfully",

                            userId:
                                result.insertId

                        });

                    }

                );

            }

        );

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Server error"

        });

    }

};


// ========================================
// LOGIN USER
// ========================================

const loginUser = (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (!email || !password) {

        return res.status(400).json({

            message:
                "Email and password are required"

        });

    }


    const sql = `
        SELECT
            user_id,
            full_name,
            email,
            password,
            phone,
            city,
            role
        FROM users
        WHERE email = ?
    `;


    db.query(
        sql,
        [email],
        async (err, results) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    message:
                        "Database error"

                });

            }


            if (results.length === 0) {

                return res.status(401).json({

                    message:
                        "Invalid email or password"

                });

            }


            const user =
                results[0];


            // Compare password

            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    message:
                        "Invalid email or password"

                });

            }


            // Create JWT

            const token =
                jwt.sign(

                    {
                        userId:
                            user.user_id,

                        email:
                            user.email,

                        role:
                            user.role
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: "1d"
                    }

                );


            // Don't send password

            delete user.password;


            res.status(200).json({

                message:
                    "Login successful",

                token: token,

                user: user

            });

        }

    );

};


// ========================================
// GET CURRENT USER PROFILE
// ========================================

const getProfile = (req, res) => {

    const userId = req.user.userId;

    const sql = `
        SELECT
            user_id,
            full_name,
            email,
            phone,
            city,
            role
        FROM users
        WHERE user_id = ?
    `;

    db.query(
        sql,
        [userId],
        (err, results) => {

            if (err) {

                console.error(
                    "Profile error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to fetch profile"
                });

            }

            if (results.length === 0) {

                return res.status(404).json({
                    message:
                        "User not found"
                });

            }

            res.status(200).json({

                message:
                    "Profile fetched successfully",

                user:
                    results[0]

            });

        }
    );
};
// ========================================
// UPDATE PROFILE
// ========================================

const updateProfile = (req, res) => {

    const userId = req.user.userId;

    const {
        full_name,
        phone,
        city
    } = req.body;


    if (!full_name) {

        return res.status(400).json({

            message:
                "Full name is required"

        });

    }


    const sql = `
        UPDATE users
        SET
            full_name = ?,
            phone = ?,
            city = ?
        WHERE user_id = ?
    `;


    db.query(

        sql,

        [
            full_name,
            phone || null,
            city || null,
            userId
        ],

        (err, result) => {

            if (err) {

                console.error(
                    "Update profile error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Failed to update profile"

                });

            }


            res.status(200).json({

                message:
                    "Profile updated successfully"

            });

        }

    );

};

// ========================================
// EXPORT
// ========================================

module.exports = {

    registerUser,

    loginUser,

    getProfile,

    updateProfile

};
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

        if (!fullName || !email || !password) {

            return res.status(400).json({
                message: "Full name, email and password are required"
            });

        }


        // Check existing email

        const checkResult = await db.query(
            `SELECT user_id FROM users WHERE email = $1`,
            [email]
        );


        if (checkResult.rows.length > 0) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }


        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);


        // Default role

        const userRole = role || "customer";


        // Insert user

        const insertResult = await db.query(
            `INSERT INTO users
                (full_name, email, password, phone, city, role)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING user_id`,
            [
                fullName,
                email,
                hashedPassword,
                phone || null,
                city  || null,
                userRole
            ]
        );


        return res.status(201).json({
            message: "User registered successfully",
            userId: insertResult.rows[0].user_id
        });


    } catch (error) {

        console.error("Register error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }

};


// ========================================
// LOGIN USER
// ========================================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            });

        }


        const result = await db.query(
            `SELECT user_id, full_name, email, password, phone, city, role
             FROM users
             WHERE email = $1`,
            [email]
        );


        if (result.rows.length === 0) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }


        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }


        const token = jwt.sign(
            {
                userId: user.user_id,
                email:  user.email,
                role:   user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );


        const { password: _pw, ...userWithoutPassword } = user;


        return res.status(200).json({
            message: "Login successful",
            token,
            user: userWithoutPassword
        });


    } catch (error) {

        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }

};


// ========================================
// GET PROFILE
// ========================================

const getProfile = async (req, res) => {

    try {

        const userId = req.user.userId;


        const result = await db.query(
            `SELECT user_id, full_name, email, phone, city, role
             FROM users
             WHERE user_id = $1`,
            [userId]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        return res.status(200).json({
            message: "Profile fetched successfully",
            user: result.rows[0]
        });


    } catch (error) {

        console.error("Get profile error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }

};


// ========================================
// UPDATE PROFILE
// ========================================

const updateProfile = async (req, res) => {

    try {

        const userId = req.user.userId;

        const { fullName, phone, city } = req.body;


        if (!fullName || !fullName.trim()) {

            return res.status(400).json({
                message: "Full name is required"
            });

        }


        await db.query(
            `UPDATE users
             SET full_name = $1, phone = $2, city = $3
             WHERE user_id = $4`,
            [
                fullName.trim(),
                phone || null,
                city  || null,
                userId
            ]
        );


        const result = await db.query(
            `SELECT user_id, full_name, email, phone, city, role
             FROM users
             WHERE user_id = $1`,
            [userId]
        );


        return res.status(200).json({
            message: "Profile updated successfully",
            user: result.rows[0]
        });


    } catch (error) {

        console.error("Update profile error:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }

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

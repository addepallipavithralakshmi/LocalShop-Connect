const db = require("../config/db");


// ======================================================
// CREATE POST
// ======================================================

const createPost = async (req, res) => {

    try {

        const { title, description, price } = req.body;

        const ownerId = req.user.userId;


        // Find shop of logged-in owner

        const shopResult = await db.query(
            `SELECT shop_id FROM shops WHERE owner_id = $1`,
            [ownerId]
        );


        if (shopResult.rows.length === 0) {

            return res.status(404).json({
                message: "You must create a shop before creating a post"
            });

        }


        const shopId = shopResult.rows[0].shop_id;

        const image = req.file ? req.file.filename : null;


        const postResult = await db.query(
            `INSERT INTO posts (shop_id, title, description, image, price)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING post_id`,
            [
                shopId,
                title,
                description,
                image,
                price || null
            ]
        );


        return res.status(201).json({
            message: "Post created successfully",
            postId:  postResult.rows[0].post_id
        });


    } catch (error) {

        console.error("Create post error:", error);

        return res.status(500).json({
            message: "Failed to create post"
        });

    }

};


// ======================================================
// GET ALL POSTS
// ======================================================

const getAllPosts = async (req, res) => {

    try {

        const result = await db.query(
            `SELECT
                p.post_id,
                p.shop_id,
                p.title,
                p.description,
                p.image,
                p.price,
                p.created_at,
                s.shop_name,
                s.category,
                s.city
             FROM posts p
             JOIN shops s ON p.shop_id = s.shop_id
             ORDER BY p.created_at DESC`
        );


        return res.status(200).json({
            message: "All posts fetched successfully",
            posts:   result.rows
        });


    } catch (error) {

        console.error("Get all posts error:", error);

        return res.status(500).json({
            message: "Failed to fetch posts"
        });

    }

};


// ======================================================
// GET POSTS BY SHOP
// ======================================================

const getPostsByShop = async (req, res) => {

    try {

        const { shopId } = req.params;


        const result = await db.query(
            `SELECT post_id, shop_id, title, description, image, price, created_at
             FROM posts
             WHERE shop_id = $1
             ORDER BY created_at DESC`,
            [shopId]
        );


        return res.status(200).json({
            message: "Posts fetched successfully",
            posts:   result.rows
        });


    } catch (error) {

        console.error("Get shop posts error:", error);

        return res.status(500).json({
            message: "Failed to fetch posts"
        });

    }

};


// ======================================================
// GET POST BY ID
// ======================================================

const getPostById = async (req, res) => {

    try {

        const { postId } = req.params;

        const result = await db.query(
            `SELECT
                p.post_id,
                p.shop_id,
                p.title,
                p.description,
                p.image,
                p.price,
                p.created_at,
                s.shop_name,
                s.category,
                s.city
             FROM posts p
             JOIN shops s ON p.shop_id = s.shop_id
             WHERE p.post_id = $1`,
            [postId]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        return res.status(200).json({
            message: "Post fetched successfully",
            post:    result.rows[0]
        });

    } catch (error) {

        console.error("Get post by ID error:", error);

        return res.status(500).json({
            message: "Failed to fetch post"
        });

    }

};


// ======================================================
// UPDATE POST
// ======================================================

const updatePost = async (req, res) => {

    try {

        const { postId } = req.params;

        const { title, description, price } = req.body;


        // Check ownership

        const checkResult = await db.query(
            `SELECT p.post_id
             FROM posts p
             JOIN shops s ON p.shop_id = s.shop_id
             WHERE p.post_id = $1
               AND s.owner_id = $2`,
            [postId, req.user.userId]
        );


        if (checkResult.rows.length === 0) {

            return res.status(403).json({
                message: "You are not authorized to update this post"
            });

        }


        await db.query(
            `UPDATE posts
             SET title       = $1,
                 description = $2,
                 price       = $3
             WHERE post_id = $4`,
            [title, description, price || null, postId]
        );


        return res.status(200).json({
            message: "Post updated successfully"
        });


    } catch (error) {

        console.error("Update post error:", error);

        return res.status(500).json({
            message: "Failed to update post"
        });

    }

};


// ======================================================
// DELETE POST
// ======================================================

const deletePost = async (req, res) => {

    try {

        const { postId } = req.params;


        // Check ownership

        const checkResult = await db.query(
            `SELECT p.post_id
             FROM posts p
             JOIN shops s ON p.shop_id = s.shop_id
             WHERE p.post_id = $1
               AND s.owner_id = $2`,
            [postId, req.user.userId]
        );


        if (checkResult.rows.length === 0) {

            return res.status(403).json({
                message: "You are not authorized to delete this post"
            });

        }


        // Delete interests first

        await db.query(
            `DELETE FROM post_interests WHERE post_id = $1`,
            [postId]
        );


        await db.query(
            `DELETE FROM posts WHERE post_id = $1`,
            [postId]
        );


        return res.status(200).json({
            message: "Post deleted successfully"
        });


    } catch (error) {

        console.error("Delete post error:", error);

        return res.status(500).json({
            message: "Failed to delete post"
        });

    }

};


// ======================================================
// ADD INTEREST
// ======================================================

const addInterest = async (req, res) => {

    try {

        const { postId } = req.params;

        const userId = req.user.userId;


        // Check post exists

        const postResult = await db.query(
            `SELECT post_id FROM posts WHERE post_id = $1`,
            [postId]
        );


        if (postResult.rows.length === 0) {

            return res.status(404).json({
                message: "Post not found"
            });

        }


        // Check existing interest

        const checkResult = await db.query(
            `SELECT interest_id FROM post_interests WHERE post_id = $1 AND user_id = $2`,
            [postId, userId]
        );


        if (checkResult.rows.length > 0) {

            return res.status(400).json({
                message: "You are already interested in this post"
            });

        }


        // Insert interest

        const insertResult = await db.query(
            `INSERT INTO post_interests (post_id, user_id)
             VALUES ($1, $2)
             RETURNING interest_id`,
            [postId, userId]
        );


        return res.status(201).json({
            message:    "Interest added successfully",
            interestId: insertResult.rows[0].interest_id
        });


    } catch (error) {

        console.error("Add interest error:", error);

        // Postgres unique violation code
        if (error.code === "23505") {

            return res.status(400).json({
                message: "You are already interested in this post"
            });

        }

        return res.status(500).json({
            message: "Failed to add interest"
        });

    }

};


// ======================================================
// REMOVE INTEREST
// ======================================================

const removeInterest = async (req, res) => {

    try {

        const { postId } = req.params;

        const userId = req.user.userId;


        const result = await db.query(
            `DELETE FROM post_interests WHERE post_id = $1 AND user_id = $2`,
            [postId, userId]
        );


        if (result.rowCount === 0) {

            return res.status(404).json({
                message: "Interest not found"
            });

        }


        return res.status(200).json({
            message: "Interest removed successfully"
        });


    } catch (error) {

        console.error("Remove interest error:", error);

        return res.status(500).json({
            message: "Failed to remove interest"
        });

    }

};


// ======================================================
// GET INTEREST COUNT
// ======================================================

const getInterestCount = async (req, res) => {

    try {

        const { postId } = req.params;


        const result = await db.query(
            `SELECT COUNT(*) AS interestcount FROM post_interests WHERE post_id = $1`,
            [postId]
        );


        return res.status(200).json({
            interestCount: Number(result.rows[0].interestcount)
        });


    } catch (error) {

        console.error("Interest count error:", error);

        return res.status(500).json({
            message: "Failed to get interest count"
        });

    }

};


// ======================================================
// GET INTEREST STATUS
// ======================================================

const getInterestStatus = async (req, res) => {

    try {

        const { postId } = req.params;

        const userId = req.user.userId;


        const result = await db.query(
            `SELECT interest_id FROM post_interests WHERE post_id = $1 AND user_id = $2`,
            [postId, userId]
        );


        return res.status(200).json({
            interested: result.rows.length > 0
        });


    } catch (error) {

        console.error("Interest status error:", error);

        return res.status(500).json({
            message: "Failed to check interest status"
        });

    }

};


// ======================================================
// EXPORT ALL FUNCTIONS
// ======================================================

module.exports = {
    createPost,
    getPostById,
    getPostsByShop,
    getAllPosts,
    updatePost,
    deletePost,
    addInterest,
    removeInterest,
    getInterestCount,
    getInterestStatus
};

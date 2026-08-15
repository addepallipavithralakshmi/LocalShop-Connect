const db = require("../config/db");


// ======================================================
// CREATE POST
// ======================================================

const createPost = (req, res) => {

    const {
        title,
        description,
        price
    } = req.body;

    const ownerId =
        req.user.userId;


    // Find shop of logged-in owner

    const shopSql = `
        SELECT shop_id
        FROM shops
        WHERE owner_id = ?
    `;


    db.query(
        shopSql,
        [ownerId],
        (err, shopResults) => {

            if (err) {

                console.error(
                    "Find shop error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Database error"
                });

            }


            if (
                shopResults.length === 0
            ) {

                return res.status(404).json({

                    message:
                        "You must create a shop before creating a post"

                });

            }


            const shopId =
                shopResults[0].shop_id;


            // Image

            const image =
                req.file
                    ? req.file.filename
                    : null;


            // Insert post

            const postSql = `
                INSERT INTO posts
                (
                    shop_id,
                    title,
                    description,
                    image,
                    price
                )
                VALUES (?, ?, ?, ?, ?)
            `;


            db.query(
                postSql,
                [
                    shopId,
                    title,
                    description,
                    image,
                    price || null
                ],
                (err, result) => {

                    if (err) {

                        console.error(
                            "Create post error:",
                            err
                        );

                        return res.status(500).json({

                            message:
                                "Failed to create post"

                        });

                    }


                    res.status(201).json({

                        message:
                            "Post created successfully",

                        postId:
                            result.insertId

                    });

                }
            );

        }
    );

};


// ======================================================
// GET ALL POSTS
// ======================================================

const getAllPosts = (req, res) => {

    const sql = `
        SELECT
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

        JOIN shops s
            ON p.shop_id = s.shop_id

        ORDER BY
            p.created_at DESC
    `;


    db.query(
        sql,
        (err, results) => {

            if (err) {

                console.error(
                    "Get all posts error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Failed to fetch posts"

                });

            }


            res.status(200).json({

                message:
                    "All posts fetched successfully",

                posts:
                    results

            });

        }
    );

};


// ======================================================
// GET POSTS BY SHOP
// ======================================================

const getPostsByShop = (req, res) => {

    const {
        shopId
    } = req.params;


    const sql = `
        SELECT
            post_id,
            shop_id,
            title,
            description,
            image,
            price,
            created_at

        FROM posts

        WHERE shop_id = ?

        ORDER BY
            created_at DESC
    `;


    db.query(
        sql,
        [shopId],
        (err, results) => {

            if (err) {

                console.error(
                    "Get shop posts error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Failed to fetch posts"

                });

            }


            res.status(200).json({

                message:
                    "Posts fetched successfully",

                posts:
                    results

            });

        }
    );

};


// ======================================================
// UPDATE POST
// ======================================================

const updatePost = (req, res) => {

    const {
        postId
    } = req.params;


    const {
        title,
        description,
        price
    } = req.body;


    // Check ownership

    const checkSql = `
        SELECT
            p.post_id

        FROM posts p

        JOIN shops s
            ON p.shop_id = s.shop_id

        WHERE p.post_id = ?

        AND s.owner_id = ?
    `;


    db.query(
        checkSql,
        [
            postId,
            req.user.userId
        ],
        (err, results) => {

            if (err) {

                console.error(
                    "Check post ownership error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Database error"

                });

            }


            if (
                results.length === 0
            ) {

                return res.status(403).json({

                    message:
                        "You are not authorized to update this post"

                });

            }


            // Update

            const updateSql = `
                UPDATE posts

                SET
                    title = ?,
                    description = ?,
                    price = ?

                WHERE post_id = ?
            `;


            db.query(
                updateSql,
                [
                    title,
                    description,
                    price || null,
                    postId
                ],
                (err) => {

                    if (err) {

                        console.error(
                            "Update post error:",
                            err
                        );

                        return res.status(500).json({

                            message:
                                "Failed to update post"

                        });

                    }


                    res.status(200).json({

                        message:
                            "Post updated successfully"

                    });

                }
            );

        }
    );

};


// ======================================================
// DELETE POST
// ======================================================

const deletePost = (req, res) => {

    const {
        postId
    } = req.params;


    // Check ownership

    const checkSql = `
        SELECT
            p.post_id

        FROM posts p

        JOIN shops s
            ON p.shop_id = s.shop_id

        WHERE p.post_id = ?

        AND s.owner_id = ?
    `;


    db.query(
        checkSql,
        [
            postId,
            req.user.userId
        ],
        (err, results) => {

            if (err) {

                console.error(
                    "Check delete ownership error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Database error"

                });

            }


            if (
                results.length === 0
            ) {

                return res.status(403).json({

                    message:
                        "You are not authorized to delete this post"

                });

            }


            const deleteSql = `
                DELETE FROM posts
                WHERE post_id = ?
            `;


            db.query(
                deleteSql,
                [postId],
                (err) => {

                    if (err) {

                        console.error(
                            "Delete post error:",
                            err
                        );

                        return res.status(500).json({

                            message:
                                "Failed to delete post"

                        });

                    }


                    res.status(200).json({

                        message:
                            "Post deleted successfully"

                    });

                }
            );

        }
    );

};


// ======================================================
// ADD INTEREST
// ======================================================

const addInterest = (req, res) => {

    const {
        postId
    } = req.params;


    const userId =
        req.user.userId;


    // Check if post exists

    const postSql = `
        SELECT post_id
        FROM posts
        WHERE post_id = ?
    `;


    db.query(
        postSql,
        [postId],
        (err, postResults) => {

            if (err) {

                console.error(
                    "Check post error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Database error"

                });

            }


            if (
                postResults.length === 0
            ) {

                return res.status(404).json({

                    message:
                        "Post not found"

                });

            }


            // Check existing interest

            const checkSql = `
                SELECT
                    interest_id

                FROM post_interests

                WHERE post_id = ?

                AND user_id = ?
            `;


            db.query(
                checkSql,
                [
                    postId,
                    userId
                ],
                (err, results) => {

                    if (err) {

                        console.error(
                            "Check interest error:",
                            err
                        );

                        return res.status(500).json({

                            message:
                                "Database error"

                        });

                    }


                    if (
                        results.length > 0
                    ) {

                        return res.status(400).json({

                            message:
                                "You are already interested in this post"

                        });

                    }


                    // Insert interest

                    const insertSql = `
                        INSERT INTO post_interests
                        (
                            post_id,
                            user_id
                        )
                        VALUES (?, ?)
                    `;


                    db.query(
                        insertSql,
                        [
                            postId,
                            userId
                        ],
                        (err, result) => {

                            if (err) {

                                console.error(
                                    "Insert interest error:",
                                    err
                                );


                                if (
                                    err.code ===
                                    "ER_DUP_ENTRY"
                                ) {

                                    return res.status(400).json({

                                        message:
                                            "You are already interested in this post"

                                    });

                                }


                                return res.status(500).json({

                                    message:
                                        "Failed to add interest"

                                });

                            }


                            res.status(201).json({

                                message:
                                    "Interest added successfully",

                                interestId:
                                    result.insertId

                            });

                        }
                    );

                }
            );

        }
    );

};


// ======================================================
// REMOVE INTEREST
// ======================================================

const removeInterest = (req, res) => {

    const {
        postId
    } = req.params;


    const userId =
        req.user.userId;


    const sql = `
        DELETE FROM post_interests

        WHERE post_id = ?

        AND user_id = ?
    `;


    db.query(
        sql,
        [
            postId,
            userId
        ],
        (err, result) => {

            if (err) {

                console.error(
                    "Remove interest error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Failed to remove interest"

                });

            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({

                    message:
                        "Interest not found"

                });

            }


            res.status(200).json({

                message:
                    "Interest removed successfully"

            });

        }
    );

};


// ======================================================
// GET INTEREST COUNT
// ======================================================

const getInterestCount = (req, res) => {

    const {
        postId
    } = req.params;


    const sql = `
        SELECT
            COUNT(*) AS interestCount

        FROM post_interests

        WHERE post_id = ?
    `;


    db.query(
        sql,
        [postId],
        (err, results) => {

            if (err) {

                console.error(
                    "Interest count error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Failed to get interest count"

                });

            }


            res.status(200).json({

                interestCount:
                    Number(
                        results[0].interestCount
                    )

            });

        }
    );

};


// ======================================================
// GET INTEREST STATUS
// ======================================================

const getInterestStatus = (req, res) => {

    const {
        postId
    } = req.params;


    const userId =
        req.user.userId;


    const sql = `
        SELECT
            interest_id

        FROM post_interests

        WHERE post_id = ?

        AND user_id = ?
    `;


    db.query(
        sql,
        [
            postId,
            userId
        ],
        (err, results) => {

            if (err) {

                console.error(
                    "Interest status error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Failed to check interest status"

                });

            }


            res.status(200).json({

                interested:
                    results.length > 0

            });

        }
    );

};


// ======================================================
// EXPORT ALL FUNCTIONS
// ======================================================

module.exports = {

    createPost,

    getPostsByShop,

    getAllPosts,

    updatePost,

    deletePost,

    addInterest,

    removeInterest,

    getInterestCount,

    getInterestStatus

};
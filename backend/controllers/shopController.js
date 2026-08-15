const db = require("../config/db");


// ========================================
// CREATE SHOP
// ========================================

const createShop = (req, res) => {

    try {

        console.log(
            "Create shop request received"
        );


        console.log(
            "User:",
            req.user
        );


        console.log(
            "Body:",
            req.body
        );


        console.log(
            "File:",
            req.file
        );


        // ========================================
        // GET FORM DATA
        // ========================================

        const {
            shop_name,
            description,
            address,
            city,
            phone,
            category
        } = req.body;


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !shop_name ||
            !address ||
            !city ||
            !phone ||
            !category
        ) {

            return res.status(400).json({

                message:
                    "Please fill all required fields"

            });

        }


        // ========================================
        // CHECK USER
        // ========================================

        if (
            !req.user ||
            !req.user.userId
        ) {

            return res.status(401).json({

                message:
                    "Authentication required"

            });

        }


        const ownerId =
            req.user.userId;


        // ========================================
        // SHOP IMAGE
        // ========================================

        let shopImage = null;


        if (req.file) {

            shopImage =
                req.file.filename;

        }


        // ========================================
        // CHECK WHETHER USER ALREADY HAS SHOP
        // ========================================

        const checkShopSql = `

            SELECT shop_id

            FROM shops

            WHERE owner_id = ?

        `;


        db.query(

            checkShopSql,

            [ownerId],

            (err, results) => {

                if (err) {

                    console.error(
                        "Check existing shop error:",
                        err
                    );


                    return res.status(500).json({

                        message:
                            "Database error while checking shop",

                        error:
                            err.message

                    });

                }


                // ========================================
                // USER ALREADY HAS SHOP
                // ========================================

                if (
                    results.length > 0
                ) {

                    return res.status(400).json({

                        message:
                            "You already have a shop"

                    });

                }


                // ========================================
                // INSERT SHOP
                // ========================================

                const insertSql = `

                    INSERT INTO shops
                    (
                        owner_id,
                        shop_name,
                        description,
                        address,
                        city,
                        phone,
                        category,
                        shop_image
                    )

                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)

                `;


                db.query(

                    insertSql,

                    [

                        ownerId,

                        shop_name.trim(),

                        description
                            ? description.trim()
                            : null,

                        address.trim(),

                        city.trim(),

                        phone.trim(),

                        category,

                        shopImage

                    ],

                    (err, result) => {

                        if (err) {

                            console.error(
                                "Create shop database error:",
                                err
                            );


                            return res.status(500).json({

                                message:
                                    "Failed to create shop",

                                error:
                                    err.message

                            });

                        }


                        console.log(
                            "Shop created:",
                            result.insertId
                        );


                        return res.status(201).json({

                            message:
                                "Shop created successfully",

                            shopId:
                                result.insertId,

                            shopImage:
                                shopImage

                        });

                    }

                );

            }

        );

    } catch (error) {

        console.error(
            "Create shop unexpected error:",
            error
        );


        return res.status(500).json({

            message:
                "Server error while creating shop",

            error:
                error.message

        });

    }

};


// ========================================
// GET ALL SHOPS
// ========================================

const getAllShops = (req, res) => {

    const {
        search,
        city,
        category
    } = req.query;


    let sql = `

        SELECT
            shop_id,
            owner_id,
            shop_name,
            description,
            address,
            city,
            phone,
            category,
            shop_image

        FROM shops

        WHERE 1 = 1

    `;


    const values = [];


    // ========================================
    // SEARCH
    // ========================================

    if (search) {

        sql += `

            AND shop_name LIKE ?

        `;


        values.push(
            `%${search}%`
        );

    }


    // ========================================
    // CITY
    // ========================================

    if (city) {

        sql += `

            AND city LIKE ?

        `;


        values.push(
            `%${city}%`
        );

    }


    // ========================================
    // CATEGORY
    // ========================================

    if (
        category &&
        category !== "All"
    ) {

        sql += `

            AND category = ?

        `;


        values.push(
            category
        );

    }


    // ========================================
    // ORDER
    // ========================================

    sql += `

        ORDER BY shop_id DESC

    `;


    db.query(

        sql,

        values,

        (err, results) => {

            if (err) {

                console.error(
                    "Get all shops error:",
                    err
                );


                return res.status(500).json({

                    message:
                        "Failed to fetch shops",

                    error:
                        err.message

                });

            }


            return res.status(200).json({

                message:
                    "Shops fetched successfully",

                shops:
                    results

            });

        }

    );

};


// ========================================
// GET SHOP BY ID
// ========================================

// ======================================================
// GET SHOP BY ID
// ======================================================

const getShopById = (req, res) => {

    const shopId = req.params.shopId;

    console.log(
        "Requested Shop ID:",
        shopId
    );

    const sql = `
        SELECT
            shop_id,
            owner_id,
            shop_name,
            category,
            description,
            address,
            city,
            phone,
            shop_image
        FROM shops
        WHERE shop_id = ?
    `;

    db.query(
        sql,
        [shopId],
        (err, results) => {

            if (err) {

                console.error(
                    "Get shop by ID error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Database error while fetching shop"

                });

            }

            console.log(
                "Shop query result:",
                results
            );


            if (
                results.length === 0
            ) {

                return res.status(404).json({

                    message:
                        "Shop not found"

                });

            }


            return res.status(200).json({

                message:
                    "Shop fetched successfully",

                shop:
                    results[0]

            });

        }
    );

};

// ========================================
// GET MY SHOP
// ========================================

const getMyShop = (req, res) => {

    // ========================================
    // CHECK TOKEN
    // ========================================

    if (
        !req.user ||
        !req.user.userId
    ) {

        return res.status(401).json({

            message:
                "Authentication required"

        });

    }


    const ownerId =
        req.user.userId;


    const sql = `

        SELECT
            shop_id,
            owner_id,
            shop_name,
            description,
            address,
            city,
            phone,
            category,
            shop_image

        FROM shops

        WHERE owner_id = ?

    `;


    db.query(

        sql,

        [ownerId],

        (err, results) => {

            if (err) {

                console.error(
                    "Get my shop error:",
                    err
                );


                return res.status(500).json({

                    message:
                        "Failed to fetch your shop",

                    error:
                        err.message

                });

            }


            // ========================================
            // USER HAS NO SHOP
            // ========================================

            if (
                results.length === 0
            ) {

                return res.status(404).json({

                    message:
                        "You have not created a shop yet"

                });

            }


            return res.status(200).json({

                message:
                    "Shop fetched successfully",

                shop:
                    results[0]

            });

        }

    );

};

// ======================================================
// DELETE MY SHOP
// ======================================================

const deleteMyShop = (req, res) => {

    const ownerId = req.user.userId;

    // First find the owner's shop
    const findShopSql = `
        SELECT shop_id
        FROM shops
        WHERE owner_id = ?
    `;

    db.query(
        findShopSql,
        [ownerId],
        (err, shopResults) => {

            if (err) {

                console.error(
                    "Find shop for deletion error:",
                    err
                );

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (shopResults.length === 0) {

                return res.status(404).json({
                    message: "You do not have a shop"
                });
            }

            const shopId =
                shopResults[0].shop_id;


            // ------------------------------------------
            // Delete interests related to posts
            // ------------------------------------------

            const deleteInterestsSql = `
                DELETE pi
                FROM post_interests pi
                INNER JOIN posts p
                    ON pi.post_id = p.post_id
                WHERE p.shop_id = ?
            `;

            db.query(
                deleteInterestsSql,
                [shopId],
                (err) => {

                    if (err) {

                        console.error(
                            "Delete shop interests error:",
                            err
                        );

                        return res.status(500).json({
                            message:
                                "Failed to delete shop interests"
                        });
                    }


                    // ------------------------------------------
                    // Delete posts
                    // ------------------------------------------

                    const deletePostsSql = `
                        DELETE FROM posts
                        WHERE shop_id = ?
                    `;

                    db.query(
                        deletePostsSql,
                        [shopId],
                        (err) => {

                            if (err) {

                                console.error(
                                    "Delete shop posts error:",
                                    err
                                );

                                return res.status(500).json({
                                    message:
                                        "Failed to delete shop posts"
                                });
                            }


                            // ------------------------------------------
                            // Delete shop
                            // ------------------------------------------

                            const deleteShopSql = `
                                DELETE FROM shops
                                WHERE shop_id = ?
                                AND owner_id = ?
                            `;

                            db.query(
                                deleteShopSql,
                                [
                                    shopId,
                                    ownerId
                                ],
                                (err, result) => {

                                    if (err) {

                                        console.error(
                                            "Delete shop error:",
                                            err
                                        );

                                        return res.status(500).json({
                                            message:
                                                "Failed to delete shop"
                                        });
                                    }


                                    if (
                                        result.affectedRows === 0
                                    ) {

                                        return res.status(403).json({
                                            message:
                                                "You are not authorized to delete this shop"
                                        });
                                    }


                                    res.status(200).json({

                                        message:
                                            "Shop deleted successfully",

                                        shopId:
                                            shopId

                                    });

                                }
                            );

                        }
                    );

                }
            );

        }
    );
};

// ======================================================
// UPDATE MY SHOP
// ======================================================

const updateMyShop = (req, res) => {

    const ownerId = req.user.userId;

    const {
        shop_name,
        category,
        description,
        address,
        city,
        phone
    } = req.body;


    // ========================================
    // VALIDATION
    // ========================================

    if (!shop_name || !shop_name.trim()) {

        return res.status(400).json({
            message: "Shop name is required"
        });

    }


    if (!category || !category.trim()) {

        return res.status(400).json({
            message: "Category is required"
        });

    }


    if (!address || !address.trim()) {

        return res.status(400).json({
            message: "Address is required"
        });

    }


    if (!city || !city.trim()) {

        return res.status(400).json({
            message: "City is required"
        });

    }


    if (!phone || !phone.trim()) {

        return res.status(400).json({
            message: "Phone number is required"
        });

    }


    // ========================================
    // CHECK SHOP
    // ========================================

    const checkSql = `
        SELECT shop_id
        FROM shops
        WHERE owner_id = ?
    `;


    db.query(
        checkSql,
        [ownerId],
        (err, results) => {

            if (err) {

                console.error(
                    "Check shop error:",
                    err
                );

                return res.status(500).json({
                    message: "Database error"
                });

            }


            if (results.length === 0) {

                return res.status(404).json({
                    message:
                        "You do not have a shop"
                });

            }


            const shopId =
                results[0].shop_id;


            // ========================================
            // UPDATE SHOP
            // ========================================

            const updateSql = `
                UPDATE shops
                SET
                    shop_name = ?,
                    category = ?,
                    description = ?,
                    address = ?,
                    city = ?,
                    phone = ?
                WHERE
                    shop_id = ?
                    AND owner_id = ?
            `;


            db.query(
                updateSql,
                [
                    shop_name.trim(),
                    category.trim(),
                    description
                        ? description.trim()
                        : null,
                    address.trim(),
                    city.trim(),
                    phone.trim(),
                    shopId,
                    ownerId
                ],
                (err, result) => {

                    if (err) {

                        console.error(
                            "Update shop error:",
                            err
                        );

                        return res.status(500).json({
                            message:
                                "Failed to update shop"
                        });

                    }


                    if (
                        result.affectedRows === 0
                    ) {

                        return res.status(403).json({
                            message:
                                "You are not authorized to update this shop"
                        });

                    }


                    // ========================================
                    // GET UPDATED SHOP
                    // ========================================

                    const getSql = `
                        SELECT
                            shop_id,
                            owner_id,
                            shop_name,
                            category,
                            description,
                            address,
                            city,
                            phone,
                            shop_image
                        FROM shops
                        WHERE shop_id = ?
                    `;


                    db.query(
                        getSql,
                        [shopId],
                        (err, updatedResults) => {

                            if (err) {

                                console.error(
                                    "Get updated shop error:",
                                    err
                                );

                                return res.status(500).json({
                                    message:
                                        "Shop updated but failed to fetch updated data"
                                });

                            }


                            return res.status(200).json({

                                message:
                                    "Shop updated successfully",

                                shop:
                                    updatedResults[0]

                            });

                        }
                    );

                }
            );

        }
    );

};
// ========================================
// EXPORT
// ========================================

module.exports = {

    createShop,

    getAllShops,

    getShopById,

    getMyShop,

    deleteMyShop,
    updateMyShop


};
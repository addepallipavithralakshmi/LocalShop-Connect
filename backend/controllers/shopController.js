const db = require("../config/db");


// ========================================
// CREATE SHOP
// ========================================

const createShop = async (req, res) => {

    try {

        console.log("Create shop request received");
        console.log("User:", req.user);
        console.log("Body:", req.body);
        console.log("File:", req.file);


        const {
            shop_name,
            description,
            address,
            city,
            phone,
            category
        } = req.body;


        // Validation

        if (!shop_name || !address || !city || !phone || !category) {

            return res.status(400).json({
                message: "Please fill all required fields"
            });

        }


        if (!req.user || !req.user.userId) {

            return res.status(401).json({
                message: "Authentication required"
            });

        }


        const ownerId = req.user.userId;

        const shopImage = req.file ? req.file.filename : null;


        // Check if user already has a shop

        const checkResult = await db.query(
            `SELECT shop_id FROM shops WHERE owner_id = $1`,
            [ownerId]
        );


        if (checkResult.rows.length > 0) {

            return res.status(400).json({
                message: "You already have a shop"
            });

        }


        // Insert shop

        const insertResult = await db.query(
            `INSERT INTO shops
                (owner_id, shop_name, description, address, city, phone, category, shop_image)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING shop_id`,
            [
                ownerId,
                shop_name.trim(),
                description ? description.trim() : null,
                address.trim(),
                city.trim(),
                phone.trim(),
                category,
                shopImage
            ]
        );


        const shopId = insertResult.rows[0].shop_id;

        console.log("Shop created:", shopId);


        return res.status(201).json({
            message:   "Shop created successfully",
            shopId:    shopId,
            shopImage: shopImage
        });


    } catch (error) {

        console.error("Create shop unexpected error:", error);

        return res.status(500).json({
            message: "Server error while creating shop",
            error:   error.message
        });

    }

};


// ========================================
// GET ALL SHOPS
// ========================================

const getAllShops = async (req, res) => {

    try {

        const { search, city, category } = req.query;

        let sql    = `SELECT shop_id, owner_id, shop_name, description, address, city, phone, category, shop_image FROM shops WHERE 1 = 1`;
        const values = [];
        let   idx    = 1;


        if (search) {
            sql += ` AND shop_name ILIKE $${idx++}`;
            values.push(`%${search}%`);
        }

        if (city) {
            sql += ` AND city ILIKE $${idx++}`;
            values.push(`%${city}%`);
        }

        if (category && category !== "All") {
            sql += ` AND category = $${idx++}`;
            values.push(category);
        }

        sql += ` ORDER BY shop_id DESC`;


        const result = await db.query(sql, values);


        return res.status(200).json({
            message: "Shops fetched successfully",
            shops:   result.rows
        });


    } catch (error) {

        console.error("Get all shops error:", error);

        return res.status(500).json({
            message: "Failed to fetch shops",
            error:   error.message
        });

    }

};


// ========================================
// GET SHOP BY ID
// ========================================

const getShopById = async (req, res) => {

    try {

        const shopId = req.params.shopId;

        console.log("Requested Shop ID:", shopId);


        const result = await db.query(
            `SELECT shop_id, owner_id, shop_name, category, description, address, city, phone, shop_image
             FROM shops
             WHERE shop_id = $1`,
            [shopId]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Shop not found"
            });

        }


        return res.status(200).json({
            message: "Shop fetched successfully",
            shop:    result.rows[0]
        });


    } catch (error) {

        console.error("Get shop by ID error:", error);

        return res.status(500).json({
            message: "Database error while fetching shop"
        });

    }

};


// ========================================
// GET MY SHOP
// ========================================

const getMyShop = async (req, res) => {

    try {

        if (!req.user || !req.user.userId) {

            return res.status(401).json({
                message: "Authentication required"
            });

        }


        const ownerId = req.user.userId;


        const result = await db.query(
            `SELECT shop_id, owner_id, shop_name, description, address, city, phone, category, shop_image
             FROM shops
             WHERE owner_id = $1`,
            [ownerId]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "You have not created a shop yet"
            });

        }


        return res.status(200).json({
            message: "Shop fetched successfully",
            shop:    result.rows[0]
        });


    } catch (error) {

        console.error("Get my shop error:", error);

        return res.status(500).json({
            message: "Failed to fetch your shop",
            error:   error.message
        });

    }

};


// ========================================
// UPDATE MY SHOP
// ========================================

const updateMyShop = async (req, res) => {

    try {

        const ownerId = req.user.userId;

        const {
            shop_name,
            category,
            description,
            address,
            city,
            phone
        } = req.body;


        if (!shop_name || !shop_name.trim()) {
            return res.status(400).json({ message: "Shop name is required" });
        }

        if (!category || !category.trim()) {
            return res.status(400).json({ message: "Category is required" });
        }

        if (!address || !address.trim()) {
            return res.status(400).json({ message: "Address is required" });
        }

        if (!city || !city.trim()) {
            return res.status(400).json({ message: "City is required" });
        }

        if (!phone || !phone.trim()) {
            return res.status(400).json({ message: "Phone number is required" });
        }


        // Check shop exists

        const checkResult = await db.query(
            `SELECT shop_id FROM shops WHERE owner_id = $1`,
            [ownerId]
        );


        if (checkResult.rows.length === 0) {

            return res.status(404).json({
                message: "You do not have a shop"
            });

        }


        const shopId = checkResult.rows[0].shop_id;


        // Update

        const updateResult = await db.query(
            `UPDATE shops
             SET shop_name   = $1,
                 category    = $2,
                 description = $3,
                 address     = $4,
                 city        = $5,
                 phone       = $6
             WHERE shop_id = $7
               AND owner_id = $8
             RETURNING shop_id`,
            [
                shop_name.trim(),
                category.trim(),
                description ? description.trim() : null,
                address.trim(),
                city.trim(),
                phone.trim(),
                shopId,
                ownerId
            ]
        );


        if (updateResult.rowCount === 0) {

            return res.status(403).json({
                message: "You are not authorized to update this shop"
            });

        }


        // Return updated shop

        const getResult = await db.query(
            `SELECT shop_id, owner_id, shop_name, category, description, address, city, phone, shop_image
             FROM shops
             WHERE shop_id = $1`,
            [shopId]
        );


        return res.status(200).json({
            message: "Shop updated successfully",
            shop:    getResult.rows[0]
        });


    } catch (error) {

        console.error("Update shop error:", error);

        return res.status(500).json({
            message: "Failed to update shop"
        });

    }

};


// ========================================
// DELETE MY SHOP
// ========================================

const deleteMyShop = async (req, res) => {

    try {

        const ownerId = req.user.userId;


        // Find shop

        const shopResult = await db.query(
            `SELECT shop_id FROM shops WHERE owner_id = $1`,
            [ownerId]
        );


        if (shopResult.rows.length === 0) {

            return res.status(404).json({
                message: "You do not have a shop"
            });

        }


        const shopId = shopResult.rows[0].shop_id;


        // Delete interests on posts belonging to this shop
        // (Postgres does not support DELETE with JOIN — use a subquery)

        await db.query(
            `DELETE FROM post_interests
             WHERE post_id IN (
                 SELECT post_id FROM posts WHERE shop_id = $1
             )`,
            [shopId]
        );


        // Delete posts

        await db.query(
            `DELETE FROM posts WHERE shop_id = $1`,
            [shopId]
        );


        // Delete shop

        const deleteResult = await db.query(
            `DELETE FROM shops
             WHERE shop_id = $1 AND owner_id = $2
             RETURNING shop_id`,
            [shopId, ownerId]
        );


        if (deleteResult.rowCount === 0) {

            return res.status(403).json({
                message: "You are not authorized to delete this shop"
            });

        }


        return res.status(200).json({
            message: "Shop deleted successfully",
            shopId:  shopId
        });


    } catch (error) {

        console.error("Delete shop error:", error);

        return res.status(500).json({
            message: "Failed to delete shop"
        });

    }

};


// ========================================
// EXPORT
// ========================================

module.exports = {
    createShop,
    getAllShops,
    getShopById,
    getMyShop,
    updateMyShop,
    deleteMyShop
};

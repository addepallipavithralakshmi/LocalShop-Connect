const express = require("express");
const multer  = require("multer");
const path    = require("path");

const router = express.Router();


// ========================================
// CONTROLLER
// ========================================

const {
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
} = require("../controllers/postController");


// ========================================
// AUTH MIDDLEWARE
// ========================================

const { verifyToken } =
    require("../middleware/authMiddleware");


// ========================================
// MULTER STORAGE
// ========================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/post-images");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);
        cb(null, uniqueName);
    }

});

const upload = multer({

    storage,

    limits: { fileSize: 5 * 1024 * 1024 },

    fileFilter: (req, file, cb) => {

        const allowed = /jpeg|jpg|png|webp/;

        const extOk  = allowed.test(path.extname(file.originalname).toLowerCase());
        const mimeOk = allowed.test(file.mimetype);

        if (extOk && mimeOk) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));
        }

    }

});


// ========================================
// ROUTES
// Note: specific sub-paths (/shop/:id, /interests, /interest-status)
// must come BEFORE the wildcard /:postId routes.
// ========================================

// Create post
router.post(  "/",                      verifyToken, upload.single("image"), createPost);

// Get all posts
router.get(   "/",                      getAllPosts);

// Get posts by shop  — must be before /:postId
router.get(   "/shop/:shopId",          getPostsByShop);

// Get single post by ID
router.get(   "/:postId",              getPostById);

// Update post
router.put(   "/:postId",              verifyToken, updatePost);

// Delete post
router.delete("/:postId",              verifyToken, deletePost);

// Interest routes — must be before /:postId delete to avoid ambiguity
router.post(  "/:postId/interest",     verifyToken, addInterest);
router.delete("/:postId/interest",     verifyToken, removeInterest);
router.get(   "/:postId/interests",    getInterestCount);
router.get(   "/:postId/interest-status", verifyToken, getInterestStatus);


// ========================================
// EXPORT
// ========================================

module.exports = router;

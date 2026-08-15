const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();


// ========================================
// CONTROLLER
// ========================================

const postController =
    require("../controllers/postController");


// ========================================
// AUTH MIDDLEWARE
// ========================================

const authMiddleware =
    require("../middleware/authMiddleware");

// Supports both:
// module.exports = verifyToken
// and
// module.exports = { verifyToken }

const verifyToken =
    typeof authMiddleware === "function"
        ? authMiddleware
        : authMiddleware.verifyToken;


// ========================================
// CHECK FUNCTIONS
// ========================================

console.log(
    "========================================"
);

console.log(
    "POST CONTROLLER FUNCTIONS"
);

console.log(
    "createPost:",
    typeof postController.createPost
);

console.log(
    "getPostsByShop:",
    typeof postController.getPostsByShop
);

console.log(
    "getAllPosts:",
    typeof postController.getAllPosts
);

console.log(
    "updatePost:",
    typeof postController.updatePost
);

console.log(
    "deletePost:",
    typeof postController.deletePost
);

console.log(
    "addInterest:",
    typeof postController.addInterest
);

console.log(
    "removeInterest:",
    typeof postController.removeInterest
);

console.log(
    "getInterestCount:",
    typeof postController.getInterestCount
);

console.log(
    "getInterestStatus:",
    typeof postController.getInterestStatus
);

console.log(
    "verifyToken:",
    typeof verifyToken
);

console.log(
    "========================================"
);


// ========================================
// MULTER STORAGE
// ========================================

const storage =
    multer.diskStorage({

        destination: (req, file, cb) => {

            cb(
                null,
                "uploads/post-images"
            );

        },

        filename: (req, file, cb) => {

            const uniqueName =
                Date.now() +
                "-" +
                Math.round(
                    Math.random() * 1E9
                ) +
                path.extname(
                    file.originalname
                );

            cb(
                null,
                uniqueName
            );

        }

    });


// ========================================
// MULTER UPLOAD
// ========================================

const upload =
    multer({

        storage: storage,

        limits: {

            fileSize:
                5 * 1024 * 1024

        },

        fileFilter:
            (req, file, cb) => {

                const allowedTypes =
                    /jpeg|jpg|png|webp/;

                const extension =
                    allowedTypes.test(
                        path
                            .extname(
                                file.originalname
                            )
                            .toLowerCase()
                    );

                const mimeType =
                    allowedTypes.test(
                        file.mimetype
                    );

                if (
                    extension &&
                    mimeType
                ) {

                    cb(
                        null,
                        true
                    );

                } else {

                    cb(
                        new Error(
                            "Only JPG, JPEG, PNG and WEBP images are allowed"
                        )
                    );

                }

            }

    });


// ========================================
// CREATE POST
// ========================================

router.post(
    "/",
    verifyToken,
    upload.single("image"),
    postController.createPost
);


// ========================================
// GET ALL POSTS
// ========================================

router.get(
    "/",
    postController.getAllPosts
);


// ========================================
// GET POSTS BY SHOP
// ========================================

router.get(
    "/shop/:shopId",
    postController.getPostsByShop
);


// ========================================
// UPDATE POST
// ========================================

router.put(
    "/:postId",
    verifyToken,
    postController.updatePost
);


// ========================================
// DELETE POST
// ========================================

router.delete(
    "/:postId",
    verifyToken,
    postController.deletePost
);


// ========================================
// ADD INTEREST
// ========================================

router.post(
    "/:postId/interest",
    verifyToken,
    postController.addInterest
);


// ========================================
// REMOVE INTEREST
// ========================================

router.delete(
    "/:postId/interest",
    verifyToken,
    postController.removeInterest
);


// ========================================
// GET INTEREST COUNT
// ========================================

router.get(
    "/:postId/interests",
    postController.getInterestCount
);


// ========================================
// GET INTEREST STATUS
// ========================================

router.get(
    "/:postId/interest-status",
    verifyToken,
    postController.getInterestStatus
);


// ========================================
// EXPORT
// ========================================

module.exports = router;
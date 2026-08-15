const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();


// ======================================================
// CONTROLLERS
// ======================================================

const {
    createShop,
    getAllShops,
    getShopById,
    getMyShop,
    updateMyShop,
    deleteMyShop
} = require("../controllers/shopController");


// ======================================================
// AUTHENTICATION
// ======================================================

const {
    verifyToken
} = require("../middleware/authMiddleware");


// ======================================================
// UPLOAD DIRECTORY
// ======================================================

const uploadDirectory =
    path.join(
        __dirname,
        "..",
        "uploads",
        "shop-images"
    );


if (
    !fs.existsSync(
        uploadDirectory
    )
) {

    fs.mkdirSync(
        uploadDirectory,
        {
            recursive: true
        }
    );

}


// ======================================================
// MULTER STORAGE
// ======================================================

const storage =
    multer.diskStorage({

        destination: (
            req,
            file,
            cb
        ) => {

            cb(
                null,
                uploadDirectory
            );

        },


        filename: (
            req,
            file,
            cb
        ) => {

            const extension =
                path.extname(
                    file.originalname
                ).toLowerCase();


            const uniqueName =
                Date.now() +
                "-" +
                Math.round(
                    Math.random() * 1E9
                ) +
                extension;


            cb(
                null,
                uniqueName
            );

        }

    });


// ======================================================
// MULTER
// ======================================================

const upload =
    multer({

        storage: storage,

        limits: {

            fileSize:
                5 * 1024 * 1024

        },


        fileFilter: (
            req,
            file,
            cb
        ) => {

            const allowedExtensions =
                /\.(jpeg|jpg|png|webp)$/i;


            const allowedMimeTypes = [

                "image/jpeg",

                "image/jpg",

                "image/png",

                "image/webp"

            ];


            const extensionValid =
                allowedExtensions.test(
                    file.originalname
                );


            const mimeValid =
                allowedMimeTypes.includes(
                    file.mimetype
                );


            if (
                extensionValid &&
                mimeValid
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


// ======================================================
// CREATE SHOP
// ======================================================

router.post(
    "/",
    verifyToken,
    upload.single("shop_image"),
    createShop
);


// ======================================================
// GET MY SHOP
// ======================================================

router.get(
    "/my-shop",
    verifyToken,
    getMyShop
);


// ======================================================
// UPDATE MY SHOP
// ======================================================

router.put(
    "/my-shop",
    verifyToken,
    updateMyShop
);


// ======================================================
// DELETE MY SHOP
// ======================================================

router.delete(
    "/my-shop",
    verifyToken,
    deleteMyShop
);


// ======================================================
// GET ALL SHOPS
// ======================================================

router.get(
    "/",
    getAllShops
);


// ======================================================
// GET SHOP BY ID
// ======================================================

router.get(
    "/:shopId",
    getShopById
);


// ======================================================
// MULTER ERROR HANDLER
// ======================================================

router.use(
    (err, req, res, next) => {

        console.error(
            "Shop upload error:",
            err
        );


        if (
            err instanceof
            multer.MulterError
        ) {

            return res.status(400).json({

                message:
                    err.message

            });

        }


        if (err) {

            return res.status(400).json({

                message:
                    err.message

            });

        }


        next();

    }
);


module.exports = router;
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

require("./config/db");

const authRoutes =
    require("./routes/authRoutes");

const shopRoutes =
    require("./routes/shopRoutes");

const postRoutes =
    require("./routes/postRoutes");

const app =
    express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());


// ========================================
// STATIC UPLOADS
// ========================================

app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "uploads"
        )
    )
);


// ========================================
// ROUTES
// ========================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/shops",
    shopRoutes
);

app.use(
    "/api/posts",
    postRoutes
);


// ========================================
// TEST
// ========================================

app.get(
    "/",
    (req, res) => {

        res.send(
            "Welcome to LocalShop Connect API"
        );

    }
);


// ========================================
// SERVER
// ========================================

// const PORT =
//     process.env.PORT || 5000;

// app.listen(
//     PORT,
//     () => {

//         console.log(
//             `Server running on http://localhost:${PORT}`
//         );

//     }
// );

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);
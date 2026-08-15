import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/shopDetails.css";
import "./styles/theme.css";
import "./styles/animations.css";
import "./styles/navbar.css";
import "./styles/cards.css";
import "./styles/pages.css";
import "./styles/shops.css";
import "./styles/posts.css";
import App from "./App.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
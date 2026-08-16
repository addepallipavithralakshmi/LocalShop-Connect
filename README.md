# LocalShop Connect

LocalShop Connect is a full-stack web application that connects local shop owners with customers. Shop owners can manage their shops, products, and offers, while customers can discover shops, browse products, search, filter, and show interest.

---

## Project Overview

LocalShop Connect provides a single platform for local businesses to showcase their shops, products, and offers.

Customers can discover local shops and interact with available products and offers.

---

## Project Purpose

The main purpose of the project is to help local shop owners improve their online presence and provide customers with an easy way to discover local businesses and products.

---

## Key Features

- User registration and login
- JWT authentication
- Shop creation and management
- Shop image upload
- Product and offer posts
- Product image upload
- Edit and delete shops
- Edit and delete posts
- Customer interest system
- Search and category filtering
- Shop owner dashboard
- Responsive and interactive UI
- REST API integration
- MySQL database

---

## Customer Features

Customers can:

- Register and login
- Browse local shops
- View shop details
- Browse products and offers
- Search products and shops
- Filter products by category
- View product prices and images
- Show interest in products
- Remove interest from products

---

## Shop Owner Features

Shop owners can:

- Register and login
- Create a shop
- Upload shop images
- View their shop
- Edit their shop
- Delete their shop
- Create product and offer posts
- Upload product images
- Edit posts
- Delete posts
- View customer interest counts
- Manage their shop through the dashboard

> An admin panel is not included in the current version.

---

## Authentication

The application uses JWT-based authentication to protect user-specific operations.

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Token Sent With Request
   ↓
Backend Verification
   ↓
Access Granted

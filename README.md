# 🏪 LocalShop Connect

### A Full-Stack Web Application Connecting Local Shop Owners and Customers

---

## 📖 About the Project

LocalShop Connect is a full-stack web application designed to connect local shop owners with customers through a single interactive platform.

Shop owners can create and manage their shops, publish product and offer posts, upload images, and manage their posts through a dashboard.

Customers can browse local shops, search and filter products or offers, view shop details, and show interest in posts.

The application provides a simple, responsive, and interactive platform for discovering and managing local businesses.

---

## 📑 Table of Contents

1. About the Project
2. Problem Statement
3. Objectives
4. Features
5. User Types
6. Application Workflow
7. Customer Features
8. Shop Owner Features
9. Authentication
10. Post Management
11. Interest Feature
12. Search and Filtering
13. Shop Owner Dashboard
14. Technology Stack
15. API Endpoints
16. Database Structure
17. Project Structure
18. Installation
19. Environment Variables
20. Running the Project
21. Example User Flow
22. Security
23. Image Handling
24. Interactive User Interface
25. Application Architecture
26. Future Improvements
27. Project Scope
28. Project Purpose
29. Conclusion

---

## 🎯 Problem Statement

Local shop owners often depend on traditional methods or different platforms to promote their products and offers.

Customers may face difficulties in:

- Finding nearby local shops
- Discovering available products
- Finding local offers
- Searching for specific products
- Viewing shop information
- Knowing which products are receiving customer interest

LocalShop Connect provides a centralized platform that helps shop owners showcase their businesses and allows customers to easily discover and interact with local shops.

---

## 🎯 Objectives

- Provide a common platform for local shop owners and customers.
- Allow shop owners to create and manage their shops.
- Allow shop owners to publish product and offer posts.
- Allow customers to discover local shops and products.
- Provide search and category filtering functionality.
- Allow customers to show interest in products and offers.
- Provide a dashboard for shop owners.
- Implement secure user authentication.
- Support image uploads for shops and posts.
- Provide an interactive and responsive user interface.

---

## ✨ Features

### 🔐 User Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Token-based authorization

### 🏪 Shop Management

- Create shop
- View shops
- View individual shop details
- Edit shop information
- Delete shop
- Upload shop images
- Display shop category, city, address, and phone number

### 📝 Post Management

- Create product and offer posts
- View all posts
- View posts belonging to a shop
- Edit posts
- Delete posts
- Upload post images
- Add title, description, and price

### ❤️ Customer Interest

- Show interest in a post
- Remove interest
- Display interest count
- Check current user's interest status

### 🔍 Search and Filtering

- Search posts
- Search by product title
- Search by description
- Search by shop name
- Filter posts by category
- Clear search and category filters

### 📊 Shop Owner Dashboard

- View shop information
- View total posts
- View total interests
- Create new posts
- Edit posts
- Delete posts
- View own shop
- Manage shop content

### 🖼️ Image Upload

The application supports image uploads for:

- Shop images
- Post images

Supported formats:

- JPG
- JPEG
- PNG
- WEBP

Maximum image size:

**5 MB**

---

## 👥 User Types

### 👤 Customer

Customers can:

- Register
- Login
- Browse shops
- Browse posts
- Search posts
- Filter posts
- View shop details
- Show interest in posts
- Remove interest
- View interest counts

### 🏪 Shop Owner

Shop owners can:

- Register
- Login
- Create a shop
- Edit their shop
- Delete their shop
- Upload shop images
- Create posts
- Edit their posts
- Delete their posts
- Upload post images
- View interest counts
- Manage content through the dashboard

> **Note:** An admin panel is not included in the current version.

---

## 🔄 Application Workflow

```text
                    LOCALSHOP CONNECT
                           |
              +------------+------------+
              |                         |
              v                         v
          CUSTOMER                 SHOP OWNER
              |                         |
              v                         v
        Register/Login            Register/Login
              |                         |
              v                         v
        Browse Shops              Create Shop
              |                         |
              v                         v
        Browse Posts               Create Posts
              |                         |
              v                         v
       Search / Filter             Edit Posts
              |                         |
              v                         v
       View Shop Details           Delete Posts
              |                         |
              v                         v
        Show Interest              Dashboard

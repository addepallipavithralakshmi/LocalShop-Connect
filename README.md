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
## 7. Customer Features

Customers can use LocalShop Connect to discover local shops, products, and offers.

- Register and login securely.
- Browse available local shops.
- View shop details such as name, category, address, city, phone, and image.
- Browse product and offer posts.
- Search posts using product title, description, or shop name.
- Filter posts by category.
- View product prices and images.
- Show interest in products or offers.
- Remove interest from a post.
- View the total interest count of a post.

---

## 8. Shop Owner Features

Shop owners can manage their shops and posts through the application.

- Register and login.
- Create a shop.
- Upload a shop image.
- Edit shop information.
- Delete their own shop.
- Create product or offer posts.
- Upload post images.
- Edit their own posts.
- Delete their own posts.
- View customer interest counts.
- Manage shop content through the dashboard.

> **Note:** An admin panel is not included in the current version.

---

## 9. Authentication

The application uses JWT-based authentication for secure user access.

The authentication process is:

User
↓
Register
↓
Login
↓
Backend verifies credentials
↓
JWT token generated
↓
Token stored by frontend
↓
Token sent with protected requests
↓
Backend verifies token
↓
Access granted

Protected requests use:

Authorization: Bearer <JWT_TOKEN>

JWT authentication is used for protected operations such as creating, editing, and deleting shops and posts.

---

## 10. Post Management

Shop owners can create and manage product and offer posts.

Each post can contain:

- Title
- Description
- Price
- Image
- Shop
- Created Date

### Create Post

Shop owners can create a new product or offer post from their dashboard.

### View Posts

Customers can view posts created by different local shops.

### Edit Post

Shop owners can update their own posts.

Example:

Before:

Summer Collection
₹999

After:

Summer Collection 2026
₹899

### Delete Post

Shop owners can delete their own posts after confirmation.

---

## 11. Interest Feature

The interest feature allows customers to express interest in products and offers.

### Add Interest

Customer
↓
View Post
↓
Click Interest
↓
Backend checks user
↓
Interest stored in database
↓
Interest count increases

Example:

Before:

🤍 Not Interested 10

After:

❤️ Interested 11

### Remove Interest

Customers can remove their interest by clicking the interested button again.

Interested
↓
Remove Interest
↓
Interest deleted
↓
Interest count decreases

The application also checks whether the current user has already shown interest in a post.

---

## 12. Search and Filtering

Customers can search posts using:

- Product title
- Product description
- Shop name

Example:

Search: shoes

The application displays matching posts.

### Category Filtering

Customers can filter posts using categories such as:

- All Categories
- Clothing
- Electronics
- Footwear
- Grocery
- Beauty

Example:

Category: Footwear

Only relevant footwear posts are displayed.

Users can also clear the search and category filters.

---

## 13. Shop Owner Dashboard

The Shop Owner Dashboard provides a centralized area for managing the shop and posts.

The dashboard displays:

- Shop Name
- Category
- Address
- City
- Phone
- Shop Image

It also displays statistics such as:

Posts: 5
Interests: 32

Shop owners can:

- View their shop.
- Create new posts.
- Edit posts.
- Delete posts.
- View post images.
- View post prices.
- View posted dates.
- View customer interest counts.

Example:

Shop Owner Dashboard

Fashion Trends
Category: Clothing

📍 Main Road
🏙️ Hyderabad
📞 9876543210

Posts: 5
Interests: 32

[View My Shop]
[+ Create New Post]

---

## 14. Technology Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Axios
- React Router

### Backend

- Node.js
- Express.js
- JWT
- Multer
- CORS
- REST APIs

### Database

- MySQL

### Development Tools

- Visual Studio Code
- MySQL Workbench
- Git
- GitHub
- npm

---

## 15. API Endpoints

### Authentication APIs

POST /api/auth/register

Registers a new user.

POST /api/auth/login

Authenticates an existing user.

### Shop APIs

POST /api/shops

Creates a shop.

GET /api/shops

Gets all shops.

GET /api/shops/my-shop

Gets the logged-in owner's shop.

GET /api/shops/:id

Gets a specific shop.

Example:

GET /api/shops/4

### Post APIs

POST /api/posts

Creates a post.

GET /api/posts

Gets all posts.

GET /api/posts/shop/:shopId

Gets posts belonging to a particular shop.

Example:

GET /api/posts/shop/4

PUT /api/posts/:postId

Updates a post.

DELETE /api/posts/:postId

Deletes a post.

### Interest APIs

POST /api/posts/:postId/interest

Adds interest.

DELETE /api/posts/:postId/interest

Removes interest.

GET /api/posts/:postId/interests

Gets the interest count.

GET /api/posts/:postId/interest-status

Checks whether the current user is interested in the post.

---

## 16. Database Structure

The main relationship between the application entities is:

User
 |
 | owns
 ↓
Shop
 |
 | contains
 ↓
Post
 |
 | receives
 ↓
Post Interest

### Main Data

The application contains:

- Users
- Shops
- Posts
- Post Interests

### Example

User
ID: 1
Name: Pavithra
      ↓
Shop
ID: 4
Name: Fashion Trends
      ↓
Post
ID: 5
Title: Summer Collection
      ↓
Post Interest
User ID: 10
Post ID: 5

---

## 17. Project Structure

LocalShop-Connect/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── shopController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── shopRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── uploads/
│   │   ├── shop-images/
│   │   └── post-images/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Shops.jsx
│   │   │   ├── ShopDetails.jsx
│   │   │   ├── Posts.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateShop.jsx
│   │   │   └── CreatePost.jsx
│   │
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Posts.css
│   │   │   ├── Shops.css
│   │   │   └── ...
│   │
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md

---

## 18. Installation

### Clone the Repository

git clone https://github.com/YOUR_USERNAME/LocalShop-Connect.git

Move into the project:

cd LocalShop-Connect

### Install Backend

cd backend
npm install

### Install Frontend

Open another terminal:

cd frontend
npm install

---

## 19. Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=localshop_connect

JWT_SECRET=your_secret_key

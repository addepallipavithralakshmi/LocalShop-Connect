🏪 LocalShop Connect
A Full-Stack Web Application Connecting Local Shop Owners and Customers
📖 About the Project

LocalShop Connect is a full-stack web application designed to connect local shop owners with customers through a single interactive platform.

Shop owners can create and manage their shops, publish product and offer posts, upload images, and manage their posts through a dashboard.

Customers can browse local shops, search and filter products or offers, view shop details, and show interest in posts.

The application provides a simple, responsive, and interactive platform for discovering and managing local businesses.

🎯 Problem Statement

Local shop owners often depend on traditional methods or different platforms to promote their products and offers.

Customers may face difficulties in:

Finding nearby local shops
Discovering available products
Finding local offers
Searching for specific products
Viewing shop information
Knowing which products are receiving customer interest

LocalShop Connect provides a centralized platform that helps shop owners showcase their businesses and allows customers to easily discover and interact with local shops.

🎯 Objectives
Provide a common platform for local shop owners and customers.
Allow shop owners to create and manage their shops.
Allow shop owners to publish product and offer posts.
Allow customers to discover local shops and products.
Provide search and category filtering functionality.
Allow customers to show interest in products and offers.
Provide a dashboard for shop owners.
Implement secure user authentication.
Support image uploads for shops and posts.
Provide an interactive and responsive user interface.
✨ Features
🔐 User Authentication
User registration
User login
JWT-based authentication
Protected API routes
Token-based authorization
🏪 Shop Management
Create shop
View shops
View individual shop details
Edit shop information
Delete shop
Upload shop images
Display shop category, city, address, and phone number
📝 Post Management
Create product and offer posts
View all posts
View posts belonging to a shop
Edit posts
Delete posts
Upload post images
Add title, description, and price
❤️ Customer Interest
Show interest in a post
Remove interest
Display interest count
Check current user's interest status
🔍 Search and Filtering
Search posts
Search by product title
Search by description
Search by shop name
Filter posts by category
Clear search and category filters
📊 Shop Owner Dashboard
View shop information
View total posts
View total interests
Create new posts
Edit posts
Delete posts
View own shop
Manage shop content
🖼️ Image Upload

The application supports image uploads for:

Shop images
Post images

Supported formats:

JPG
JPEG
PNG
WEBP

Maximum image size:

5 MB

👥 User Types
👤 Customer

Customers can:

Register
Login
Browse shops
Browse posts
Search posts
Filter posts
View shop details
Show interest in posts
Remove interest
View interest counts
🏪 Shop Owner

Shop owners can:

Register
Login
Create a shop
Edit their shop
Delete their shop
Upload shop images
Create posts
Edit their posts
Delete their posts
Upload post images
View interest counts
Manage content through the dashboard

Note: An admin panel is not included in the current version.

🔄 Application Workflow
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
👤 Customer Features
Registration

A new user can create an account by providing the required information.

Example:

Name: Pavithra
Email: pavithra@example.com
Password: ********
Phone: 9876543210
City: Hyderabad

After successful registration, the user can log in.

Login

Registered users can log in using their credentials.

After successful authentication, the backend generates a JWT token that is used for protected operations.

Browse Shops

Customers can view available local shops.

Shop information includes:

Shop Name
Category
Description
Address
City
Phone
Shop Image
Browse Posts

Customers can view product and offer posts created by shop owners.

Example:

Summer Collection


Latest summer clothing available now.


₹999


Fashion Trends
Hyderabad


❤️ Interested
Show Interest

Customers can show interest in a post.

Before clicking:

🤍 Not Interested 10

After clicking:

❤️ Interested 11

The interest is stored in the database.

🏪 Shop Owner Features
Create Shop

A shop owner can create a shop by providing:

Shop Name
Category
Description
Address
City
Phone
Shop Image

Example:

Shop Name: Fashion Trends
Category: Clothing
Description: Latest fashion wear
Address: Main Road
City: Hyderabad
Phone: 9876543210
Edit Shop

Shop owners can update their shop information.

Example:

Before:


Shop Name: Fashion Trends
City: Hyderabad




After:


Shop Name: Fashion Trends Store
City: Secunderabad
Delete Shop

Shop owners can delete their own shop.

A confirmation message is displayed before deletion to prevent accidental deletion.

🔐 Authentication

The application uses JWT for authentication and authorization.

The authentication workflow is:

React Frontend
      |
      | Login
      v
Node.js + Express
      |
      | Verify Credentials
      v
MySQL Database
      |
      | Generate JWT
      v
React Frontend
      |
      | Bearer Token
      v
Protected API

Protected requests use:

Authorization: Bearer <JWT_TOKEN>

The backend verifies the token before allowing protected operations.

📝 Post Management

Shop owners can create and manage product or offer posts.

A post contains:

Title
Description
Price
Image

Example:

Title: Summer Collection


Description:
Latest summer collection available now.


Price: ₹999


Image:
summer-collection.jpg
Create Post

Shop owners can create a new post from their dashboard.

View Posts

Customers can view all available posts.

Edit Post

Shop owners can update their own posts.

Example:

Before:


Title: Summer Collection
Price: ₹999




After:


Title: Summer Collection 2026
Price: ₹899
Delete Post

Shop owners can delete their own posts after confirmation.

❤️ Interest Feature

The interest feature allows customers to express interest in products and offers.

Add Interest

When a customer clicks the interest button:

Customer
   |
   v
View Post
   |
   v
Click Interest
   |
   v
Backend checks user
   |
   v
Interest stored
   |
   v
Interest count increases
Remove Interest

If the customer clicks the interested button again:

Interested
    |
    v
Remove Interest
    |
    v
Interest deleted
    |
    v
Interest count decreases
Interest Count

Each post displays the total number of users interested in it.

Example:

❤️ 25 Interested
🔍 Search and Filtering

Customers can search posts using:

Product title
Description
Shop name

Example:

Search: shoes

The application displays posts related to the search.

Category Filtering

Customers can filter posts by category.

Available categories include:

All Categories
Clothing
Electronics
Footwear
Grocery
Beauty

Example:

Category: Footwear

Only relevant footwear posts are displayed.

Clear Filters

Users can clear the active search and category filters.

📊 Shop Owner Dashboard

The dashboard provides a centralized place for shop owners to manage their shop and posts.

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
Dashboard Statistics

The dashboard displays:

POSTS
5

and:

INTERESTS
32

The total interest count is calculated from the interests received by the shop owner's posts.

My Posts

Each post can display:

Post Image
Title
Description
Price
Posted Date
Interest Count

Available actions:

✏️ Edit
🗑️ Delete
🛠️ Technology Stack
Frontend
React.js
JavaScript
HTML5
CSS3
Bootstrap
Axios
React Router
Backend
Node.js
Express.js
JWT
Multer
CORS
REST APIs
Database
MySQL
Development Tools
Visual Studio Code
MySQL Workbench
Git
GitHub
npm
🔌 API Endpoints
Authentication APIs
POST /api/auth/register

Used to register a new user.

POST /api/auth/login

Used to authenticate a user.

Shop APIs
POST /api/shops

Create a shop.

GET /api/shops

Get all shops.

GET /api/shops/my-shop

Get the logged-in owner's shop.

GET /api/shops/:id

Get a specific shop.

Example:

GET /api/shops/4
Post APIs
POST /api/posts

Create a post.

GET /api/posts

Get all posts.

GET /api/posts/shop/:shopId

Get posts belonging to a shop.

Example:

GET /api/posts/shop/4
PUT /api/posts/:postId

Update a post.

DELETE /api/posts/:postId

Delete a post.

Interest APIs
POST /api/posts/:postId/interest

Add interest.

DELETE /api/posts/:postId/interest

Remove interest.

GET /api/posts/:postId/interests

Get interest count.

GET /api/posts/:postId/interest-status

Check the current user's interest status.

🗄️ Database Structure

The main data relationships are:

User
 |
 | owns
 v
Shop
 |
 | contains
 v
Post
 |
 | receives
 v
Post Interest

Example:

User
ID: 1
Name: Pavithra
      |
      v
Shop
ID: 4
Name: Fashion Trends
      |
      v
Post
ID: 5
Title: Summer Collection
      |
      v
Post Interest
User ID: 10
Post ID: 5

The main application data consists of:

Users
Shops
Posts
Post Interests
📁 Project Structure
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
│   │   │
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
│   │   │
│   │   ├── styles/
│   │   │   ├── Home.css
│   │   │   ├── Posts.css
│   │   │   ├── Shops.css
│   │   │   └── ...
│   │   │
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
📦 Installation
Clone the Repository
git clone https://github.com/YOUR_USERNAME/LocalShop-Connect.git

Move into the project:

cd LocalShop-Connect
Backend Installation
cd backend
npm install
Frontend Installation

Open another terminal:

cd frontend
npm install
🔐 Environment Variables

Create a .env file inside the backend folder.

Example:

PORT=5000


DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=localshop_connect


JWT_SECRET=your_secret_key

Create a .env file inside the frontend folder.

Example:

VITE_API_URL=http://localhost:5000

Do not upload real passwords or secret keys to GitHub.

▶️ Running the Project
Start Backend

Open a terminal:

cd backend
npm run dev

Backend runs on:

http://localhost:5000
Start Frontend

Open another terminal:

cd frontend
npm run dev

Frontend runs on:

http://localhost:5173
🧪 Example User Flow

A customer named Rahul wants to find footwear.

Step 1

Rahul registers:

Name: Rahul
Email: rahul@example.com
Password: ********
Step 2

Rahul logs in.

Step 3

Rahul opens the Posts page.

Step 4

Rahul searches:

shoes
Step 5

Rahul selects:

Footwear
Step 6

A matching post is displayed:

Sports Shoes


₹1499


Fashion Footwear
Hyderabad
Step 7

Rahul clicks:

🤍 Not Interested

The button changes to:

❤️ Interested

The interest count is updated.

🔒 Security

The application uses JWT authentication for protected operations.

The backend verifies:

Whether the token exists.
Whether the token is valid.
Which user is making the request.
Whether the user has permission to perform the requested operation.

For shop and post management, ownership is checked before modifying or deleting data.

Example:

User A
   |
   v
Shop A
   |
   v
Post A


User B
   |
   X
Cannot modify Post A
🖼️ Image Handling

Multer is used to process image uploads.

Shop Images
backend/uploads/shop-images/
Post Images
backend/uploads/post-images/

Supported formats:

JPG
JPEG
PNG
WEBP

Maximum file size:

5 MB
🎨 Interactive User Interface

The application provides an interactive user interface using:

React components
Bootstrap
Custom CSS
Responsive layouts
Cards
Forms
Buttons
Search fields
Category filters
Loading indicators
Error messages
Confirmation dialogs
Hover effects
Animations

The interface is designed to provide a simple and user-friendly experience for both customers and shop owners.

🏗️ Application Architecture
┌───────────────────────────────────────┐
│             React Frontend            │
│                                       │
│ Home | Shops | Posts | Dashboard      │
│ Login | Register | Shop Details       │
└──────────────────┬────────────────────┘
                   │
                   │ Axios / REST API
                   ▼
┌───────────────────────────────────────┐
│           Node.js + Express           │
│                                       │
│ Routes → Middleware → Controllers     │
└──────────────────┬────────────────────┘
                   │
                   │ SQL Queries
                   ▼
┌───────────────────────────────────────┐
│                 MySQL                 │
│                                       │
│ Users | Shops | Posts | Interests     │
└───────────────────────────────────────┘
🚀 Future Improvements

Possible future improvements include:

Cloud-based image storage
Advanced location-based shop discovery
Shop ratings and reviews
Customer favorites or wishlist
Customer notifications
Advanced search
Shop analytics
Improved dashboard statistics
Production cloud deployment

These are possible future enhancements and are not part of the current implementation.

📌 Project Scope
Currently Implemented
✅ User Registration
✅ User Login
✅ JWT Authentication
✅ Customer Functionality
✅ Shop Owner Functionality
✅ Create Shop
✅ View Shop
✅ Edit Shop
✅ Delete Shop
✅ Shop Image Upload
✅ Create Post
✅ View Posts
✅ Edit Post
✅ Delete Post
✅ Post Image Upload
✅ Search Posts
✅ Category Filtering
✅ Interest Feature
✅ Interest Count
✅ Interest Status
✅ Shop Details
✅ Shop Owner Dashboard
✅ Dashboard Statistics
✅ REST APIs
✅ MySQL Database
✅ Responsive UI
✅ Bootstrap Styling
✅ Custom CSS
✅ Interactive Components
Not Included
❌ Admin Panel
❌ Payment Gateway
❌ Online Ordering
❌ Delivery Management
❌ Chat System
❌ Payment Processing
🎯 Project Purpose

LocalShop Connect was developed as a practical full-stack project to demonstrate:

Frontend development
Backend development
REST API development
Database integration
Authentication
Authorization
CRUD operations
Image upload handling
API integration
Search and filtering
User interaction
Responsive UI development
🏁 Conclusion

LocalShop Connect provides a centralized platform for connecting local shop owners with customers.

Shop owners can create and manage their shops, publish product and offer posts, upload images, and manage their content through a dashboard.

Customers can discover shops, browse posts, search and filter products, view shop details, and show interest in products or offers.

The project combines:

React.js
+
Node.js
+
Express.js
+
MySQL
+
JWT
+
REST APIs
+
Bootstrap

to create an interactive full-stack web application.

⭐ LocalShop Connect
Connecting Local Shops with Customers — One Platform, One Community.

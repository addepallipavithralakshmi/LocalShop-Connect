# 🏪 LocalShop Connect

**Connect with Local Shops. Discover Products. Support Local Businesses.**

LocalShop Connect is a full-stack web application that connects **customers with local shop owners** through a single digital platform.

The application allows shop owners to create and manage their shops, publish product/service posts, and reach nearby customers. Customers can discover shops, search and filter posts, view shop and product details, and express their interest in products or services.

The platform is designed to help local businesses establish an online presence while making it easier for customers to discover products and services available from local shops.

---

## 📌 Project Overview

Many local businesses still depend mainly on offline advertising and word-of-mouth to reach customers. Customers may also find it difficult to discover nearby shops and know what products or services they currently offer.

**LocalShop Connect** provides a digital platform where:

* Customers can discover local shops and their products.
* Shop owners can create and manage their shops.
* Shop owners can publish posts with images.
* Customers can search and filter available posts.
* Customers can show interest in products or services.
* Shop owners can view interest counts for their posts.

The system focuses on two main user roles:

1. 👤 **Customer**
2. 🏪 **Shop Owner**

---

# ✨ Features

## 👤 Customer Features

### 🔐 Registration & Login

Customers can create an account and securely log in to the application.

* User registration
* User login
* JWT-based authentication
* Secure access to protected features

### 👤 User Profile

Customers can manage their profile information.

* Username
* Phone number
* City
* Profile information

The logged-in username is also displayed in the navigation bar.

### 🔍 Search

Customers can search for relevant shops, products, or posts.

This helps users quickly find the information they are looking for.

### 🏷️ Category Filtering

Customers can filter posts based on their categories.

This makes it easier to discover specific types of products or services.

### 🏪 Shop Details

Customers can view information about available local shops, including:

* Shop name
* Shop image
* Shop details
* Owner information
* Posts associated with the shop

### 📝 View Posts

Customers can view posts created by shop owners.

Posts can contain:

* Product/service information
* Images
* Category
* Other relevant details

### ❤️ Interested / Not Interested

Customers can express their interest in a post.

The system supports:

* Interested
* Not Interested
* Interest status for each user
* Total interest count

This allows shop owners to understand customer interest in their products or services.

---

# 🏪 Shop Owner Features

## 🏪 Create Shop

Shop owners can create their own shop profile.

They can provide:

* Shop name
* Shop information
* Shop image
* Relevant shop details

### 🖼️ Image Upload

Shop owners can upload images for their shops and posts.

This provides customers with a better visual understanding of the shop and its products/services.

### 📊 Owner Dashboard

Shop owners have a dashboard where they can manage their shop and posts.

The dashboard helps owners monitor:

* Their shop
* Their posts
* Customer interest
* Post performance

### 📝 Create Posts

Shop owners can create posts to showcase products or services.

Each post can contain:

* Title
* Description
* Category
* Image
* Other relevant information

### ✏️ Edit Posts

Shop owners can update their existing posts whenever required.

### 🗑️ Delete Posts

Shop owners can delete their own posts.

A shop owner cannot delete posts belonging to another shop owner.

### 🗑️ Delete Shop

Shop owners can delete **only their own shop**.

When a shop is deleted, its associated:

* Posts
* Customer interests

are also removed.

---

# 🔐 Authentication & Authorization

LocalShop Connect uses **JWT (JSON Web Token)** authentication.

The authentication flow is:

```text
User Registration
       ↓
User Login
       ↓
Backend Validates Credentials
       ↓
JWT Token Generated
       ↓
Token Sent to Frontend
       ↓
Token Used for Protected Requests
       ↓
Backend Verifies Token
       ↓
Access Granted
```

This ensures that protected operations can only be performed by authenticated users.

---

# 🛠️ Technologies Used

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| **React.js**   | Frontend development           |
| **Node.js**    | Backend runtime                |
| **Express.js** | REST API development           |
| **MySQL**      | Database                       |
| **JWT**        | Authentication                 |
| **Bootstrap**  | Responsive UI                  |
| **CSS**        | Custom styling                 |
| **JavaScript** | Application logic              |
| **REST API**   | Frontend-backend communication |

---

# 🏗️ System Architecture

The application follows a frontend-backend-database architecture.

```text
              ┌─────────────────────┐
              │      Customer       │
              └──────────┬──────────┘
                         │
                         ↓
              ┌─────────────────────┐
              │     React.js        │
              │     Frontend        │
              └──────────┬──────────┘
                         │
                    REST API
                         │
                         ↓
              ┌─────────────────────┐
              │ Node.js + Express   │
              │      Backend        │
              └──────────┬──────────┘
                         │
                         ↓
              ┌─────────────────────┐
              │       MySQL         │
              │      Database       │
              └─────────────────────┘
                         ↑
                         │
              ┌──────────┴──────────┐
              │     Shop Owner      │
              └─────────────────────┘
```

---

# 🔄 Customer Workflow

```text
Register / Login
       ↓
Customer Dashboard
       ↓
Search / Browse Shops
       ↓
Filter by Category
       ↓
View Shop
       ↓
View Posts
       ↓
View Product / Service Details
       ↓
Interested / Not Interested
       ↓
Interest Status Recorded
```

---

# 🔄 Shop Owner Workflow

```text
Register / Login
       ↓
Shop Owner Dashboard
       ↓
Create Shop
       ↓
Upload Shop Image
       ↓
Create Product / Service Post
       ↓
Upload Post Image
       ↓
Publish Post
       ↓
Customers View Post
       ↓
Customers Show Interest
       ↓
Owner Views Interest Count
       ↓
Edit / Delete Own Posts
```

---

# 📊 Interest Management

One of the important features of LocalShop Connect is the customer interest system.

When a customer interacts with a post, the system records the customer's interest status.

For example:

```text
Product: Handmade Wooden Chair

Total Interested Customers: 15

Customer A → Interested
Customer B → Interested
Customer C → Not Interested
Customer D → Interested
```

The system also maintains the interest status for individual users so that customers can see their current selection.

---

# 🗄️ Database

MySQL is used to store application data.

The database manages information related to:

* Users
* Shops
* Posts
* Customer interests
* Relationships between shops and their posts

The backend communicates with MySQL to create, retrieve, update, and delete application data.

---

# 📂 Project Structure

```text
LocalShop-Connect/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.js
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── README.md
└── ...
```

> The exact folder structure may vary depending on the final organization of the project.

---

# 🚀 Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/localshop-connect.git
```

## 2. Navigate to the Project

```bash
cd localshop-connect
```

## 3. Setup Backend

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

## 4. Configure MySQL

Create a MySQL database for the project.

Example:

```sql
CREATE DATABASE localshop_connect;
```

Configure the database connection in the backend configuration/environment file.

Example:

```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=localshop_connect
```

## 5. Start Backend

```bash
npm start
```

The backend server will start on the configured port.

## 6. Setup Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

## 7. Start Frontend

```bash
npm start
```

The React application will open in the browser.

---

# 🔑 Main Functional Modules

### Authentication Module

Handles:

* Registration
* Login
* JWT authentication
* Protected routes

### User Module

Handles:

* Customer profile
* User information
* Phone number
* City

### Shop Module

Handles:

* Shop creation
* Shop details
* Shop image
* Shop deletion

### Post Module

Handles:

* Create post
* View post
* Edit post
* Delete post
* Post images
* Category filtering

### Interest Module

Handles:

* Interested status
* Not Interested status
* Interest count
* User-specific interest status

### Search Module

Handles searching and filtering available shops/posts.

---

# 🎯 Project Objectives

The main objectives of LocalShop Connect are:

* Provide local businesses with a simple digital presence.
* Help customers discover local shops.
* Allow shop owners to showcase their products and services.
* Provide an easy way for customers to express interest.
* Connect local customers and shop owners through one platform.
* Reduce the dependency on traditional offline promotion.
* Build a practical full-stack application using modern web technologies.

---

# 💡 Problem Statement

Local shop owners often have limited ways to digitally showcase their products and services.

At the same time, customers may not know which nearby shops provide specific products or services.

LocalShop Connect addresses this problem by creating a common platform where:

**Shop Owners → Showcase their shops and products**

**Customers → Discover shops and express interest**

---

# 🌟 Key Highlights

* Full-stack web application
* React-based responsive frontend
* Node.js and Express.js backend
* MySQL database
* JWT authentication
* Customer and Shop Owner roles
* Shop image uploads
* Product/service post management
* Search functionality
* Category filtering
* Customer interest tracking
* Owner dashboard
* Ownership-based edit/delete permissions
* Responsive UI using Bootstrap
* Custom CSS and animations

---

# 🔮 Future Enhancements

Possible future improvements include:

* Location-based shop discovery
* Google Maps integration
* Customer reviews and ratings
* Shop contact information
* Direct customer-owner messaging
* Notifications
* Advanced search
* Product availability status
* Analytics for shop owners
* Mobile application version
* Online ordering functionality

---

# 🎓 Skills Demonstrated

This project demonstrates practical knowledge of:

* Frontend Development
* Backend Development
* REST API Development
* React.js
* Node.js
* Express.js
* MySQL
* JWT Authentication
* CRUD Operations
* Database Management
* File/Image Upload
* Role-based access
* API Integration
* Responsive Web Design
* Git & GitHub

---

# 👩‍💻 Author

**Pavitra Lakshmi**

Computer Science / Software Engineering Student

---

⭐ If you find this project useful, consider giving the repository a star!

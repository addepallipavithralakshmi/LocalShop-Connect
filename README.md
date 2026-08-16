# 🏪 LocalShop Connect

**Connecting local shops with customers — one platform, one community.**

LocalShop Connect is a full-stack web application designed to connect **local shop owners and customers** through a single platform.

Shop owners can create and manage their shops, publish product and offer posts, upload images, and manage their content through a dedicated dashboard.

Customers can discover local shops, browse products and offers, search and filter posts, view shop details, and show interest in products.

---

## ✨ Features

### 🛍️ Customer Features

- **Shop Discovery**: Browse available local shops
- **Shop Details**: View shop information, location, contact details, and posts
- **Product & Offer Posts**: Browse products and offers published by shop owners
- **Search**: Search products, descriptions, and shop names
- **Category Filtering**: Filter posts by categories
- **Interest System**: Show or remove interest in products and offers
- **Interest Count**: View the number of customers interested in a post
- **Responsive Interface**: Use the application across different screen sizes

### 🏪 Shop Owner Features

- **Shop Management**: Create, view, edit, and delete shops
- **Shop Image Upload**: Upload images for shops
- **Post Management**: Create, edit, and delete product/offer posts
- **Post Images**: Upload images for products and offers
- **Shop Dashboard**: Manage shop information and posts from one place
- **Interest Tracking**: View customer interest counts
- **Ownership Protection**: Owners can manage only their own shops and posts

### 🔐 Authentication

- **User Registration**: Create a new account
- **User Login**: Secure login using credentials
- **JWT Authentication**: Token-based authentication
- **Protected Routes**: Secure shop, post, and interest operations
- **Authorization**: Verify ownership before editing or deleting content

### 🔎 Search & Filtering

- Search by product title
- Search by product description
- Search by shop name
- Filter by category
- Combine search and category filtering
- Clear filters easily

### ❤️ Interest Management

- Show interest in a product or offer
- Remove interest
- Display interest count
- Check individual interest status
- Prevent duplicate interests

### 🎨 User Interface

- Responsive navigation
- Interactive shop cards
- Interactive product cards
- Dynamic buttons
- Loading indicators
- Error messages
- Confirmation dialogs
- Hover effects
- Custom CSS styling
- Page animations
- Bootstrap-based responsive layouts

---

## 🛠️ Technical Stack

### Frontend

- **React.js**
- **JavaScript**
- **Bootstrap**
- **CSS**
- **Axios**
- **React Router**
- **Vite**

### Backend

- **Node.js**
- **Express.js**
- **JWT**
- **Multer**
- **CORS**
- **REST APIs**

### Database

- **MySQL**

### Development Tools

- **Visual Studio Code**
- **MySQL Workbench**
- **Git**
- **GitHub**
- **npm**

---

## 🏗️ Application Architecture

```text
┌──────────────────────────┐
│      React Frontend      │
│                          │
│ Pages / Components / UI  │
└────────────┬─────────────┘
             │
             │ Axios / REST API
             ▼
┌──────────────────────────┐
│     Node.js + Express    │
│                          │
│ Routes / Controllers     │
│ Middleware / Validation  │
└────────────┬─────────────┘
             │
             │ SQL Queries
             ▼
┌──────────────────────────┐
│          MySQL           │
│                          │
│ Users / Shops / Posts    │
│ Post Interests           │
└──────────────────────────┘

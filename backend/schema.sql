-- ============================================================
-- LocalShop Connect — Neon PostgreSQL Schema
-- Run this once against your Neon database to create all tables
-- ============================================================


-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    user_id    SERIAL       PRIMARY KEY,
    full_name  VARCHAR(150) NOT NULL,
    email      VARCHAR(150) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    phone      VARCHAR(20),
    city       VARCHAR(100),
    role       VARCHAR(20)  NOT NULL DEFAULT 'customer'  -- 'customer' | 'shop_owner'
);


-- ============================================================
-- SHOPS
-- ============================================================

CREATE TABLE IF NOT EXISTS shops (
    shop_id     SERIAL       PRIMARY KEY,
    owner_id    INTEGER      NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    shop_name   VARCHAR(150) NOT NULL,
    description TEXT,
    address     VARCHAR(255) NOT NULL,
    city        VARCHAR(100) NOT NULL,
    phone       VARCHAR(20)  NOT NULL,
    category    VARCHAR(50)  NOT NULL,  -- Clothing | Electronics | Footwear | Grocery | Beauty
    shop_image  VARCHAR(255),
    UNIQUE (owner_id)  -- one shop per user
);


-- ============================================================
-- POSTS
-- ============================================================

CREATE TABLE IF NOT EXISTS posts (
    post_id     SERIAL        PRIMARY KEY,
    shop_id     INTEGER       NOT NULL REFERENCES shops(shop_id) ON DELETE CASCADE,
    title       VARCHAR(200)  NOT NULL,
    description TEXT,
    image       VARCHAR(255),
    price       NUMERIC(10,2),
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- ============================================================
-- POST INTERESTS
-- ============================================================

CREATE TABLE IF NOT EXISTS post_interests (
    interest_id SERIAL  PRIMARY KEY,
    post_id     INTEGER NOT NULL REFERENCES posts(post_id)  ON DELETE CASCADE,
    user_id     INTEGER NOT NULL REFERENCES users(user_id)  ON DELETE CASCADE,
    UNIQUE (post_id, user_id)   -- one interest per user per post
);


-- ============================================================
-- INDEXES  (optional but recommended for prod)
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_shops_owner_id   ON shops(owner_id);
CREATE INDEX IF NOT EXISTS idx_posts_shop_id    ON posts(shop_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pi_post_id       ON post_interests(post_id);
CREATE INDEX IF NOT EXISTS idx_pi_user_id       ON post_interests(user_id);

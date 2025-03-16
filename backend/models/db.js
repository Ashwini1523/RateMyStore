const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Keep it reasonable
  connectTimeout: 10000,
  queueLimit: 0,
});

const promisePool = pool;

const createTables = async () => {
  try {
    const connection = await promisePool.getConnection();

    console.log("🛠 Ensuring database tables...");

    // Create Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(400),
        role ENUM('admin', 'user', 'store-owner') NOT NULL
      );
    `);

    // Create Stores Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS stores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(400) NOT NULL,
        rating FLOAT DEFAULT 0,
        owner_id INT NOT NULL, 
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create Ratings Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        store_id INT NOT NULL,
        user_id INT NOT NULL,
        rating INT CHECK (rating BETWEEN 1 AND 5),
        FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Database tables ensured.");
    connection.release();
  } catch (error) {
    console.error("❌ Error ensuring tables:", error);
  }
};

// Call function when server starts
createTables();

module.exports = promisePool;

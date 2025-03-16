const pool = require("../models/db");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, address, role FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT id, name, email, address, role FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: "Invalid password format" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, id]);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users where role = 'admin'");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins" });
  }
}

const getAllNormal = async (req, res) => {
  // console.log(req)
  try {
    const [rows] = await pool.query("SELECT * FROM users where role = 'user'");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

const getStoreOwners = async (req, res) => {
  try {
    const [rows] = await pool.query(`
    SELECT u.name, u.email, u.address, u.role, s.rating, s.name AS s_name FROM users AS u 
    LEFT JOIN stores AS s 
    ON u.id = s.owner_id 
    WHERE u.role = ? 
    `, ['store-owner']);
    // console.log(rows)
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

module.exports = { getAllUsers, getUserById, updateUserPassword, getAllAdmins, getAllNormal, getStoreOwners };

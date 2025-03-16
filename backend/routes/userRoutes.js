const express = require("express");
const { getAllUsers, getUserById, updateUserPassword, getAllAdmins, getAllNormal, getStoreOwners } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all users (Admin only)
router.get('/allAdmins', getAllAdmins)
router.get('/allNormal', getAllNormal)
router.get('/allStoreOwners', getStoreOwners)

// Get user by ID
router.get("/:id", authenticateToken, getUserById);

// Update user password
router.put("/:id/password", authenticateToken, updateUserPassword);

module.exports = router;

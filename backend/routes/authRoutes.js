const express = require('express');
const { register, login, decode, getFullData, changePassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/stats', getFullData)
router.post('/decode', decode)
router.post('/changePassword', changePassword)

module.exports = router;

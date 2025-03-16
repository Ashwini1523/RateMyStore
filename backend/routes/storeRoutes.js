const express = require('express');
const { createStore, getStores, getUserRating, submitRating, updateRating, allUserStores, changeRating, byOwner, byStore } = require('../controllers/storeController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addStore', createStore);
router.get('/allStores', getStores)
router.post('/allUserStores', allUserStores)
router.post('/changeRating', changeRating)
router.post('/byOwner', byOwner)
router.post('/byStore', byStore)



module.exports = router;

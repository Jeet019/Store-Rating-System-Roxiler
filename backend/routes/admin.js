const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getSummary,
  addUser,
  getUsers,
  addStore,
  getStores
} = require('../controllers/adminController');

// All routes protected
router.use(authMiddleware);

// Dashboard summary
router.get('/summary', getSummary);

// Users
router.post('/users', addUser);
router.get('/users', getUsers);

// Stores
router.post('/stores', addStore);
router.get('/stores', getStores);

module.exports = router;

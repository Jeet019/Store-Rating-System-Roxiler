const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getStores,
  submitRating,
  updatePassword,
  getMyRatings
} = require('../controllers/userController');

router.use(authMiddleware);

router.get('/stores', getStores);
router.post('/ratings', submitRating);
router.put('/password', updatePassword);
router.get('/my-ratings', getMyRatings);

module.exports = router;

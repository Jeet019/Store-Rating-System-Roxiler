const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
// const {
//   getUsersWhoRatedStore,
//   getStoreAverageRating,
//   updatePassword
// } = require('../controllers/ownerController');
const {
    addStore,
    getUsersWhoRatedStore,
    getStoreAverageRating,
    updatePassword
    } = require('../controllers/ownerController');
    
        
router.use(authMiddleware);
router.post('/store', addStore); 
router.get('/users', getUsersWhoRatedStore);
router.get('/average-rating', getStoreAverageRating);
router.put('/password', updatePassword);

module.exports = router;

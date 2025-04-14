const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all stores with user’s submitted rating and average rating
exports.getStores = async (req, res) => {
  const userId = req.user.id;
  const { name = '', address = '' } = req.query;
  try {
    const [stores] = await pool.query(
      `SELECT s.id, s.name, s.address,
         (SELECT rating FROM ratings WHERE user_id = ? AND store_id = s.id) AS user_rating,
         (SELECT AVG(rating) FROM ratings WHERE store_id = s.id) AS average_rating
       FROM stores s
       WHERE s.name LIKE ? AND s.address LIKE ?`,
      [userId, `%${name}%`, `%${address}%`]
    );
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit or Update Rating
exports.submitRating = async (req, res) => {
  const userId = req.user.id;
  const { store_id, rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const [existing] = await pool.query(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [userId, store_id]
    );

    if (existing.length > 0) {
      await pool.query(
        'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
        [rating, userId, store_id]
      );
      res.json({ message: 'Rating updated' });
    } else {
      await pool.query(
        'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
        [userId, store_id, rating]
      );
      res.status(201).json({ message: 'Rating submitted' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change Password
exports.updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User's Ratings
exports.getMyRatings = async (req, res) => {
  const userId = req.user.id;
  try {
    const [ratings] = await pool.query(
      `SELECT s.id AS store_id, s.name AS store_name, r.rating
       FROM ratings r
       JOIN stores s ON r.store_id = s.id
       WHERE r.user_id = ?`,
      [userId]
    );
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const pool = require('../config/db');

// Get list of users who rated the store
// exports.addStore = async (req, res) => {
//     const ownerId = req.user.id; 
//     const { name, email, address } = req.body;
//     try{
//     if (existing.length > 0) {
//         return res.status(400).json({ message: 'You already have a store.' });
//       }
      
//       await pool.query(
//         'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
//         [name, email, address, ownerId]
//       );
      
//       res.status(201).json({ message: 'Store added successfully.' });
//     }catch{
//         res.status(500).json({ error: err.message });
//     }

// };
// exports.addStore = async (req, res) => {
//   const ownerId = req.user.id; 
//   const { name, email, address } = req.body;

//   try {
//     const [existing] = await pool.query('SELECT * FROM stores WHERE owner_id = ?', [ownerId]);

//     if (existing.length > 0) {
//       return res.status(400).json({ message: 'You already have a store.' });
//     }

//     await pool.query(
//       'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
//       [name, email, address, ownerId]
//     );

//     res.status(201).json({ message: 'Store added successfully.' });
//   } catch (err) {
//     console.error('Add Store Error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };
exports.addStore = async (req, res) => {
  const ownerId = req.user?.id;
  const { name, email, address } = req.body;

  if (!ownerId) {
    return res.status(400).json({ message: 'Owner ID missing from token.' });
  }

  try {
    const [existing] = await pool.query(
      'SELECT * FROM stores WHERE owner_id = ?',
      [ownerId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'You already have a store.' });
    }

    await pool.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
      [name, email, address, ownerId]
    );

    res.status(201).json({ message: 'Store added successfully.' });
  } catch (err) {
    console.error('Add Store Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersWhoRatedStore = async (req, res) => {
  const storeId = req.user.store_id;  // Assuming store ID is saved in user profile

  try {
    const [users] = await pool.query(
      `SELECT u.id, u.name, u.email, r.rating
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = ?`,
      [storeId]
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get average rating of the store
exports.getStoreAverageRating = async (req, res) => {
  const storeId = req.user.store_id;  // Assuming store ID is saved in user profile

  try {
    const [[{ avg_rating }]] = await pool.query(
      `SELECT AVG(rating) AS avg_rating
       FROM ratings
       WHERE store_id = ?`,
      [storeId]
    );
    res.json({ average_rating: avg_rating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change Store Owner password
exports.updatePassword = async (req, res) => {
  const ownerId = req.user.id; // Get owner ID from JWT
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, ownerId]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

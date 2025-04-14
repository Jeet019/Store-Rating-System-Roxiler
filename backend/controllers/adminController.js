const pool = require('../config/db');

exports.getSummary = async (req, res) => {
  try {
    const [[{ total_users }]] = await pool.query('SELECT COUNT(*) AS total_users FROM users');
    const [[{ total_stores }]] = await pool.query('SELECT COUNT(*) AS total_stores FROM stores');
    const [[{ total_ratings }]] = await pool.query('SELECT COUNT(*) AS total_ratings FROM ratings');

    res.json({msg: "all summary", total_users, total_stores, total_ratings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const bcrypt = require('bcryptjs');
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address, role]
    );
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const { name = '', email = '', address = '', role = '' } = req.query;
  try {
    const [users] = await pool.query(
      `SELECT id, name, email, address, role FROM users 
       WHERE name LIKE ? AND email LIKE ? AND address LIKE ? AND role LIKE ?`,
      [`%${name}%`, `%${email}%`, `%${address}%`, `%${role}%`]
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addStore = async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
      [name, email, address, owner_id]
    );
    res.status(201).json({ message: 'Store added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStores = async (req, res) => {
  const { name = '', email = '', address = '' } = req.query;
  try {
    const [stores] = await pool.query(
      `SELECT s.id, s.name, s.email, s.address,
        (SELECT AVG(r.rating) FROM ratings r WHERE r.store_id = s.id) AS rating
        FROM stores s
        WHERE s.name LIKE ? AND s.email LIKE ? AND s.address LIKE ?`,
      [`%${name}%`, `%${email}%`, `%${address}%`]
    );
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

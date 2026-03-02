const userRepo = require('../repositories/userRepository');

module.exports = {
  async getAll(req, res) {
    try {
      const users = await userRepo.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await userRepo.getById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newUser = await userRepo.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await userRepo.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'User not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async softDelete(req, res) {
    try {
      const deleted = await userRepo.softDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User soft-deleted', deleted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async enable(req, res) {
    const { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).json({ message: 'email and username required' });
    }
    try {
      const user = await userRepo.findByEmailAndUsername(email, username);
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.status = true;
      user.updatedAt = new Date();
      res.json({ message: 'User enabled', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async disable(req, res) {
    const { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).json({ message: 'email and username required' });
    }
    try {
      const user = await userRepo.findByEmailAndUsername(email, username);
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.status = false;
      user.updatedAt = new Date();
      res.json({ message: 'User disabled', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
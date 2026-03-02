const roleRepo = require('../repositories/roleRepository');

module.exports = {
  async getAll(req, res) {
    try {
      const roles = await roleRepo.getAll();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const role = await roleRepo.getById(req.params.id);
      if (!role) return res.status(404).json({ message: 'Role not found' });
      res.json(role);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newRole = await roleRepo.create(req.body);
      res.status(201).json(newRole);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await roleRepo.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Role not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async softDelete(req, res) {
    try {
      const deleted = await roleRepo.softDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Role not found' });
      res.json({ message: 'Role soft-deleted', deleted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
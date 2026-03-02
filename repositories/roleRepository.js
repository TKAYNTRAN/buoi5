const Role = require('../models/Role');

// in-memory storage
const roles = [];

module.exports = {
  async getAll() {
    return roles.filter(r => !r.deleted);
  },

  async getById(id) {
    return roles.find(r => r.id === id && !r.deleted) || null;
  },

  async create(data) {
    const role = new Role(data);
    roles.push(role);
    return role;
  },

  async update(id, data) {
    const role = roles.find(r => r.id === id && !r.deleted);
    if (!role) return null;
    Object.assign(role, data, { updatedAt: new Date() });
    return role;
  },

  async softDelete(id) {
    const role = roles.find(r => r.id === id && !r.deleted);
    if (!role) return null;
    role.deleted = true;
    role.updatedAt = new Date();
    return role;
  }
};
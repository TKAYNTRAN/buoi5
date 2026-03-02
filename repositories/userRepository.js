const User = require('../models/User');

// in-memory storage
const users = [];

module.exports = {
  async getAll() {
    return users.filter(u => !u.deleted);
  },

  async getById(id) {
    return users.find(u => u.id === id && !u.deleted) || null;
  },

  async create(data) {
    const user = new User(data);
    users.push(user);
    return user;
  },

  async update(id, data) {
    const user = users.find(u => u.id === id && !u.deleted);
    if (!user) return null;
    Object.assign(user, data, { updatedAt: new Date() });
    return user;
  },

  async softDelete(id) {
    const user = users.find(u => u.id === id && !u.deleted);
    if (!user) return null;
    user.deleted = true;
    user.updatedAt = new Date();
    return user;
  },

  async findByEmailAndUsername(email, username) {
    return users.find(u => u.email === email && u.username === username && !u.deleted) || null;
  }
};
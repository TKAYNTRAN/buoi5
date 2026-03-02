// simple Role object constructor (in-memory, no DB)

class Role {
  constructor({ name, description = '' }) {
    this.id = Role.generateId();
    this.name = name;
    this.description = description;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static generateId() {
    Role._lastId = (Role._lastId || 0) + 1;
    return Role._lastId.toString();
  }
}

module.exports = Role;

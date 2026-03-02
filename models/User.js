// simple User object constructor (in-memory, no DB)
const Role = require('./Role');

class User {
  constructor({ username, password, email, fullName = '', avatarUrl = 'https://i.sstatic.net/l60Hf.png', status = false, role = null, loginCount = 0 }) {
    this.id = User.generateId();
    this.username = username;
    this.password = password;
    this.email = email;
    this.fullName = fullName;
    this.avatarUrl = avatarUrl;
    this.status = status;
    this.role = role; // should be role id or Role object
    this.loginCount = loginCount;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static generateId() {
    User._lastId = (User._lastId || 0) + 1;
    return User._lastId.toString();
  }
}

module.exports = User;

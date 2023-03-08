const db = require('./db');

const User = require('./models/User');

// associations will go here

module.exports = {
  db,
  models: {
    User,
  },
};

const db = require('../db');
const Sequelize = require('sequelize');

const Visitor = db.define('visitor', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Visitor;

const db = require('../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;


const Pool = db.define('pools', {
  cusip: { 
    type: STRING, 
  },
  name: { 
    type: STRING, 
  },
  type: { 
    type: STRING, 
  },
  indicator: { 
    type: STRING, 
  },
  issueDate: { 
    type: INTEGER, 
  },
  maturityDate: { 
    type: INTEGER, 
  },
  originalFace: { 
    type: FLOAT, 
  }     
},{ timestamps: false });



module.exports = Pool;

const db = require('../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;


const PoolBody = db.define('poolbodies', {
  interestRate: { 
    type: FLOAT, 
  },
  remainingBalance: { 
    type: FLOAT, 
  },
  factor: { 
    type: FLOAT, 
  },
  GWAC: { 
    type: FLOAT, 
  },
  WAM: { 
    type: INTEGER, 
  },
  WALA: { 
    type: INTEGER, 
  }     
},{ timestamps: false });


module.exports = PoolBody;

const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, BIGINT } = Sequelize;


const PlatinumBody = db.define('platinumbodies', {
  cusip: { 
    type: STRING, 
  },
  interestrate: { 
    type: FLOAT, 
  },
  remainingbalance: { 
    type: FLOAT, 
  },
  factor: { 
    type: FLOAT, 
  },
  gwac: { 
    type: FLOAT, 
  },
  wam: { 
    type: INTEGER, 
  },
  wala: { 
    type: INTEGER, 
  },
  originalfaceinplatinum: { 
    type: FLOAT, 
  },
  originalfaceincmo: { 
    type: FLOAT, 
  },
  month: { 
    type: STRING, 
  }      
},{ timestamps: false });


module.exports = PlatinumBody;
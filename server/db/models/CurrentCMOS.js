const db = require('../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;

const CurrentCMOS = db.define('currentcmo', {
  deal: { 
    type: STRING, 
  },
  group: { 
    type: STRING, 
  },
  cpr: { 
    type: FLOAT, 
  },
  cprNext: { 
    type: FLOAT, 
  },
  vpr: { 
    type: FLOAT, 
  }, 
  vprNext: { 
    type: FLOAT, 
  },
  cdr: { 
    type: FLOAT, 
  },
  cdrNext: { 
    type: FLOAT, 
  }   
},{ timestamps: false });





module.exports = CurrentCMOS;

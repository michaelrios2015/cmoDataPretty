const db = require('../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT, VIRTUAL } = Sequelize;


const Pool = db.define('pools', {
  cusip: { 
    type: STRING,
    primaryKey: true  
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
  },
  isTBAElig : { 
    type: VIRTUAL,
    get () 
    {
      if (this.getDataValue('originalFace') >= 250000 && this.getDataValue('type') === 'SF'){
        return true
    }
      else {
        return false
      }
    } 
  }      
},{ timestamps: false });



module.exports = Pool;

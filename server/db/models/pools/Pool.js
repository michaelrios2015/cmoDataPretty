const db = require('../../db')
const Sequelize = require('sequelize');
const Moment = require('moment');
const { INTEGER, STRING, FLOAT, DATEONLY } = Sequelize;


// cusip,name,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,cprprediction,cprpredictionnext,date

const Pool = db.define('pools', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  name: { 
    type: STRING, 
  },
  issuedate: { 
    type: DATEONLY, 
  },
  currentface: { 
    type: FLOAT, 
  },
  cfincmo: { 
    type: FLOAT, 
  },
  cfinfed: { 
    type: FLOAT, 
  },
  cfinplat: { 
    type: FLOAT, 
  },
  coupon: { 
    type: FLOAT, 
  },
  gwac: { 
      type: FLOAT, 
  },
  wala: { 
      type: INTEGER, 
  },
  wam: { 
      type: INTEGER, 
  },
  va: { 
    type: FLOAT, 
  },
  cprprediction: { 
      type: FLOAT, 
  },
  cprpredictionnext: { 
      type: FLOAT, 
  },
  va: { 
      type: FLOAT, 
  },
  date: { 
    type: DATEONLY, 
    primaryKey: true
  },       
},{ timestamps: false });



module.exports = Pool;

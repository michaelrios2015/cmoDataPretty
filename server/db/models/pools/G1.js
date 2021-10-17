const db = require('../../db')
const Sequelize = require('sequelize');
const Moment = require('moment');
const { INTEGER, STRING, FLOAT, DATEONLY } = Sequelize;


// cusip,name,indicator,type,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,pastactcpr,curractualcpr,cprprediction,cprpredictionnext,pastactcdr,curractualcdr,cdrprediction,cdrpredictionnext,date

const G1 = db.define('g1s', {
  cusip: { 
    type: STRING,
    primaryKey: true  
  },
  name: { 
    type: STRING, 
  },
  indicator: { 
    type: STRING, 
  },
  type: { 
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
  pastactcpr: { 
    type: FLOAT, 
  },
  curractualcpr: { 
    type: FLOAT, 
  },
  cprprediction: { 
      type: FLOAT, 
  },
  cprpredictionnext: { 
      type: FLOAT, 
  },
  pastactcdr: { 
      type: FLOAT, 
  },
  curractualcdr: { 
    type: FLOAT, 
  },
  cdrprediction: { 
    type: FLOAT, 
  },
  cdrpredictionnext: { 
    type: FLOAT, 
  },
  date: { 
    type: DATEONLY, 
    primaryKey: true
  },       
},{ timestamps: false });



module.exports = G1;

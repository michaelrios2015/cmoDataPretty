const db = require('../../db')
const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;


const PoolBodyUpdate = db.define('poolbodyupdates', {
    cusip: { 
        type: STRING,
    },
    interestrate: { 
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
    cpr: { 
        type: FLOAT, 
    },
    cprNext: { 
        type: FLOAT, 
    },
    va: { 
        type: FLOAT, 
    },
    month: { 
        type: STRING, 
    }      
},{ timestamps: false });


module.exports = PoolBodyUpdate;
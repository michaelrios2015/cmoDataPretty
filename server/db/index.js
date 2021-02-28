const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/acme_db');

const CMOS = db.define('cmo', {
 group: { 
    type: STRING, 
  },
  deal: { 
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
  },
  currFace: { 
    type: FLOAT, 
  }     
},{ timestamps: false });

module.exports = {
    // Include your models in this exports object as well!
    db,
    models: {
      CMOS
    }
  }

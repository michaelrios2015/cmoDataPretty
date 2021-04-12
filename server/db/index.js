const Sequelize = require('sequelize');
const { INTEGER, STRING, FLOAT } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/acme_db');

const CMOS = db.define('cmo', {
  deal: { 
    type: STRING, 
  },
  group: { 
    type: STRING, 
  },
  actualCpr: { 
    type: FLOAT, 
  },
  residual: { 
    type: FLOAT, 
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
  },
  currFace: { 
    type: FLOAT, 
  }     
},{ timestamps: false });


const CPN = db.define('cpn', {
  zero: { 
    type: FLOAT, 
  },
  one: { 
    type: FLOAT, 
  },
  two: { 
    type: FLOAT, 
  },
  three: { 
    type: FLOAT, 
  },
  four: { 
    type: FLOAT, 
  },
  five: { 
    type: FLOAT, 
  },
  six: { 
    type: FLOAT, 
  },
  seven: { 
    type: FLOAT, 
  }, 
  eight: { 
    type: FLOAT, 
  },
  nine: { 
    type: FLOAT, 
  },
  ten: { 
    type: FLOAT, 
  },
  eleven: { 
    type: FLOAT, 
  },
  twelve: { 
    type: FLOAT, 
  },
  thirteen: { 
    type: FLOAT, 
  },
  fourteen: { 
    type: FLOAT, 
  },
  fifteen: { 
    type: FLOAT, 
  }     
},{ timestamps: false });



module.exports = {
    // Include your models in this exports object as well!
    db,
    models: {
      CMOS,
      CurrentCMOS,
      CPN
    }
  }

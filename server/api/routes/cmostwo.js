const router = require('express').Router();
const { db } = require('../../db');

// i can just use raw queries https://medium.com/@codemonk/writing-raw-sql-queries-in-sequelize-for-express-js-eaa095cd41e4

router.get('/', async(req, res, next)=> {
  
    // console.log("try cmos")
  
  try {

    let [results, _] = (await db.query(
      `SELECT *
      FROM cmos
      WHERE date = '2021-11-01'
      LIMIT 10;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});

module.exports = router;




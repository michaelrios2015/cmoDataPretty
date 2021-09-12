const router = require('express').Router();
const { db, models: { Pool, PoolBody, PoolPrediction } } = require('../../db');
// const Sequelize = require('sequelize');

// i can just use raw queries https://medium.com/@codemonk/writing-raw-sql-queries-in-sequelize-for-express-js-eaa095cd41e4

router.get('/', async(req, res, next)=> {
  try {

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *  
     FROM pools  
     LIMIT 100;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});



module.exports = router;




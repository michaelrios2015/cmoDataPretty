const router = require('express').Router();
const { db, models: { Pool, PoolBody, PoolPrediction } } = require('../../db');
// const Sequelize = require('sequelize');

// i can just use raw queries https://medium.com/@codemonk/writing-raw-sql-queries-in-sequelize-for-express-js-eaa095cd41e4

router.get('/', async(req, res, next)=> {
  try {

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *,
    currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) AS float
    FROM pools
    ORDER BY coupon, currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) DESC
    LIMIT 10000;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});



module.exports = router;




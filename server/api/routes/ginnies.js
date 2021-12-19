const router = require('express').Router();
const { db } = require('../../db');
// const Sequelize = require('sequelize');

// i can just use raw queries https://medium.com/@codemonk/writing-raw-sql-queries-in-sequelize-for-express-js-eaa095cd41e4

router.get('/', async(req, res, next)=> {
  
    console.log("try")
  
    try {

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *,
    currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) AS float
    FROM ginnies
    ORDER BY coupon, issuedate DESC
    LIMIT 10;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});

router.get('/coupons/:coupon/:indicator', async(req, res, next)=> {
  try {

  console.log(req.params.coupon) 

  

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *,
    currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) AS float
    FROM ginnies
    WHERE coupon = ${req.params.coupon}
    AND indicator = '${req.params.indicator}'
    ORDER BY coupon, issuedate DESC
    LIMIT 10000;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});


router.get('/floats/:float/:indicator', async(req, res, next)=> {
  try {

  console.log(req.params.float) 

  const min = req.params.float * 1000000;

  console.log(min);

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *,
    currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) AS float
    FROM ginnies
    WHERE currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) >= ${min}
    AND indicator = '${req.params.indicator}'
    ORDER BY coupon, issuedate DESC
    LIMIT 10000;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});


router.get('/couponsandfloats/:coupon/:float/:indicator', async(req, res, next)=> {
  try {


  console.log(req.params.float) 
  console.log(req.params.indicator) 
    
  const min = req.params.float * 1000000; 

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *,
    currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) AS float
    FROM ginnies
    WHERE coupon = ${req.params.coupon}
    AND currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) >= ${min}
    AND indicator = '${req.params.indicator}'
    ORDER BY coupon, issuedate DESC
    LIMIT 10000;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});

module.exports = router;




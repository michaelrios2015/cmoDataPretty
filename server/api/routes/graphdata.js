const router = require('express').Router();
const { db } = require('../../db');
// const Sequelize = require('sequelize');

// i can just use raw queries https://medium.com/@codemonk/writing-raw-sql-queries-in-sequelize-for-express-js-eaa095cd41e4

// this should be incorprated better but it's ok for now
const date = '2022-09-01';

// Am i using this 
router.get('/', async(req, res, next)=> {
  
    // console.log("try")


  
    try {

  let [results, _] = (await db.query(
    `SELECT *
    FROM sumoffloats
    WHERE coupon = 6
    AND date = '${date}'
    ORDER BY cpr;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});


router.get('/coupons/:coupon', async(req, res, next)=> {
  try {

  console.log(req.params.coupon) 

  

  let [results, _] = (await db.query(
    `SELECT *
    FROM sumoffloats
    WHERE coupon = ${req.params.coupon}
    AND gtype = 'g2s'
    AND date = '${date}'
    ORDER BY cpr;` ));
    

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});

router.get('/gtypeandcoupon/:gtype/:coupon', async(req, res, next)=> {
  try {

  // console.log(req.params.coupon) 
  // console.log('------------------------')   
  // console.log(date) 


  

  let [results, _] = (await db.query(
    `SELECT *
    FROM sumoffloats
    WHERE coupon = ${req.params.coupon}
    AND gtype = '${req.params.gtype}'
    AND date = '${date}'
    ORDER BY cpr;` ));
    

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});



// NOT UPDATED

router.get('/floats/:float', async(req, res, next)=> {
  try {

  console.log(req.params.float) 

  const min = req.params.float * 1000000;

  console.log(min);

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *,
    currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) AS float
    FROM g1s
    WHERE currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) >= ${min}
    ORDER BY coupon, issuedate DESC
    LIMIT 10000;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});


router.get('/couponsandfloats/:coupon/:float', async(req, res, next)=> {
  try {

  console.log('------------------------')   
  console.log(req.params.float) 
  console.log(date) 

  const min = req.params.float * 1000000; 

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *,
    currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) AS float
    FROM g1s
    WHERE coupon = ${req.params.coupon}
    AND currentface - COALESCE(cfincmo, 0) - COALESCE(cfinfed, 0) - COALESCE(cfinplat, 0) >= ${min}
    ORDER BY coupon, issuedate DESC
    LIMIT 10000;` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});

module.exports = router;




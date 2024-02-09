const router = require('express').Router();
const { db } = require('../../db');
const currentMonth = require('../../../data/servervar.js')

// i can just use raw queries https://medium.com/@codemonk/writing-raw-sql-queries-in-sequelize-for-express-js-eaa095cd41e4

console.log('test')
console.log(currentMonth)
// fuckkkkk might have messed this up --- 2/26/22
// const currentMonth = '2023-04-01';
router.get('/', async(req, res, next)=> {
  
    // console.log("try cmos")
  


  try {

    let [results, _] = (await db.query(
        `SELECT 
        *
        FROM cmos
        WHERE date = '${currentMonth}'
        AND cmo LIKE '2024%'
        ORDER BY cmo DESC` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});


router.get('/yeardealgroup/:year/:deal/:group/:coupon', async(req, res, next)=> {
  try {

   
  
    let yeardealgroup = '';

    if (req.params.deal === 'All' && req.params.group === 'All'){
        yeardealgroup = `${req.params.year}%`
    }
    else if (req.params.group === 'All'){
        yeardealgroup = `${req.params.year}-${req.params.deal}-%`
    }
    else if (req.params.deal === 'All'){
        yeardealgroup = `${req.params.year}-%-${req.params.group}`
    }
    else {
        yeardealgroup = `${req.params.year}-${req.params.deal}-${req.params.group}`
    }

    console.log(yeardealgroup);

    console.log(req.params.coupon);

  let results = [];  

  if (!isNaN(req.params.coupon)) {  
    console.log("coupon is a number")
    results = (await db.query(
    
      `SELECT 
      *
      FROM cmos
      WHERE date = '${currentMonth}'
      AND cmos.cmo LIKE '${yeardealgroup}'
      AND coupon = ${req.params.coupon}
      ORDER BY cmo DESC` ));    
  } 
  else {
  
    console.log("coupon is NOT a number")

    results = (await db.query(
      `SELECT 
      *
      FROM cmos
      WHERE date = '${currentMonth}'
      AND cmos.cmo LIKE '${yeardealgroup}'
      ORDER BY cmo DESC` ));
  }

  // console.log(results[0])
  res.send(results[0]);
  
}
  catch(ex){
    next(ex);
  }
});


router.get('/year/:year', async(req, res, next)=> {
  try {

  console.log(req.params.year)
  console.log(currentMonth) 

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *
    FROM cmos
    WHERE date = '${currentMonth}'
    AND cmo LIKE '${req.params.year}%'
    LIMIT 10;` ));    


  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});


router.get('/deal/:deal', async(req, res, next)=> {
  try {

  console.log(req.params.coupon) 

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *
    FROM cmos
    WHERE date = '${currentMonth}'
    AND cmo LIKE '%-${req.params.deal}-%'
    LIMIT 10;` ));    


  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});




module.exports = router;




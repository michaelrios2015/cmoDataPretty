const router = require('express').Router();
const { db } = require('../../db');

// i can just use raw queries https://medium.com/@codemonk/writing-raw-sql-queries-in-sequelize-for-express-js-eaa095cd41e4

router.get('/', async(req, res, next)=> {
  
    // console.log("try cmos")
  
  try {

    let [results, _] = (await db.query(
        `SELECT 
        *
        FROM cmos
        WHERE date = '2021-11-01'
        AND cmo LIKE '2021%'` ));

  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});


router.get('/yeardealgroup/:year/:deal/:group', async(req, res, next)=> {
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

    console.log(yeardealgroup)

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT 
    *
    FROM cmos
    WHERE date = '2021-11-01'
  and cmos.cmo LIKE '${yeardealgroup}'` ));    


  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});


router.get('/year/:year', async(req, res, next)=> {
  try {

  console.log(req.params.coupon) 

  let [results, _] = (await db.query(
    // 'SELECT pools.cusip, poolbodies."poolCusip", poolpredictions.cusip as ppCusip ' +
    `SELECT *
    FROM cmos
    WHERE date = '2021-11-01'
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
    WHERE date = '2021-11-01'
    AND cmo LIKE '%-${req.params.deal}-%'
    LIMIT 10;` ));    


  res.send(results)
  }
  catch(ex){
    next(ex);
  }
});




module.exports = router;




const router = require('express').Router();
const { models: { Pool } } = require('../../db');


router.get('/', async(req, res, next)=> {
  try {
    res.send(await Pool.findAll({}))
  }
  catch(ex){
    next(ex);
  }
});



module.exports = router;




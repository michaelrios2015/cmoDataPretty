const router = require('express').Router();
const { models: { Pool, PoolBody } } = require('../../db');


router.get('/', async(req, res, next)=> {
  try {
    // console.log(await Pool.findAll())
    res.send(await Pool.findAll({ 
      include: [{
      model: PoolBody,
      }
    ]}))
  }
  catch(ex){
    next(ex);
  }
});



module.exports = router;




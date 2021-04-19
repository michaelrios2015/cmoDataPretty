const router = require('express').Router();
const { models: { CMOS } } = require('../../db');
const { Op } = require("sequelize");

// gets all cmos
router.get('/', async(req, res, next)=> {
  try {
    res.send(await CMOS.findAll());
  }
  catch(ex){
    next(ex);
  }
});

router.get('/initial', async(req, res, next)=> {
  try {
    res.send(await CMOS.findAll({
      where: {
        id: {
            [Op.lte]: 100,
          }
        }
      }
    ));
  }
  catch(ex){
    next(ex);
  }
});

router.get('/year', async(req, res, next)=> {
  try {
    res.send(await CMOS.findAll({
      where: {
        deal: {
          [Op.like]: '%2021%'
          }
        }
      }
    ));
  }
  catch(ex){
    next(ex);
  }
});


//gets cmos by group
router.get('/dealandgroup/:deal/:group', async(req, res, next)=> {
  try {
    if (req.params.deal !== 'All' && req.params.group !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOS.findAll({where: {deal: req.params.deal, group: req.params.group}}));
    } else if ( req.params.deal !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOS.findAll({where: {deal: req.params.deal}}));
    } else if ( req.params.group !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOS.findAll({where: {group: req.params.group}}));
    } else{
      // console.log('-------------------------------')
      // console.log(req.params.group)
      res.send(await CMOS.findAll());
    }
  }
  catch(ex){
    // console.log('-------------------------------')
    next(ex);
  }
});

module.exports = router;




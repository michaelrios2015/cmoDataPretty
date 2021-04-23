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

router.get('/year/:year', async(req, res, next)=> {
  try {
    console.log(req.params.year);
    res.send(await CMOS.findAll({
      where: { 
        year: req.params.year 
      },
      order: ['deal']
      }
    ));
  }
  catch(ex){
    next(ex);
  }
});


//gets cmos by group
router.get('/dealandgroup/:deal/:group/:year', async(req, res, next)=> {
  try {
    if (req.params.deal !== 'All' && req.params.group !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOS.findAll({where: 
        {deal: req.params.deal, group: req.params.group, year: req.params.year},
        order: ['deal']
      }));
    } else if ( req.params.deal !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOS.findAll({where: 
        {deal: req.params.deal, year: req.params.year },
        order: ['deal']
      }));
    } else if ( req.params.group !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CMOS.findAll({where: 
        {group: req.params.group, year: req.params.year},
        order: ['deal']
      }));
    } 
    // this should never be reached so I should be able to get rid of it
    else{
      // console.log('-------------------------------')
      // console.log(req.params.group)
      res.send(await CMOS.findAll({where: {year: req.params.year},
        order: ['deal']
      }));
    }
  }
  catch(ex){
    // console.log('-------------------------------')
    next(ex);
  }
});

module.exports = router;




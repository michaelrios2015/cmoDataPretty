//as this get's bigger you can seperate things out more
const router = require('express').Router();
const { models: { CurrentCMOS } } = require('../../db');

// gets all Current cmos
router.get('/', async(req, res, next)=> {
  try {
    res.send(await CurrentCMOS.findAll());
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
      res.send(await CurrentCMOS.findAll({where: {deal: req.params.deal, group: req.params.group}}));
    } else if ( req.params.deal !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CurrentCMOS.findAll({where: {deal: req.params.deal}}));
    } else if ( req.params.group !== 'All'){
      // console.log('-------------------------------')
      // console.log(req.params.deal);
      // console.log(req.params.group); 
      res.send(await CurrentCMOS.findAll({where: {group: req.params.group}}));
    } else{
      // console.log('-------------------------------')
      // console.log(req.params.group)
      res.send(await CurrentCMOS.findAll());
    }
  }
  catch(ex){
    // console.log('-------------------------------')
    next(ex);
  }
});

module.exports = router;



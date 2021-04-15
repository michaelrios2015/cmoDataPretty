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

module.exports = router;



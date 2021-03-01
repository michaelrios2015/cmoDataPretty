//as this get's bigger you can seperate things out more
const express = require('express');
const { static } = express;
const path = require('path');
const { db, models: { CMOS } } = require('../db');


const app = express();
module.exports = app

app.use(express.json());

app.use('/dist', static(path.join(__dirname, '..', '..', 'dist')));

// is this supposed to be here??
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '..', '..', 'index.html')));

// gets all cmos
app.get('/api/cmos', async(req, res, next)=> {
  try {
    res.send(await CMOS.findAll());
  }
  catch(ex){
    next(ex);
  }
});


//gets cmos by group
app.get('/api/dealandgroup/:deal/:group', async(req, res, next)=> {
  try {
    if (req.params.deal !== 'All' && req.params.group !== 'All'){
      console.log('-------------------------------')
      console.log(req.params.deal);
      console.log(req.params.group); 
      res.send(await CMOS.findAll({where: {deal: req.params.deal, group: req.params.group}}));
    } else if ( req.params.deal !== 'All'){
      console.log('-------------------------------')
      console.log(req.params.deal);
      console.log(req.params.group); 
      res.send(await CMOS.findAll({where: {deal: req.params.deal}}));
    } else if ( req.params.group !== 'All'){
      console.log('-------------------------------')
      console.log(req.params.deal);
      console.log(req.params.group); 
      res.send(await CMOS.findAll({where: {group: req.params.group}}));
    } else{
      console.log('-------------------------------')
      console.log(req.params.group)
      res.send(await CMOS.findAll());
    }
  }
  catch(ex){
    console.log('-------------------------------')
    next(ex);
  }
});



//final error catcher 
app.use((err, req, res, next)=>{
  res.status(500).send({ error:err });
});




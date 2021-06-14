const router = require('express').Router();
const { models: { Pool, PoolBody, PoolPrediction } } = require('../../db');


router.get('/', async(req, res, next)=> {
  try {
    // console.log(await Pool.findAll())
    let results = await Pool.findAndCountAll({ 
      include: [{
      model: PoolBody, 
      // required: true,
        include: {
          required: true,
          model: PoolPrediction,

        }
      },
    ],
    limit: 100
  })
//   let resultsTest = await Pool.findAll({ 
//     include: [{
//     model: PoolBody, 
//     // required: true,
//       include: {
//         required: true,
//         model: PoolPrediction,

//       }
//     },
//   ],
  
// })
// console.log(resultsTest.length);  
console.log(results.count);
  res.send(results.rows)
  }
  catch(ex){
    next(ex);
  }
});


// router.get('/', async(req, res, next)=> {
//   try {
//     // console.log(await Pool.findAll())
//     res.send(await Pool.findAll({ 
//       include: [{
//       model: PoolBody, 
//       model: PoolPrediction,
//       },
//     ],
//     limit: 100
//   }))
//   }
//   catch(ex){
//     next(ex);
//   }
// });


module.exports = router;




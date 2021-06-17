// this desperateley need to be seperated 
const { models: { Pool, PoolBody, PoolPrediction } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");


  let streamAprilPools = fs.createReadStream('data/pools/monthlySFPS_202104.csv')
  let csvAprilPools = [];
  let csvStreamAprilPools = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    csvAprilPools.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvAprilPools.length; i++ ){
    // for (let i = 0; i < 10; i++ ){    
      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);
      if (csvAprilPools[i][0] === 'PS' ){
        // console.log("------------------------------------");
        // console.log(csvPools[i]);
        try {
         await Pool.create({ cusip: csvAprilPools[i][1], name: csvAprilPools[i][2], indicator: csvAprilPools[i][3], type: csvAprilPools[i][4], 
            issueDate: csvAprilPools[i][5], maturityDate: csvAprilPools[i][7], originalFace: csvAprilPools[i][8]})
         }
        catch(ex){
          console.log(ex)
        }
      }
    }
  });

  let streamMayPools = fs.createReadStream('data/pools/monthlySFPS_202105.csv')
  let csvMayPools = [];
  let csvStreamMayPools = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    csvMayPools.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvMayPools.length; i++ ){
    // for (let i = 0; i < 10; i++ ){    
      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);
      

      if (csvMayPools[i][0] === 'PS' ){
        // console.log("------------------------------------");
        // console.log(csvPools[i]);
        let pool = await Pool.findByPk(csvMayPools[i][1])

        if(!pool){

          try {
          await Pool.create({ cusip: csvMayPools[i][1], name: csvMayPools[i][2], indicator: csvMayPools[i][3], type: csvMayPools[i][4], 
              issueDate: csvMayPools[i][5], maturityDate: csvMayPools[i][7], originalFace: csvMayPools[i][8]})
          }
          catch(ex){
            console.log(ex)
          }
        }
      }
    }
  });


  let streamAprilPoolBodies = fs.createReadStream('data/pools/monthlySFPS_202104.csv')
  let csvPoolAprilBodies = [];
  let csvStreamAprilPoolBodies = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    if (data === ''){
      data = null
      console.log(data)
    } 
    csvPoolAprilBodies.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvPoolAprilBodies.length; i++ ){
    // for (let i = 0; i < 10; i++ ){    

      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);

      if (csvPoolAprilBodies[i][0] === 'PS' ){
        // console.log("------------------------------------");
        // console.log(csvPoolBodies[i][1]);
        // 36202BYW9 does not have 

        if (csvPoolAprilBodies[i][17] === ''){
          csvPoolAprilBodies[i][17] = null;
        }
        if (csvPoolAprilBodies[i][18] === ''){
          csvPoolAprilBodies[i][18] = null;
        }
        if (csvPoolAprilBodies[i][19] === ''){
          csvPoolAprilBodies[i][19] = null;
        }

        try {
          await PoolBody.create({ poolCusip: csvPoolAprilBodies[i][1], interestRate: csvPoolAprilBodies[i][6], remainingBalance: csvPoolAprilBodies[i][9], 
          factor: csvPoolAprilBodies[i][10], GWAC: csvPoolAprilBodies[i][17], WAM: csvPoolAprilBodies[i][18], WALA: csvPoolAprilBodies[i][19], month: 'APRIL'})
        }
          catch(ex){
          console.log(ex)
        }
      }
    }
  });

  let streamPoolsPrediction = fs.createReadStream('data/poolsPredicationApril.csv') 
  let csvPoolPrediction = [];
  let csvStreamPoolsPredication = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvPoolPrediction.push(data);
  })
  .on("end", async function() {
    for (let i = 1; i < csvPoolPrediction.length; i++ ){
    // for (let i = 1; i < 10; i++ ){    

    // so need to search throug poolbodies for cusip and month get the id and use that to set the poolprediction ID all non connected ones will be lost 


        try {

          // let poolBody = await PoolBody.findOne({ where: {poolCusip: csvPoolPrediction[i][0], month: "APRIL"}})
          // if (poolBody){

              // await PoolPrediction.create({ cusip: csvPoolPrediction[i][0], totalOutstanding: csvPoolPrediction[i][1], vpr: csvPoolPrediction[i][2], vprNext: csvPoolPrediction[i][3], 
              // cdr: csvPoolPrediction[i][4], cdrNext: csvPoolPrediction[i][5], cpr: csvPoolPrediction[i][6], cprNext: csvPoolPrediction[i][7], poolbodyId: poolBody.id})

              await PoolPrediction.create({ cusip: csvPoolPrediction[i][0], totalOutstanding: csvPoolPrediction[i][1], vpr: csvPoolPrediction[i][2], vprNext: csvPoolPrediction[i][3], 
                cdr: csvPoolPrediction[i][4], cdrNext: csvPoolPrediction[i][5], cpr: csvPoolPrediction[i][6], cprNext: csvPoolPrediction[i][7]})
          // }
          }
            catch(ex){
              console.log(ex)
            }


      }

    });


// CUSIP,total_outstanding,VPR,VPR_next,CDR,CDR_next,CPR,CPR_next
  
module.exports = {
  streamAprilPools,
  csvStreamAprilPools,
  streamMayPools,
  csvStreamMayPools,
  streamAprilPoolBodies,
  csvStreamAprilPoolBodies,
  streamPoolsPrediction,
  csvStreamPoolsPredication
};

// this desperateley need to be seperated 
const { models: { Pool, PoolBody, PoolPrediction, PoolBodyUpdate } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");

// cusip, factor,GWAC,WAM,WALA,cpr,cprNext,va,month

let streamPoolsBodyUpdate = fs.createReadStream('data/maypoolbodies.csv')
let csvPoolsBodyUpdate = [];
let csvStreamPoolsBodyUpdate = fastcsv
.parse()
.on("data", function(data) {
  // console.log('here')
  csvPoolsBodyUpdate.push(data);
})
.on("end", async function() {
  for (let i = 1; i < csvPoolsBodyUpdate.length; i++ ){
    // for (let i = 1; i < 3; i++ ){
  
    // console.log(csvPoolsBodyUpdate[i]);
    try {

//       cusip,factor,GWAC,WAM,WALA,cpr,cprNext,va,month
// 36202A3U9,0.00031227,8.5,17,340,0.16731955842915347,0.1672208868779177,1,MAY
        if (csvPoolsBodyUpdate[i][3] === ''){
          csvPoolsBodyUpdate[i][3] = null;
        }
        if (csvPoolsBodyUpdate[i][4] === ''){
          csvPoolsBodyUpdate[i][4] = null;
        }
        if (csvPoolsBodyUpdate[i][5] === ''){
          csvPoolsBodyUpdate[i][5] = null;
        }


      await PoolBodyUpdate.create({ cusip: csvPoolsBodyUpdate[i][0], interestrate: csvPoolsBodyUpdate[i][1], factor: csvPoolsBodyUpdate[i][2], gwac: csvPoolsBodyUpdate[i][3], wam: csvPoolsBodyUpdate[i][4], 
        wala: csvPoolsBodyUpdate[i][5], cpr: csvPoolsBodyUpdate[i][6], cprNext: csvPoolsBodyUpdate[i][7], va: csvPoolsBodyUpdate[i][8], month: csvPoolsBodyUpdate[i][9]})
      }
    catch(ex){
      console.log(ex)
    }
  }
});


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


  let streamPools = fs.createReadStream('data/pools.csv')
  let csvPools = [];
  let csvStreamPools = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvPools.push(data);
  })
  .on("end", async function() {
    for (let i = 1; i < csvPools.length; i++ ){
     
      try {
        // cusip,name,type,indicator,issueDate,maturityDate,originalFace
      await Pool.create({ cusip: csvPools[i][0], name: csvPools[i][1], type: csvPools[i][2], indicator: csvPools[i][3],  
          issueDate: csvPools[i][4], maturityDate: csvPools[i][5], originalFace: csvPools[i][6]})
      }
      catch(ex){
        console.log(ex)
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


  let streamMayPoolBodies = fs.createReadStream('data/pools/monthlySFPS_202105.csv')
  let csvPoolMayBodies = [];
  let csvStreamMayPoolBodies = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    if (data === ''){
      data = null
      console.log(data)
    } 
    csvPoolMayBodies.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvPoolMayBodies.length; i++ ){
    // for (let i = 0; i < 10; i++ ){    

      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);

      if (csvPoolMayBodies[i][0] === 'PS' ){
        // console.log("------------------------------------");
        // console.log(csvPoolBodies[i][1]);
        // 36202BYW9 does not have 

        if (csvPoolMayBodies[i][17] === ''){
          csvPoolMayBodies[i][17] = null;
        }
        if (csvPoolMayBodies[i][18] === ''){
          csvPoolMayBodies[i][18] = null;
        }
        if (csvPoolMayBodies[i][19] === ''){
          csvPoolMayBodies[i][19] = null;
        }

        try {
          await PoolBody.create({ poolCusip: csvPoolMayBodies[i][1], interestRate: csvPoolMayBodies[i][6], remainingBalance: csvPoolMayBodies[i][9], 
          factor: csvPoolMayBodies[i][10], GWAC: csvPoolMayBodies[i][17], WAM: csvPoolMayBodies[i][18], WALA: csvPoolMayBodies[i][19], month: 'MAY'})
        }
          catch(ex){
          console.log(ex)
        }
      }
    }
  });

  let streamPoolBodies = fs.createReadStream('data/poolbodies.csv')
  let csvPoolBodies = [];
  let csvStreamPoolBodies = fastcsv
  .parse()
  .on("data", function(data) {
    csvPoolBodies.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvPoolBodies.length; i++ ){
    
      // id,interestRate,remainingBalance,factor,GWAC,WAM,WALA,month,poolCusip
      if (csvPoolBodies[i][4] === ''){
        csvPoolBodies[i][4] = null;
      }
      if (csvPoolBodies[i][5] === ''){
        csvPoolBodies[i][5] = null;
      }
      if (csvPoolBodies[i][6] === ''){
        csvPoolBodies[i][6] = null;
      }

        try {
          await PoolBody.create({ id: csvPoolBodies[i][0], interestRate: csvPoolBodies[i][1], remainingBalance: csvPoolBodies[i][2], 
          factor: csvPoolBodies[i][3], GWAC: csvPoolBodies[i][4], WAM: csvPoolBodies[i][5], WALA: csvPoolBodies[i][6], month: csvPoolBodies[i][7], poolCusip: csvPoolBodies[i][8]})
        }
          catch(ex){
          console.log(ex)
        }
      }
  });

  let streamPoolsPrediction = fs.createReadStream('data/pools/ginnie_202106_monthly_predictions_roll.csv') 
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
                cdr: csvPoolPrediction[i][4], cdrNext: csvPoolPrediction[i][5], cpr: csvPoolPrediction[i][6], cprNext: csvPoolPrediction[i][7], month: 'MAY'})
          // }
          }
            catch(ex){
              console.log(ex)
            }


      }

    });


// CUSIP,total_outstanding,VPR,VPR_next,CDR,CDR_next,CPR,CPR_next
  
module.exports = {
  streamPools,
  csvStreamPools,
  streamAprilPools,
  csvStreamAprilPools,
  streamMayPools,
  csvStreamMayPools,
  streamPoolBodies,
  csvStreamPoolBodies,
  streamAprilPoolBodies,
  csvStreamAprilPoolBodies,
  streamMayPoolBodies,
  csvStreamMayPoolBodies,
  streamPoolsPrediction,
  csvStreamPoolsPredication,
  streamPoolsBodyUpdate,
  csvStreamPoolsBodyUpdate

};

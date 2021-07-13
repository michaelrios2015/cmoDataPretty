// this desperateley need to be seperated 
const { models: { Pool, PoolBody, PoolPrediction, PoolBodyUpdate } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");

// cusip, factor,GWAC,WAM,WALA,cpr,cprNext,va,month

let streamPoolsBodyUpdate = fs.createReadStream('data/pools/maypoolbodies.csv')
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
        if (csvPoolsBodyUpdate[i][10] === ''){
          csvPoolsBodyUpdate[i][10] = null;
        }
        if (csvPoolsBodyUpdate[i][11] === ''){
          csvPoolsBodyUpdate[i][11] = null;
        }


      await PoolBodyUpdate.create({ cusip: csvPoolsBodyUpdate[i][0], interestrate: csvPoolsBodyUpdate[i][1], factor: csvPoolsBodyUpdate[i][2], gwac: csvPoolsBodyUpdate[i][3], wam: csvPoolsBodyUpdate[i][4], 
        wala: csvPoolsBodyUpdate[i][5], cpr: csvPoolsBodyUpdate[i][6], cprNext: csvPoolsBodyUpdate[i][7], va: csvPoolsBodyUpdate[i][8], month: csvPoolsBodyUpdate[i][9], originalfaceinplatinum: csvPoolsBodyUpdate[i][10], 
        originalfaceincmo: csvPoolsBodyUpdate[i][11]
      })
    }
    catch(ex){
      console.log(ex)
    }
  }
});



  let streamPools = fs.createReadStream('data/pools/pools.csv')
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



  let streamPoolBodies = fs.createReadStream('data/pools/poolbodies.csv')
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



// CUSIP,total_outstanding,VPR,VPR_next,CDR,CDR_next,CPR,CPR_next
  
module.exports = {
  streamPools,
  csvStreamPools,
  streamPoolBodies,
  csvStreamPoolBodies,
  streamPoolsBodyUpdate,
  csvStreamPoolsBodyUpdate

};

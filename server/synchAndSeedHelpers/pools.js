// this desperateley need to be seperated 
const { models: { Pool, PoolBody } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");


  let streamPools = fs.createReadStream('data/pools.csv')
  let csvPools = [];
  let csvStreamPools = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    csvPools.push(data);
  })
  .on("end", async function() {
    // for (let i = 0; i < csvPools.length; i++ ){
    for (let i = 0; i < 100; i++ ){    
      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);

      if (csvPools[i][0] === 'PS' ){
        // console.log("------------------------------------");
        // console.log(csvPools[i]);

        try {
         await Pool.create({ cusip: csvPools[i][1], name: csvPools[i][2], indicator: csvPools[i][3], type: csvPools[i][4], 
            issueDate: csvPools[i][5], maturityDate: csvPools[i][7], originalFace: csvPools[i][8]})
         }
            catch(ex){
              console.log(ex)
            }

      }

    }
  });


  let streamPoolBodies = fs.createReadStream('data/pools.csv')
  let csvPoolBodies = [];
  let csvStreamPoolBodies = fastcsv
  .parse({
    delimiter: '|'
  })
  .on("data", function(data) {
    // console.log('here')
    if (data === ''){
      data = null
      console.log(data)
    } 
    csvPoolBodies.push(data);
  })
  .on("end", async function() {
    // for (let i = 0; i < csvPoolBodies.length; i++ ){
    for (let i = 0; i < 100; i++ ){    

      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);

      if (csvPoolBodies[i][0] === 'PS' ){
        // console.log("------------------------------------");
        // console.log(csvPoolBodies[i][1]);
        // 36202BYW9 does not have 

        if (csvPoolBodies[i][17] === ''){
          csvPoolBodies[i][17] = null;
        }
        if (csvPoolBodies[i][18] === ''){
          csvPoolBodies[i][18] = null;
        }
        if (csvPoolBodies[i][19] === ''){
          csvPoolBodies[i][19] = null;
        }

        try {
         await PoolBody.create({ poolCusip: csvPoolBodies[i][1], interestRate: csvPoolBodies[i][6], remainingBalance: csvPoolBodies[i][9], 
            factor: csvPoolBodies[i][10], GWAC: csvPoolBodies[i][17], WAM: csvPoolBodies[i][18], WALA: csvPoolBodies[i][19], month: 'APRIL'})
         }
            catch(ex){
              console.log(ex)
            }

      }

    }
  });


  
module.exports = {
    streamPools,
    csvStreamPools,
    streamPoolBodies,
    csvStreamPoolBodies
};

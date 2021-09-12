// this desperateley need to be seperated 
const { models: { Pool } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");

// cusip,name,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,cprprediction,cprpredictionnext,date

const poolStreamer = async(csv, date) => {
  let streamPools = fs.createReadStream(csv)
  let csvPools = [];
  let csvStreamPools = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvPools.push(data);
  })
  .on("end", async function() {
    for (let i = 1; i < csvPools.length; i++ ){
     
      // for (let i = 1; i < 2; i++ ){
        // console.log(csvPools[i])

        for (let j = 0; j < csvPools[i].length; j++){
          if (csvPools[i][j] === ''){
            // console.log('null')
            csvPools[i][j] = null;
          }
        }

        const cusip = csvPools[i][0];
        const name = csvPools[i][1];
        const issuedate = csvPools[i][2];
        const currentface = csvPools[i][3]
        const cfincmo = csvPools[i][4];
        const cfinfed = csvPools[i][5];
        const cfinplat = csvPools[i][6];
        const coupon = csvPools[i][7];
        const gwac  = csvPools[i][8];
        const wala  = csvPools[i][9];
        const wam = csvPools[i][10];
        const va  = csvPools[i][11];
        const cprprediction  = csvPools[i][12];
        const cprpredictionnext  = csvPools[i][13];
        const date  = csvPools[i][14]; 


      try {
       // cusip,name,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,cprprediction,cprpredictionnext,date
      await Pool.create({ cusip, name, issuedate, currentface, cfincmo, cfinfed, cfinplat, coupon, gwac, wala, wam, va, cprprediction, cprpredictionnext, date })
      }
      catch(ex){
        console.log(ex)
      }
    }
  });


  await streamPools.pipe(csvStreamPools);
}
  
module.exports = {
  poolStreamer
};

// this desperateley need to be seperated 
const { models: { Pool } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");

// cusip,name,indicator,type,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,pastactcpr,curractualcpr,cprprediction,cprpredictionnext,pastactcdr,curractualcdr,cdrprediction,cdrpredictionnext,date

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
        const indicator = csvPools[i][2];
        const type = csvPools[i][3];
        const issuedate = csvPools[i][4];
        const currentface = csvPools[i][5]
        const cfincmo = csvPools[i][6];
        const cfinfed = csvPools[i][7];
        const cfinplat = csvPools[i][8];
        const coupon = csvPools[i][9];
        const gwac  = csvPools[i][10];
        const wala  = csvPools[i][11];
        const wam = csvPools[i][12];
        const va  = csvPools[i][13];
        const pastactcpr = csvPools[i][14];
        const curractualcpr = csvPools[i][15];
        const cprprediction  = csvPools[i][16];
        const cprpredictionnext  = csvPools[i][17];
        const pastactcdr = csvPools[i][18];
        const curractualcdr = csvPools[i][19];
        const cdrprediction = csvPools[i][20];
        const cdrpredictionnext = csvPools[i][21];
        const date  = csvPools[i][22]; 


      try {
       // cusip,name,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,cprprediction,cprpredictionnext,date
      await Pool.create({ cusip, name, indicator, type, issuedate, currentface, cfincmo, cfinfed, cfinplat, coupon, gwac, wala, wam, va, pastactcpr, 
                          curractualcpr, cprprediction, cprpredictionnext, pastactcdr, curractualcdr, cdrprediction, cdrpredictionnext, date })
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

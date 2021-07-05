// this desperateley need to be seperated 
const { models: { Platinum, PlatinumBody } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");


// a function to stream non changing data by month, I assume it changes each month but not sure
async function platinumStreamer(csv) {

  // console.log(csv);

  let streamPlatinums = fs.createReadStream(csv)
  let csvPlatinums = [];
  let csvStreamPlatinums = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvPlatinums.push(data);
  })
  .on("end", async function() {
    for (let i = 1; i < csvPlatinums.length; i++ ){
    // for (let i = 0; i < 10; i++ ){    
      // console.log("------------------------------------");
      // console.log(i);
      // console.log(csvPools[i][0]);
        let platinum = await Platinum.findByPk(csvPlatinums[i][0])

        // cusip,name,indicator,type,issueDate,maturityDate,originalFace
        if(!platinum){
          try {
          await Platinum.create({ cusip: csvPlatinums[i][0], name: csvPlatinums[i][1], indicator: csvPlatinums[i][2], type: csvPlatinums[i][3], 
              issueDate: csvPlatinums[i][4], maturityDate: csvPlatinums[i][5], originalFace: csvPlatinums[i][6]})
          }
          catch(ex){
            console.log(ex)
          }
        }  
    }
  });


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // console.log(streamMonthPools);
  // await streamAprilData.pipe(csvAprilStream);
  await streamPlatinums.pipe(csvStreamPlatinums);
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// this adds the changing monthly data 

const platinumBodyStreamer = async(csv) => {
  let streamPlatinumBodies = fs.createReadStream(csv)
  let csvPlatinumBodies = [];
  let csvStreamPlatinumBodies = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    if (data === ''){
      data = null
      console.log(data)
    } 
    csvPlatinumBodies.push(data);
  })
  .on("end", async function() {
    // for (let i = 1; i < csvPlatinumBodies.length; i++ ){
      for (let i = 1; i < 10; i++ ){

        // console.log(csvPlatinumBodies[i][7]/100);

        if (csvPlatinumBodies[i][4] === ''){
          csvPPlatinumBodies[i][4] = null;
        }
        if (csvPlatinumBodies[i][5] === ''){
          csvPlatinumBodies[i][5] = null;
        }
        if (csvPlatinumBodies[i][6] === ''){
          csvPlatinumBodies[i][6] = null;
        }
        if (csvPlatinumBodies[i][7] === ''){
          csvPlatinumBodies[i][7] = null;
        } 
        else {
          csvPlatinumBodies[i][7] = (csvPlatinumBodies[i][7] * 1) / 100;
          console.log(csvPlatinumBodies[i][7]);
        }

        //cusip,interestrate,remainingbalance,factor,gwac,wam,wala,orignalfaceinplatinum,month
        try {
          await PlatinumBody.create({ cusip: csvPlatinumBodies[i][0], interestrate: csvPlatinumBodies[i][1], remainingbalance: csvPlatinumBodies[i][2], 
          factor: csvPlatinumBodies[i][3], gwac: csvPlatinumBodies[i][4], wam: csvPlatinumBodies[i][5], wala: csvPlatinumBodies[i][6], originalfaceinplatinum: csvPlatinumBodies[i][7], month: csvPlatinumBodies[i][8]})
        }
          catch(ex){
          console.log(ex)
        }
      
    }
  });

  await streamPlatinumBodies.pipe(csvStreamPlatinumBodies);
}


module.exports = {
  platinumStreamer,
  platinumBodyStreamer,
};

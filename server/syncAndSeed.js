const { db, models: { CMOS, CPN, CurrentCMOS } } = require('./db');
const fs = require("fs");
const fastcsv = require("fast-csv");


  //this is loading data.csv into CMOS
  let stream = fs.createReadStream('data.csv');  
  let csvData = [];
  let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvData.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvData.length; i++ ){
      let year = csvData[i][0].slice(4, 8);
      let deal = csvData[i][0].slice(9, csvData[i][0].length);
      console.log(year);
      console.log(deal);
      try{
      await CMOS.create({ year: year, deal: deal, group: csvData[i][1], actualCpr: csvData[i][2], residual: csvData[i][3], cpr: csvData[i][4], cprNext: csvData[i][5], vpr: csvData[i][6], vprNext: csvData[i][7], 
        cdr: csvData[i][8], cdrNext: csvData[i][9], currFace: csvData[i][10] })
      }
      catch(ex){
        console.log(ex)
      }
      }
  });



  //this is loading currentData.csv into CurrentCMOS
  let streamCurrentData = fs.createReadStream('currentData.csv');
  let csvCurrentData = [];
  let csvCurrentStream = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvCurrentData.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvCurrentData.length; i++ ){
      // console.log(csvData[i][1]);
      await CurrentCMOS.create({ deal: csvCurrentData[i][0], group: csvCurrentData[i][1], cpr: csvCurrentData[i][2], cprNext: csvCurrentData[i][3], vpr: csvCurrentData[i][4], vprNext: csvCurrentData[i][5], 
        cdr: csvCurrentData[i][6], cdrNext: csvCurrentData[i][7] })
    }
  });


  // this is for the table I have not tackled yet 
  let streamCPN = fs.createReadStream('cpn.csv');
  let csvDataCPN = [];
  let csvStreamCPN = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvDataCPN.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvDataCPN.length; i++ ){
      // console.log("------------------------------------");
      for (let j = 0; j < csvDataCPN[i].length; j++ ){
        if (csvDataCPN[i][j] === '-'){
          csvDataCPN[i][j] = 0
        } else {
          csvDataCPN[i][j] = parseFloat(csvDataCPN[i][j]); 
        }

        // console.log(csvDataCPN[i][j]);
      }
      
      await CPN.create({ zero: csvDataCPN[i][0], one: csvDataCPN[i][1], two: csvDataCPN[i][2], three: csvDataCPN[i][3], four: csvDataCPN[i][4], five: csvDataCPN[i][5], six: csvDataCPN[i][6], 
        seven: csvDataCPN[i][7], eight: csvDataCPN[i][8], nine: csvDataCPN[i][9], ten: csvDataCPN[i][10], eleven: csvDataCPN[i][11], 
        twelve: csvDataCPN[i][12], thirteen: csvDataCPN[i][13], fourteen: csvDataCPN[i][14], fifteen: csvDataCPN[i][15]})
    }
  });


  const syncAndSeed = async()=> {
    await db.sync({ force: true });

    stream.pipe(csvStream);

    // streamCurrentData.pipe(csvCurrentStream);  

    // streamCPN.pipe(csvStreamCPN);
  };

  
module.exports = syncAndSeed;
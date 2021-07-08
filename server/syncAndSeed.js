// this desperateley need to be seperated 
const { db, models: { CPN } } = require('./db');
const fs = require("fs");
const fastcsv = require("fast-csv");


const {
  streamCMOHeader,
  csvCMOHeaderStream,
  streamCMOBody,
  csvCMOBodyStream
} = require('./synchAndSeedHelpers/cmos.js');

const {
  streamPools,
  csvStreamPools,
  streamPoolsBodyUpdate,
  csvStreamPoolsBodyUpdate
        } = require('./synchAndSeedHelpers/pools.js');

const {
  platinumStreamer,
  platinumBodyStreamer,
        } = require('./synchAndSeedHelpers/platinums.js');


  // this is for the table I have not tackled yet 
  let streamCPN = fs.createReadStream('data/cpn.csv');
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
    
    // --------------------------for syching database
    // await db.sync({ force: true });
    // await db.sync();
    

    // ------------------------------ CMOs
    // await streamCMOHeader.pipe(csvCMOHeaderStream);
    // await streamCMOBody.pipe(csvCMOBodyStream);

    
    // ------------------------------ Cpns
    // streamCPN.pipe(csvStreamCPN);

    // ------------------------------ Pools
    // streamPools.pipe(csvStreamPools);
    // streamPoolsBodyUpdate.pipe(csvStreamPoolsBodyUpdate)

    // ------------------------------ Platinum
    // platinumStreamer('data/platinums/platinumsheaders.csv');
    // platinumBodyStreamer('data/platinums/platinumbodies2021_05.csv');
  
  };

  
module.exports = syncAndSeed;

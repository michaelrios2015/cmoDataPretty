// this desperateley need to be seperated 

const { db, models: { CMOHeader, CMOBody, CPN } } = require('../db');
const fs = require("fs");
const fastcsv = require("fast-csv");

  // All the month ones are being used to parse the data then
  // the data is spit out and I just use the the body and header should clean this up a bit 
  //FEB FEB  FEB
  let streamFeb = fs.createReadStream('.../../data/febData.csv');  
  let csvFebData = [];
  let csvFebStream = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    csvFebData.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvFebData.length; i++ ){
      
      // console.log(csvData[i])
      let year = csvFebData[i][0].slice(4, 8);
      let deal = csvFebData[i][0].slice(9, csvFebData[i][0].length);
      // console.log(year);
      // console.log(deal);
     
      try{
        console.log('----------------------------------------FEBFEBFEB----------------------------------------')
        let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: csvFebData[i][1]}})

        if (header){
          await CMOBody.create({ residual: csvFebData[i][4], actualCpr: csvFebData[i][2], cpr: csvFebData[i][3], 
            cprNext: csvFebData[i][5], vpr: csvFebData[i][6], vprNext: csvFebData[i][7], 
            cdr: csvFebData[i][8], cdrNext: csvFebData[i][9], currFace: csvFebData[i][10], cmoheaderId: header.id, month: 'FEB' })  
        }
        else {
          // await CMOHeader.create({ year: year, deal: deal, group: csvMarchData[i][1]})
          let newHeader =  await CMOHeader.create({ year: year, deal: deal, group: csvFebData[i][1]})
      
          await CMOBody.create({ residual: csvFebData[i][4], actualCpr: csvFebData[i][2], cpr: csvFebData[i][3], cprNext: csvFebData[i][5], vpr: csvFebData[i][6], vprNext: csvFebData[i][7], 
          cdr: csvFebData[i][8], cdrNext: csvFebData[i][9], currFace: csvFebData[i][10], cmoheaderId: newHeader.id, month: 'FEB' })
        }
      }
      catch(ex){
        console.log(ex)
      }
      }
  });


  
  module.exports = {
    streamFeb,
    csvFebStream
  }
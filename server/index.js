const { db, models: { CMOS } } = require('./db');
const app = require('./api')
const fs = require("fs");
const fastcsv = require("fast-csv");


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
      // console.log(csvData[i][1]);
      await CMOS.create({ group: csvData[i][0], deal: csvData[i][1], cpr: csvData[i][2], cprNext: csvData[i][3], vpr: csvData[i][4], vprNext: csvData[i][5], 
        cdr: csvData[i][6], cdrNext: csvData[i][7], currFace: csvData[i][8], WAM: csvData[i][9] })
    }
  });

  const syncAndSeed = async()=> {
    await db.sync({ force: true });

   stream.pipe(csvStream);

  };

  


const init = async()=> {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  };


init();
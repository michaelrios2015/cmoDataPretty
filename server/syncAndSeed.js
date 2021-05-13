// this desperateley need to be seperated 

const { db, models: { CMOHeader, CMOBody, CPN } } = require('./db');
const fs = require("fs");
const fastcsv = require("fast-csv");


  //FEB FEB  FEB
  let streamFeb = fs.createReadStream('febData.csv');  
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



  //MARCH MARCH MARCH 
  let streamMarchData = fs.createReadStream('marchData.csv');
  let csvMarchData = [];
  let csvMarchStream = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    // console.log(data)
    csvMarchData.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvMarchData.length; i++ ){
      
      // console.log(csvMarchData[i][0])
      let year = csvMarchData[i][0].slice(4, 8);
      let deal = csvMarchData[i][0].slice(9, csvMarchData[i][0].length);
      // console.log(year);
      // console.log(deal);
      // console.log(csvMarchData[i][1]);
      try{
        // console.log('----------------------------------------MARCH----------------------------------------')
      
        let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: csvMarchData[i][1]}})
      
        if (header){

          let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: 'MARCH'}})
        // console.log('----------------------------------------body----------------------------------------')
      
        // console.log(body)

        if (body){
          body.cpr = csvMarchData[i][2];
          body.cprNext = csvMarchData[i][3];
          body.vpr = csvMarchData[i][4];
          body.vprNext = csvMarchData[i][5]; 
          body.cdr = csvMarchData[i][6];
          body.cdrNext = csvMarchData[i][7];
          body.residual = Math.round((body.actualCpr - csvMarchData[i][2]) * 10) / 10;

          // Math.round(actualCpr * 10) / 10
          await body.save()

        }
        else{

          await CMOBody.create({ residual: 0, actualCpr: 0, cpr: csvMarchData[i][2], cprNext: csvMarchData[i][3], vpr: csvMarchData[i][4], vprNext: csvMarchData[i][5], 
            cdr: csvMarchData[i][6], cdrNext: csvMarchData[i][7], currFace: 0, cmoheaderId: header.id, month: 'MARCH' })
          
          // await CMOBody.update({ residual: 0, actualCpr: 0, cpr: csvMarchData[i][2], cprNext: csvMarchData[i][3], vpr: csvMarchData[i][4], vprNext: csvMarchData[i][5], 
          //   cdr: csvMarchData[i][6], cdrNext: csvMarchData[i][7] })

        }

      }
      else {
        let newHeader = await CMOHeader.create({ year: year, deal: deal, group: csvMarchData[i][1]})

        await CMOBody.create({ residual: 0, actualCpr: 0, cpr: csvMarchData[i][2], cprNext: csvMarchData[i][3], vpr: csvMarchData[i][4], vprNext: csvMarchData[i][5], 
          cdr: csvMarchData[i][6], cdrNext: csvMarchData[i][7], currFace: 0, cmoheaderId: newHeader.id, month: 'MARCH' })
        // console.log(newHeader.id);
      }

      }
      catch(ex){
        console.log(ex)
      }
    }
  });

  //MARCH UPDATE MARCH UPDATE MARCH UPDATE 
  let streamMarchUpdateData = fs.createReadStream('marchUpdateData.csv');
  let csvMarchUpdateData = [];
  let csvMarchUpdateStream = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    // console.log(data)
    csvMarchUpdateData.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvMarchUpdateData.length; i++ ){
  
      console.log('----------------deal-----------------');
  
      console.log(csvMarchUpdateData[i])
      let year = csvMarchUpdateData[i][0].slice(4, 8);
      let deal = csvMarchUpdateData[i][0].slice(9, csvMarchUpdateData[i][0].length);
      let group = csvMarchUpdateData[i][1];

      let actualCpr = csvMarchUpdateData[i][2] * 100;
      actualCpr = Math.round(actualCpr * 10) / 10

      group = group.replace(/\s+/g, '');
      // deal = deal.replace(/\s+/g, '');
      
      // console.log(group);
      // console.log(deal);

      deal = parseInt(deal, 10);
      // console.log(deal);
      // console.log(year);
      // console.log(deal);
      // console.log(csvMarchData[i][1]);
      try{
        // console.log('----------------------------------------MARCH UPDATE----------------------------------------')
      
        let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: group}})
      
        if (header){

          let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: 'MARCH'}})
        // console.log('----------------------------------------body----------------------------------------')
      
        // console.log(body)

          if (body){
            body.actualCpr = actualCpr
            body.residual = Math.round((actualCpr - body.cpr) * 10) / 10 

            await body.save()
          }
          else{

            await CMOBody.create({ currFace: 0, cmoheaderId: header.id, month: 'MARCH',  residual: 0, actualCpr: actualCpr, cpr: cpr, cprNext: 0, vpr: 0, vprNext: 0, cdr: 0, cdrNext: 0  })
            
          }

      }
      else {
        let newHeader = await CMOHeader.create({ year: year, deal: deal, group: group})

        await CMOBody.create({ currFace: 0, cmoheaderId: newHeader.id, month: 'MARCH',  residual: 0, actualCpr: actualCpr, cpr: 0, cprNext: 0, vpr: 0, vprNext: 0, cdr: 0, cdrNext: 0  })
        // console.log(newHeader.id);

      }

      }
      catch(ex){
        console.log(ex)
      }
    }
  });


    const percentageOneDeciaml = (num) => {

      num *= 100;
      
      return Math.round(num * 10) / 10;

    }


    //APRIL APRIL APRIL 
    let streamAprilData = fs.createReadStream('aprilData.csv');
    let csvAprilData = [];
    let csvAprilStream = fastcsv
    .parse()
    .on("data", function(data) {
      // console.log('here')
      // console.log(data)
      csvAprilData.push(data);
    })
    .on("end", async function() {
      for (let i = 0; i < csvAprilData.length; i++ ){
        


        // console.log(csvAprilData[i][0])
        let year = csvAprilData[i][0].slice(4, 8);
        let deal = csvAprilData[i][0].slice(9, csvAprilData[i][0].length) * 1;
        console.log('----------------deal-----------------');
        console.log(year);
        console.log(deal);
        console.log(csvAprilData[i][1]);
        
        try{
          console.log('----------------------------------------April----------------------------------------')
        
          let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: csvAprilData[i][1]}})
        
          console.log('--------------header-------------------')
          console.log(header)

          if (header){
  
            let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: 'APRIL'}})
          console.log('----------------------------------------body----------------------------------------')
        
          console.log(body)
  
            if (body){
              body.cpr = percentageOneDeciaml(csvAprilData[i][2]);
              body.cprNext = percentageOneDeciaml(csvAprilData[i][3]);
              body.vpr = percentageOneDeciaml(csvAprilData[i][4]);
              body.vprNext = percentageOneDeciaml(csvAprilData[i][5]); 
              body.cdr = percentageOneDeciaml(csvAprilData[i][6]);
              body.cdrNext = percentageOneDeciaml(csvAprilData[i][7]);
              body.residual = Math.round((body.actualCpr - csvAprilData[i][2]) * 10) / 10;
    
              // Math.round(actualCpr * 10) / 10
              await body.save()
    
            }
            else{
    
              await CMOBody.create({ residual: 0, actualCpr: 0, cpr: percentageOneDeciaml(csvAprilData[i][2]), cprNext: percentageOneDeciaml(csvAprilData[i][3]), vpr: percentageOneDeciaml(csvAprilData[i][4]), 
                vprNext: percentageOneDeciaml(csvAprilData[i][5]), cdr: percentageOneDeciaml(csvAprilData[i][6]), cdrNext: percentageOneDeciaml(csvAprilData[i][7]), currFace: 0, cmoheaderId: header.id, month: 'APRIL' })
              
            }
  
        }
        else {
          let newHeader = await CMOHeader.create({ year: year, deal: deal, group: csvAprilData[i][1]})
  
          await CMOBody.create({ residual: 0, actualCpr: 0, cpr: percentageOneDeciaml(csvAprilData[i][2]), cprNext: percentageOneDeciaml(csvAprilData[i][3]), vpr: percentageOneDeciaml(csvAprilData[i][4]), 
            vprNext: percentageOneDeciaml(csvAprilData[i][5]), cdr: percentageOneDeciaml(csvAprilData[i][6]), cdrNext: percentageOneDeciaml(csvAprilData[i][7]), currFace: 0, cmoheaderId: newHeader.id, month: 'APRIL' })
          // console.log(newHeader.id);
        }
  
        }
        catch(ex){
          console.log(ex)
        }
      }
    });


    //APRIL UPDATE APRIL UPDATE APRIL UPDATE 
  let streamAprilUpdateData = fs.createReadStream('aprilUpdateData.csv');
  let csvAprilUpdateData = [];
  let csvAprilUpdateStream = fastcsv
  .parse()
  .on("data", function(data) {
    // console.log('here')
    // console.log(data)
    csvAprilUpdateData.push(data);
  })
  .on("end", async function() {
    for (let i = 0; i < csvAprilUpdateData.length; i++ ){
  
      console.log('----------------deal UPDATE-----------------');
  
      console.log(csvAprilUpdateData[i])
      let year = csvAprilUpdateData[i][0].slice(4, 8);
      let deal = csvAprilUpdateData[i][0].slice(9, csvAprilUpdateData[i][0].length) * 1;
      let group = csvAprilUpdateData[i][1];

      let actualCpr = csvAprilUpdateData[i][2] * 100;
      actualCpr = Math.round(actualCpr * 10) / 10

      group = group.replace(/\s+/g, '');
      // deal = deal.replace(/\s+/g, '');
      
      // console.log(group);
      // console.log(deal);

      deal = parseInt(deal, 10);
      console.log(year);
      console.log(deal);
      console.log(group);
      console.log(actualCpr);
      try{
        console.log('----------------------------------------APRIL UPDATE----------------------------------------')
      
        let header = await CMOHeader.findOne({ where: {year: year, deal: deal, group: group}})
      
        console.log('--------------header update-------------------')
        // console.log(header)
        
        if (header){

          let body = await CMOBody.findOne({ where: {cmoheaderId: header.id, month: 'APRIL'}})
        // console.log('----------------------------------------body----------------------------------------')
      
        // console.log(body)

          if (body){
            body.actualCpr = actualCpr
            if (actualCpr === 0 ){
              body.residual = body.cpr * -1;  
            } 
            else {
              body.residual = Math.round((actualCpr - body.cpr) * 10) / 10 
            }
            
            await body.save()
          }
          else{

            await CMOBody.create({ currFace: 0, cmoheaderId: header.id, month: 'APRIL',  residual: 0, actualCpr: actualCpr, cpr: cpr, cprNext: 0, vpr: 0, vprNext: 0, cdr: 0, cdrNext: 0  })
            
          }

      }
      else {
        let newHeader = await CMOHeader.create({ year: year, deal: deal, group: group})

        await CMOBody.create({ currFace: 0, cmoheaderId: newHeader.id, month: 'APRIL',  residual: 0, actualCpr: actualCpr, cpr: 0, cprNext: 0, vpr: 0, vprNext: 0, cdr: 0, cdrNext: 0  })
        // console.log(newHeader.id);

      }

      }
      catch(ex){
        console.log(ex)
      }
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




      //CMOHEADER 
      let streamCMOHeader = fs.createReadStream('CMOHeaderData.csv');
      let csvCMOHeaderData = [];
      let csvCMOHeaderStream = fastcsv
      .parse()
      .on("data", function(data) {
        // console.log('here')
        // console.log(data)
        csvCMOHeaderData.push(data);
      })
      .on("end", async function() {
        for (let i = 0; i < csvCMOHeaderData.length; i++ ){
          
          // console.log('----------------------------------------April----------------------------------------')
          // console.log(csvCMOHeaderData)
  
          
          try{
                await CMOHeader.create({ id: csvCMOHeaderData[i][0], year: csvCMOHeaderData[i][1], deal: csvCMOHeaderData[i][2], 
                  group: csvCMOHeaderData[i][3] })
          }
          catch(ex){
            console.log(ex)
          }
        }
      });

    //CMOBODY 
    let streamCMOBody = fs.createReadStream('CMOBodyData.csv');
    let csvCMOBodyData = [];
    let csvCMOBodyStream = fastcsv
    .parse()
    .on("data", function(data) {
      // console.log('here')
      // console.log(data)
      csvCMOBodyData.push(data);
    })
    .on("end", async function() {
      for (let i = 0; i < csvCMOBodyData.length; i++ ){
        
        // console.log('----------------------------------------April----------------------------------------')
        // console.log(csvCMOBodyData)

        
        try{
              await CMOBody.create({ id: csvCMOBodyData[i][0], month: csvCMOBodyData[i][1], actualCpr: csvCMOBodyData[i][2], 
                residual: csvCMOBodyData[i][3], cpr: csvCMOBodyData[i][4], cprNext: csvCMOBodyData[i][5], 
                vpr: csvCMOBodyData[i][6], vprNext: csvCMOBodyData[i][7], 
                cdr: csvCMOBodyData[i][8], cdrNext: csvCMOBodyData[i][9], 
                currFace: csvCMOBodyData[i][10], cmoheaderId: csvCMOBodyData[i][11]})
        }
        catch(ex){
          console.log(ex)
        }
      }
    });



  const inputMarchData = async()=> {
    
    // await streamMarchData.pipe(csvMarchStream);  

    // streamCPN.pipe(csvStreamCPN);
  };



  const syncAndSeed = async()=> {
    await db.sync({ force: true });

    // await streamFeb.pipe(csvFebStream);

    // await streamMarchData.pipe(csvMarchStream); 
    
    // await streamMarchUpdateData.pipe(csvMarchUpdateStream); 
    
    // await streamAprilData.pipe(csvAprilStream);

    // await streamAprilUpdateData.pipe(csvAprilUpdateStream);
    
    await streamCMOHeader.pipe(csvCMOHeaderStream);

    await streamCMOBody.pipe(csvCMOBodyStream);
    // inputMarchData();
    // streamCPN.pipe(csvStreamCPN);
  };

  
module.exports = {
  syncAndSeed,
  inputMarchData
};

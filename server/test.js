const readline = require('readline');
const fs = require("fs");


const test = () => {
  console.log('-------------here---------------');
// fs.readFile('text.txt', 'utf8', function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });


}

const readInterface = readline.createInterface({
  input: fs.createReadStream('text.txt'),
  // output: process.stdout,
  // console: false
});


readInterface.on('line', function(line) {
  console.log('-------------here---------------');
  let newLine = line.slice(2,3)
  console.log(newLine);
});

module.exports = test;

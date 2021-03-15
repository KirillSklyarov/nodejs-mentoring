const csv = require('csvtojson/v2');
const fs = require('fs');

const readable = fs.createReadStream('./assets/csv/nodejs-hw1-ex1.csv', { encoding: 'utf8' })
  .on('error', console.error);
const writable = fs.createWriteStream(`./output/result.txt`, { encoding: 'utf8' })
  .on('error', console.error);

csv()
  .fromStream(readable)
  .pipe(writable)
;

const csv = require('csvtojson/v2');
const fs = require('fs');
const { pipeline } = require('stream');

const sourceFileName = './assets/csv/nodejs-hw1-ex1.csv';
const targetFileName = './result.txt';

const readable = fs.createReadStream(sourceFileName, { encoding: 'utf8' });
const writable = fs.createWriteStream(targetFileName, { encoding: 'utf8' });

pipeline(
  [
    readable,
    csv(),
    writable,
  ],
  (err) => {
    if (err) {
      console.error(err);
    }
  },
);

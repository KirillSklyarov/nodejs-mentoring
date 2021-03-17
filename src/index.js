import csv from 'csvtojson/v2';
import fs from 'fs';
import { pipeline } from 'stream';

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

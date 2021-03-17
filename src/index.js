import csv from 'csvtojson/v2';
import { promisify } from 'util';
import fs from 'fs';
import { EOL } from 'os';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const sourceFileName = './assets/csv/nodejs-hw1-ex1.csv';
const targetFileName = './result.txt';

(async function run() {
  try {
    const sourceContent = await readFile(sourceFileName, { encoding: 'utf8' });
    let targetContent = '';

    await csv().fromString(sourceContent).subscribe(data => {
      targetContent = targetContent + JSON.stringify(data) + EOL;
    });
    await writeFile(targetFileName, targetContent);
  } catch (err) {
    console.error(err);
  }
})();

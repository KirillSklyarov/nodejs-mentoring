const { EOL } = require('os');
const { reverse, trimEOL } = require('./src/utils');

process.stdin.on('data', function (chunk) {
  const result = reverse(trimEOL(chunk.toString()));
  process.stdout.write(`${result}${EOL}`);
});

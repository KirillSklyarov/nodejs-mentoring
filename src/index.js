import { EOL } from 'os';
import { reverse, trimEOL } from './utils';

process.stdin.on('data', function (chunk) {
  const result = reverse(trimEOL(chunk.toString()));
  process.stdout.write(`${result}${EOL}`);
});

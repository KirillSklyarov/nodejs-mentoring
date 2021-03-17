const { EOL } = require('os');

function trimEOL(source) {
  const eolIndex = source.lastIndexOf(EOL);

  return eolIndex === -1 ? source : source.slice(0, eolIndex);
}

module.exports.trimEOL = trimEOL;

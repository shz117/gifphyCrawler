var fs = require('fs');
var parts = [];
var inProgress = false;
var path = require('path');
var filePath = path.join(__dirname, 'data', 'cat');

function appendPart(data){
  parts.push(data);
  writeNextPart();
}

function writeNextPart(){
  if (inProgress || parts.length === 0) return;

  var data = parts.shift();
  inProgress = true;
  data += '\n';
  fs.appendFile(filePath, data, function (err) {
    inProgress = false;
    if (err) throw err;
    console.log(data + ' - The data was appended to file ' + filePath);

    writeNextPart();
  });
}

module.exports = {
    appendPart: appendPart
}
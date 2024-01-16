const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'text.txt'), 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

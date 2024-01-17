const fs = require('fs');
const path = require('path');

let data = '';
const stream = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  'utf-8',
);
stream.on('data', (chunk) => (data += chunk));
stream.on('end', () => console.log(data));
stream.on('error', (error) => console.log('Error', error.message));

const path = require('path');
const fs = require('fs');
fs.copyFile(
  path.resolve(__dirname, 'files'),
  path.resolve(__dirname, 'files-copy'),
  (err) => {
    if (err) {
      console.log('Error Found:', err);
    }
  },
);

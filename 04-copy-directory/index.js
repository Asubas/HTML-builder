const path = require('path');
const fs = require('fs');
const currentDirectory = path.join(__dirname, '04-copy-directory');
const copyDirectory = fs.mkdir(
  path.join(__dirname, 'files-copy'),
  {
    recursive: true,
  },
  (err) => {
    if (err) {
      return console.error(err);
    }
  },
);
return copyDirectory;

// fs.copyFile(
//   path.resolve(__dirname, 'files'),
//   path.resolve(__dirname, 'files-copy'),
//   (err) => {
//     if (err) {
//       console.log('Error Found:', err);
//     }
//   },
// );

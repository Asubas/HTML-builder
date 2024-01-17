const path = require('path');
const fs = require('fs');
const currentDirectory = path.join(__dirname, 'files');
const copyDirectory = fs.mkdir(
  path.join(__dirname, 'files-copy'),
  {
    recursive: true,
  },
  (err) => {
    if (err) return err;
  },
);
// return copyDirectory;

fs.readdir(currentDirectory, { withFileTypes: true }, (err, files) => {
  if (err) return err;
  files
    .filter((file) => file.isFile())
    .forEach((file) => {
      fs.copyFile(file, path.join(copyDirectory, 'file'));
    });
});

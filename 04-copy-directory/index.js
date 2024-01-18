const path = require('path');
const fs = require('fs');
const currentDirectory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, 'files-copy');
fs.rm(copyDirectory, { recursive: true }, (err) => {
  if (err) return err;
});

fs.mkdir(copyDirectory, { recursive: true }, (err) => {
  if (err) return err;
});

fs.readdir(currentDirectory, { withFileTypes: true }, (err, files) => {
  if (err) return err;
  files
    .filter((file) => file.isFile())
    .forEach((file) => {
      fs.copyFile(
        path.join(currentDirectory, file.name),
        path.join(copyDirectory, file.name),
        (err) => {
          if (err) return err;
        },
      );
    });
});

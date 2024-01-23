const path = require('path');
const fs = require('fs');
const pathToFolder = path.resolve(__dirname, 'secret-folder');

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) return err;
  files
    .filter((file) => file.isFile())
    .forEach((file) => {
      fs.stat(path.join(pathToFolder, file.name), (err, stats) => {
        if (err) return;
        console.log(
          `${path.basename(file.name, path.extname(file.name))} - ${path
            .extname(file.name)
            .slice(1)} - ${stats.size / 1000}kB`,
        );
      });
    });
});

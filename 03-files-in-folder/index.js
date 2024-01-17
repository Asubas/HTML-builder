const path = require('path');
const fs = require('fs');
const pathToFolder = path.resolve(__dirname, 'secret-folder');

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(path.join(pathToFolder, file.name), (err, stats) => {
          if (err) return;
          console.log(
            `${path.basename(file.name, path.extname(file.name))} - ${path
              .extname(file.name)
              .slice(1)} - ${stats.size}`,
          );
        });
      } else return;
    });
  }
});

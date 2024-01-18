const path = require('path');
const fs = require('fs').promises;
const currentDirectory = path.join(__dirname, 'files');
const copyDirectory = path.join(__dirname, 'files-copy');
async function copyFiles() {
  try {
    await fs.rm(copyDirectory, { force: true, recursive: true });
    await fs.mkdir(copyDirectory, { recursive: true });
    const files = await fs.readdir(currentDirectory, { withFileTypes: true });
    const filtredFiles = files.filter((file) => file.isFile());
    for (const file of filtredFiles) {
      await fs.copyFile(
        path.join(currentDirectory, file.name),
        path.join(copyDirectory, file.name),
      );
    }
  } catch (err) {
    console.log(err.stack);
  }
}
copyFiles();

const path = require('path');
const fs = require('fs').promises;
const currentDirectory = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
async function createBundle() {
  try {
    await fs.rm(bundle, { force: true, recursive: true });
    const styles = await fs.readdir(currentDirectory, { withFileTypes: true });
    const filtredSyles = styles.filter(
      (style) => style.isFile() && path.extname(style.name) === '.css',
    );
    for (const style of filtredSyles) {
      const styleContent = await fs.readFile(
        path.join(currentDirectory, style.name),
        'utf-8',
      );
      await fs.appendFile(bundle, styleContent + '\n');
    }
  } catch (err) {
    console.log(err.stack);
  }
}
createBundle();

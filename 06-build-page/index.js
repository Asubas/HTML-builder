const path = require('path');
const fs = require('fs').promises;

async function htmlBuilder() {
  const createDist = path.join(__dirname, 'project-dist');
  const htmlFIle = path.join(createDist, 'index.html');
  const cssFile = path.join(createDist, 'style.css');
  try {
    const templateHtml = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'UTF-8',
    );
    console.log(templateHtml);
    await fs.mkdir(createDist, { recursive: true });
    await fs.writeFile(htmlFIle, '', { flag: 'w' });
    await fs.writeFile(cssFile, '', { flag: 'w' });
  } catch (err) {
    return console.log(err);
  }
}

htmlBuilder();

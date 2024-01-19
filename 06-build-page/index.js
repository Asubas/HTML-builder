const path = require('path');
const fs = require('fs').promises;

async function htmlBuilder() {
  const createDist = path.join(__dirname, 'project-dist');
  const htmlFIle = path.join(createDist, 'index.html');
  const cssFile = path.join(createDist, 'style.css');
  const components = path.join(__dirname, 'components');
  const currentDirectoryStyles = path.join(__dirname, 'styles');
  try {
    const templateHtml = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'UTF-8',
    );
    const regex = /\{\{[a-zA-Z]+\}\}/g;
    let tags = templateHtml.match(regex);
    let sliceTags = await tags.map((current) => {
      return current.slice(2).slice(0, -2);
    });
    await fs.mkdir(createDist, { recursive: true });
    await fs.writeFile(htmlFIle, '', { flag: 'w' });
    await fs.writeFile(cssFile, '', { flag: 'w' });
    let componentsFile;
    for (let i = 0; i < sliceTags.length; i++) {
      componentsFile = await fs.readFile(
        path.join(components, `${sliceTags[i]}.html`),
        'UTF-8',
      );
    }
    await fs.appendFile(htmlFIle, templateHtml.replace(regex, componentsFile));

    //css generate
    const styles = await fs.readdir(currentDirectoryStyles, {
      withFileTypes: true,
    });
    const filtredSyles = styles.filter(
      (style) => style.isFile() && path.extname(style.name) === '.css',
    );
    for (const style of filtredSyles) {
      const styleContent = await fs.readFile(
        path.join(currentDirectoryStyles, style.name),
        'utf-8',
      );
      await fs.appendFile(cssFile, styleContent + '\n');
    }
  } catch (err) {
    return console.log(err);
  }
}

htmlBuilder();

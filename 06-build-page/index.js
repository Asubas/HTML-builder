const path = require('path');
const fs = require('fs').promises;

async function htmlBuilder() {
  const createDist = path.join(__dirname, 'project-dist');
  const htmlFIle = path.join(createDist, 'index.html');
  const cssFile = path.join(createDist, 'style.css');
  const components = path.join(__dirname, 'components');
  const currentDirectoryStyles = path.join(__dirname, 'styles');
  const assets = path.join(__dirname, 'assets');
  const copyAssets = path.join(createDist, 'assets');
  try {
    await fs.rm(createDist, { force: true, recursive: true });
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
    let componentsFile = [];
    for (let i = 0; i < sliceTags.length; i++) {
      componentsFile[i] = await fs.readFile(
        path.join(components, `${sliceTags[i]}.html`),
        'UTF-8',
      );
    }
    let stringBuffer = templateHtml;
    for (let i = 0; i < componentsFile.length; i++) {
      stringBuffer = stringBuffer.replace(tags[i], componentsFile[i]);
    }
    await fs.writeFile(htmlFIle, stringBuffer);

    //css generate
    const styles = await fs.readdir(currentDirectoryStyles, {
      withFileTypes: true,
    });
    const filteredStyles = styles.filter(
      (style) => style.isFile() && path.extname(style.name) === '.css',
    );
    for (const style of filteredStyles) {
      const styleContent = await fs.readFile(
        path.join(currentDirectoryStyles, style.name),
        'utf-8',
      );
      await fs.appendFile(cssFile, styleContent + '\n');
    }
    //assets added
    await fs.mkdir(copyAssets, { recursive: true });
    const assetsDir = await fs.readdir(assets);
    await Promise.all(
      assetsDir.map((currentAssetsDir) => {
        return fs.mkdir(path.join(copyAssets, currentAssetsDir), {
          recursive: true,
        });
      }),
    );
    const subAssetsDirs = await Promise.all(
      assetsDir.map((copySubAssetsDir) => {
        return fs.readdir(path.join(assets, copySubAssetsDir));
      }),
    );
    await Promise.all(
      subAssetsDirs.map((currentSubAssetsDir, index) => {
        return Promise.all(
          currentSubAssetsDir.map((currentSubAssetsFile) => {
            return fs.copyFile(
              path.join(assets, assetsDir[index], currentSubAssetsFile),
              path.join(copyAssets, assetsDir[index], currentSubAssetsFile),
            );
          }),
        );
      }),
    );
  } catch (err) {
    return console.log(err);
  }
}

htmlBuilder();

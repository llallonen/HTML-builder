const fs = require('fs');
const path = require('path');
const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist');

let writableStream = fs.createWriteStream(path.join(bundlePath, 'bundle.css'));

async function handleStyles() {
  const styles = await fs.promises.readdir(stylesPath, { withFileTypes: true });

  for (const file of styles) {
    let name = file.name.split('.')[0];
    let extension = path.extname(file.name).split('.')[1];

    if (extension === 'css') {
       const readableStream = fs.createReadStream(path.join(stylesPath, file.name));
       readableStream.pipe(writableStream);
    }
  }

  console.log('Merging styles finished')
}

handleStyles();
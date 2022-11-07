const fs = require('fs');
const { builtinModules } = require('module');
const path = require('path');
const bundlePath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const htmlPath = path.join(__dirname, 'components');

async function createIndex() {
    const src = path.join(__dirname, 'template.html');
    const dest = path.join(__dirname, 'project-dist', 'index.html')

    await fs.promises.copyFile(src, dest);
}

async function copyDir(initFolder, destFolder) {
    await fs.promises.mkdir(destFolder, { recursive: true });

    const filesForCopy = await fs.promises.readdir(initFolder, { withFileTypes: true });

    for (let file of filesForCopy) {
        let src = path.join(initFolder, file.name);
        let dest = path.join(destFolder, file.name);

        file.isFile() ?
            await fs.promises.copyFile(src, dest) :
            await copyDir(src, dest);
    }
}


async function handleStyles() {
    let writableStream = fs.createWriteStream(path.join(bundlePath, 'style.css'));
    const styles = await fs.promises.readdir(stylesPath, { withFileTypes: true });

    for (const file of styles) {
        let name = file.name.split('.')[0];
        let extension = path.extname(file.name).split('.')[1];

        if (extension === 'css') {
            const readableStream = fs.createReadStream(path.join(stylesPath, file.name));
            readableStream.pipe(writableStream);
        }
    }
}

async function handleComponents() {
    const output = path.join(__dirname, 'project-dist', 'index.html')
    let index = await fs.promises.readFile(output, { encoding: 'utf-8' });
    const components = await fs.promises.readdir(htmlPath, { withFileTypes: true });

    for (const file of components) {
        let name = file.name.split('.')[0];
        let extension = path.extname(file.name).split('.')[1];

        if (file.isFile() && extension === 'html') {
            let filePath = path.join(__dirname, 'components', name + '.' + extension)

            let fileContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
            let tempPlug = `{{${name}}}`;

            index = index.replace(tempPlug, fileContent);
        }
    }
    await fs.promises.writeFile(output, index);
}

async function build() {
    await fs.promises.mkdir(bundlePath, { recursive: true });
    await copyDir(path.join(__dirname, '/assets'), path.join(__dirname, '/project-dist', '/assets'));
    createIndex();
    handleStyles();
    handleComponents();

    console.log('Building was finished')
}

build();
const fs = require('fs');
const path = require('path');
const dirStartPath = path.join(__dirname, 'files');
const dirDestPath = path.join(__dirname, 'files-copy');


async function copyDir(startFolder, destFolder) {
    await fs.promises.mkdir(destFolder, { recursive: true });
    const files = await fs.promises.readdir(dirStartPath);

    for (let file of files) {
        await fs.promises.copyFile(`${dirStartPath}/${file}`, `${dirDestPath}/${file}`)
    }
}

async function cleanFolder(folder) {
    const filesForRemoving = await fs.promises.readdir(folder);

    for (let file of filesForRemoving) {
        fs.promises.unlink(`${folder}/${file}`);
    }
}


copyDir(dirStartPath, dirDestPath)
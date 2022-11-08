const fs = require('fs');
const path = require('path');
const dirInitPath = path.join(__dirname, 'files');
const dirDestPath = path.join(__dirname, 'files-copy');

async function copyDir(initFolder, destFolder) {
    await fs.promises.rm(destFolder, { recursive: true, force: true });
    await fs.promises.mkdir(destFolder, { recursive: true });

    try {
        const filesForCopy = await fs.promises.readdir(initFolder, { withFileTypes: true });

        for (let file of filesForCopy) {
            let src = path.join(initFolder, file.name);
            let dest = path.join(destFolder, file.name);

            file.isFile() ?
                await fs.promises.copyFile(src, dest) :
                await copyDir(src, dest);
        }
    } catch (error) {
        console.log('Promise')
    }
}


copyDir(dirInitPath, dirDestPath)
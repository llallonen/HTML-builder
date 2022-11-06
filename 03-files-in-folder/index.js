const fs = require('fs/promises');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');

async function read() {
    try {
        const files = await fs.readdir(dirPath, { withFileTypes: true });
        for (const file of files) {
            let name = file.name.split('.')[0];
            let extension = path.extname(file.name).split('.')[1];
            let info = await fs.stat(`${dirPath}/${file.name}`);

            if (file.isFile()) {
            console.log(name + ' - ' + extension + ' - ' + info.size + ' bytes');
            }
        }
    } catch (err) {
        console.log(err)
    }
}

read();
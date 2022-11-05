const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, "text.txt");
let readableStream = fs.createReadStream(dirPath);

readableStream.on("readable", () => {
    const data = readableStream.read();
    if (data) {
        console.log(data.toString());
    }
})
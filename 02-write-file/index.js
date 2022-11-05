const fs = require('fs');
const readline = require('readline');
const path = require('path');

const { stdin: input, stdout: output } = require('process');
const dirPath = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({ input, output });

let writableStream = fs.createWriteStream(dirPath);

console.log('What do you think?\n');

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  } else {
    writableStream.write(input + '\n');
  }
});

process.on('exit', () => {
  console.log('The data has been saved\n' + 'Thank you!');
});
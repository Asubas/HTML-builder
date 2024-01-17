const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rl = readline.createInterface(process.stdin, process.stdout);

function writeToFile(string) {
  fs.appendFile(
    path.resolve(__dirname, '02-write-file.txt'),
    string,
    function (error) {
      if (error) return console.log(error);
    },
  );
}

rl.setPrompt('Please enter your text : \n');
rl.prompt();
rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  }
  writeToFile(input + '\n');
});

rl.on('close', () => {
  console.log('Thanks for your time and good luck with your studies!');
  process.exit(0);
});
process.on('SIGINT', () => {
  rl.close();
});

const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdout, stdin, exit } = process;

process.on('exit', () => stdout.write('Bye!'));
process.on('SIGINT', () => exit());

fs.writeFile(
  path.join(__dirname, 'input-text.txt'),
  '',
  (err) => {
    if (err) throw err;
    stdout.write('Hi!\nInput some text ...\n');
  }
);

stdin.on('data', data => {
  const dataStringified = data.toString();
  
  if (dataStringified.trim() === 'exit') {
    exit();
  }
  
  fs.appendFile(
    path.join(__dirname, 'input-text.txt'),
    dataStringified,
    (err) => {
      if (err) throw err;
    }
  );
});
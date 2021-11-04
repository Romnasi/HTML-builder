const fsPromises = require('fs').promises;
const path = require('path');
const { stdout } = require('process');

const partsOfPath = [__dirname, 'secret-folder'];

const getStat = async (partsOfPath, fileName) => {
  try {
    const filePath = path.join(...partsOfPath , fileName);
    const stats = await fsPromises.stat(filePath);
    const sizeKb = stats.size / 1024;
    return sizeKb;
  } 
  catch (error) {
    stdout.write(error.message);
  }
};

const readFolder = async (partsOfPath) => {
  try {
    const files = await fsPromises.readdir(
      path.join(...partsOfPath),
      {withFileTypes: true}
    );
    for (const file of files) {
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileExt = path.extname(file.name).slice(1);
        const size = await getStat(partsOfPath, file.name);
        stdout.write(`${fileName} - ${fileExt} - ${size}kb\n`);
      }
    }
  } catch (error) {
    stdout.write(error.message);
  }
};

readFolder(partsOfPath);
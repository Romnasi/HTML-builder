const fsPromises = require('fs').promises;
const path = require('path');
const { stdout } = require('process');
const COPY_FOLDER_NAME = 'files-copy';
const FOLDER_NAME = 'files';

const originPath = path.join(__dirname, FOLDER_NAME);
const copyPath = path.join(__dirname, COPY_FOLDER_NAME); 

const copy = async (fileName) => {
  try {
    await fsPromises.copyFile(
      path.join(originPath, fileName), 
      path.join(copyPath, fileName)
    );
    console.log(`${fileName} was copied`);
  } catch {
    console.log('The file could not be copied');
  }
};

const readFolder = async () => {
  try {
    const files = await fsPromises.readdir(originPath);
    for (const file of files) {
      copy(file);
    }
  } catch (error) {
    stdout.write(error.message);
  }
};


const createCopyFolder = async () => {
  fsPromises.mkdir( copyPath, { recursive: true } );
  readFolder();
};

createCopyFolder();
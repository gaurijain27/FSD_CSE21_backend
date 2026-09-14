const fs = require('fs');

const fileName = 'student.txt';

async function createFile() {
  try {
    await fs.promises.writeFile(fileName, 'Name: Gauri \nRollno : 508');
    console.log('File created successfully');
  } catch (err) {
    console.error('Error creating file:', err);
  }
}

async function readFile() {
  try {
    const data = await fs.promises.readFile(fileName, 'utf-8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

(async () => {
  await createFile();
  await readFile();
})();

module.exports = {
  createFile,
  readFile,
};
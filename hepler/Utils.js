const fs = require('fs');
const util = require('util');


const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);


const readAndAppend = async (content, file) => {
  try {
    const data = await readFromFile(file, 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(content);
    await writeToFile(file, JSON.stringify(parsedData, null, 4));
    console.info(`\nData appended to ${file}`);
  } catch (err) {
    console.error(err);
  }
};


const readAndDelete = async (id, file) => {
  try {
    const data = await readFromFile(file, 'utf8');
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter((data) => data.id !== id);
    await writeToFile(file, JSON.stringify(filteredData, null, 4));
    console.info(`\nData deleted from ${file}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };

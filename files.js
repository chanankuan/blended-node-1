import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

import validateData from './helpers/dataValidator.js';
import checkExtention from './helpers/checkExtention.js';

const pathDir = path.resolve('./files');

export const createFile = async (fileName, content) => {
  const file = { fileName, content };
  const { error } = validateData(file);

  if (error) {
    const keyError = error.details[0].path[0];
    console.log(chalk.red(`Please specify '${keyError}' parametr.`));
    return;
  }

  const { extension, result } = checkExtention(fileName);

  if (!result) {
    console.log(
      chalk.red(
        `Sorry, this application does not support files with '${extension}' extension.`
      )
    );
    return;
  }

  const filePath = path.resolve('./files', fileName);
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(chalk.green('File created sucessfully'));
  } catch (error) {
    console.log(error);
  }
};

export const getFiles = async () => {
  try {
    const files = await fs.readdir(pathDir);
    if (!files.length) {
      console.log(chalk.red('Folder empty!'));
      return;
    }
    files.forEach(file => console.log(file));
  } catch (error) {
    console.log(error);
  }
};

export const getFileInfo = async fileName => {
  try {
    const files = await fs.readdir(pathDir);
    if (!files.includes(fileName)) {
      console.log(chalk.red('File does not exists'));
      return;
    }
    const filePath = path.resolve(pathDir, fileName);
    const content = await fs.readFile(filePath, 'utf-8');
    const extension = path.extname(filePath);
    const stats = await fs.stat(filePath);
    console.log({
      name: path.basename(filePath, extension),
      extension,
      content,
      size: stats.size,
    });
  } catch (error) {
    console.log(error);
  }
};

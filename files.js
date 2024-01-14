import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

import validateData from './helpers/dataValidator.js';
import checkExtention from './helpers/checkExtention.js';

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
};

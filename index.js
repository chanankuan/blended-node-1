import { program } from 'commander';
import { createFile } from './files.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-f, --fileName <type>', 'Enter name of file')
  .option('-c, --content <type>', 'Enter content');

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, fileName, content }) {
  switch (action) {
    case 'create':
      createFile(fileName, content);
      break;

    case '':
      // ... id
      break;

    case '':
      // ... name email phone
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);

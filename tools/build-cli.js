/* eslint no-process-exit: 0 */

import 'colors';
import yargs from 'yargs';
import build from './build';
import public from '../public/build';
import { setExecOptions } from './exec';


const argv = yargs
  .help('h')
  .option('public-only', {
    demand: false,
    default: false,
  })
  .option('verbose', {
    demand: false,
    default: false,
    describe: 'Increased debug output',
  })
  .option('dev', {
    demand: false,
    default: false,
    describe: 'Only used when supplied with the --public-only flag',
  })
  .argv;

setExecOptions(argv);

let buildProcess;

if (argv.publicOnly) {
  buildProcess = public(argv);
} else {
  buildProcess = build(argv);
}

buildProcess
  .catch((err) => {
    if (err.stack) {
      console.error(err.stack.red);
    } else {
      console.error(err.toString().red);
    }
    process.exit(1);
  });

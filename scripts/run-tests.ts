import * as jest from 'jest';
import childProcess from 'child_process';

const execSync = childProcess.execSync;
const currentProcess: NodeJS.Process = global.process;
const argv = currentProcess.argv.slice(2);

// Do this as the first thing so that any code reading it knows the right env.
currentProcess.env.BABEL_ENV = 'test';
currentProcess.env.NODE_ENV = 'test';
currentProcess.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
currentProcess.on('unhandledRejection', (err) => {
  throw err;
});

function isInGitRepository(): boolean {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Watch unless on CI, in coverage mode, or explicitly running all tests
if (
  // !process.env.CI &&
  argv.indexOf('--ci') === -1 && // check for test running in CI
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  // https://github.com/facebook/create-react-app/issues/5210
  const hasSourceControl = isInGitRepository();
  argv.push(hasSourceControl ? '--watch' : '--watchAll');
}

jest.run(argv);

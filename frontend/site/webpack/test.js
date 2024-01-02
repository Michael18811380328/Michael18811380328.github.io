'use strict';

// 首先设置环境变量（其他的代码可以正确运行）使用 process.env 对象表示 package.json 文件
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// 使脚本在未处理错误抛出异常时崩溃，而不是默默地忽略它们。
// 将来，未处理的 Promise 拒绝，将以非零退出代码终止Node.js进程。
process.on('unhandledRejection', err => {
  throw err;
});

// 确保读取环境变量.
require('../config/env');

// 使用 jest 测试框架
const jest = require('jest');

// child_process NodeJS 使用同步方式创建子进程
// 详见http://nodejs.cn/api/child_process.html
// http://nodejs.cn/api/child_process.html#child_process_child_process_execsync_command_options
const execSync = require('child_process').execSync;

// process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。
// 运行的命令是 node scripts/test.js --env=jsdom
// 这里从 index = 2 获取传入的命令行参数--env=jsdom（node执行配置的参数）
// console.log(process.argv)
// [
//   '/usr/local/bin/node',
//   '/workroom/Michael/scripts/test.js',
//   '--env=jsdom'
// ]
// 详见 http://nodejs.cn/api/process/process_argv.html
let argv = process.argv.slice(2);

// 判断是否在git中
function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// 判断是否在水星?仓库中
function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Watch unless on CI or explicitly running all tests
if (!process.env.CI && argv.indexOf('--watchAll') === -1) {
  // https://github.com/facebook/create-react-app/issues/5210
  // npm test fails if the project doesn't have git
  const hasSourceControl = isInGitRepository() || isInMercurialRepository();
  // 如果在git环境中，那么需要加入 --watch 参数；否则需要加入 --watchAll 参数
  argv.push(hasSourceControl ? '--watch' : '--watchAll');
}
// 加上 --watchAll 可以选择性的运行下面的脚本
// No tests found related to files changed since last commit.
// Press `a` to run all tests, or run Jest with `--watchAll`.

// Watch Usage
//  › Press a to run all tests.
//  › Press f to run only failed tests.
//  › Press p to filter by a filename regex pattern.
//  › Press t to filter by a test name regex pattern.
//  › Press q to quit watch mode.
//  › Press Enter to trigger a test run.

// 默认的测试环境是 jsdom 如果不加这个也可以运行
// jest.run('--env=jsdom')
jest.run(argv);

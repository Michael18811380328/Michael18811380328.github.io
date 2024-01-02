'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// 确保项目文件夹中的所有符号链接被解决
// https://github.com/facebook/create-react-app/issues/637
// fs.realpathSync 同步获取真实路径
const appDirectory = fs.realpathSync(process.cwd());

// 组合路径函数：把真实路径和相对路径组合
// path.resolve 把一个路径或路径片段的序列解析为一个绝对路径
// path.join 使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径
// join直接拼接字段，resolve解析路径并返回
const resolveApp = (relativePath) => {
  return path.resolve(appDirectory, relativePath);
}

// 用于转换 Windows 反斜杠路径转换为正斜杠路径
function ensureSlash(inputPath, needsSlash) {
  // 如果输入路径是/结尾，那么就是true
  const hasSlash = inputPath.endsWith('/');
  // 如果有斜杠，不需要斜杠，那么删除最后一个字符
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  }
  // 如果没有斜杠，需要斜杠，那么加上一个字符
  else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  }
  // 其他情况直接返回
  else {
    return inputPath;
  }
}

// 公共URL
const envPublicUrl = process.env.PUBLIC_URL;

// 获取公共URL函数
// We use `PUBLIC_URL` environment variable or "homepage" field to infer "public path" at which the app is served.
// webpack 使用"PUBLIC_URL"环境变量或“homepage”字段来推断在其中提供应用程序的“公共路径”。
const getPublicUrl = (appPackageJson) => {
  return envPublicUrl || require(appPackageJson).homepage;
}

// Webpack需要知道将正确的<script> hrefs放入HTML的方法，即使是在单页应用程序中
// 该应用程序可能会为诸如 /todos/42 之类的嵌套URL提供index.html。 
// 我们无法在HTML中使用相对路径，因为我们不想加载 /todos/42/static/js/bundle.7289d.js 的内容，我们必须知道根源。
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// 模块文件扩展名
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// 以 webpack 相同的顺序解析文件路径
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
// 弹出后配置
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index.local'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};

module.exports.moduleFileExtensions = moduleFileExtensions;

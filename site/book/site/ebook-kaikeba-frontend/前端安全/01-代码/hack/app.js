const koa = require('koa');
const chalk = require('chalk');
const static = require('koa-static');

const log = contents => {
  console.log(chalk.red(contents))
}

// 模拟黑客网站
const app = new koa();

app.use(static(__dirname + '/views'))

app.use(async (ctx, next) => {
    log('Hack...:' + ctx.url)
    await next()
});

module.exports = app;

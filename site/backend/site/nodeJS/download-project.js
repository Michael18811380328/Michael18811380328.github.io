#!/usr/bin/env node

const program = require("commander");
const process1 = require("child_process");
const ora = require("ora");
const rm = require("rimraf").sync;

const spinner = ora();

// eg: const gitUrl = 'https://github.com/xxx.git';
program
  .version("0.0.5", "-v, --version")
  .command("init <name>")
  .action((name) => {
    const projectName = name;
    spinner.start("loading...");
    process1.exec("ls -al", function (error, stdout, stderr) {
      if (error !== null) {
        console.log("exec error: " + error);
        return;
      }
      rm("./" + projectName + "/.git");
      console.log(stdout);
      spinner.stop();
      console.log("loading success");
    });
  });

program.parse(process.argv);

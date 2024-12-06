var fs = require('fs');
var path = require('path');
var process = require('child_process');

const reg = new RegExp('dot', 'g');

function generateGraph(file_path) {
  const files = fs.readdirSync(file_path);
  for (file of files) {
    // ignore node_modules and hide file
    if (file[0] === '.' || file === 'node_modules') {
      continue;
    }
    if (file.indexOf('.') === -1) {
      generateGraph(file_path + '/' + file);
    }
    if (file.toLowerCase().match(reg) !== null) {
      var currentPath = path.join(file_path, file);
      if (fs.existsSync(currentPath) === false) {
        continue;
      }
      let result = file.replace('.dot', '.png')
      let cmd = `dot -Tpng ${currentPath} -o ${path.join(file_path, result)}`;
      runScript(cmd, file);
    }
  }
}

function runScript(cmd, file_name = '') {
  process.exec(cmd, function(error) {
    if (error) {
      console.log(error);
    } else {
      console.log(`${file_name} generate success!`);
    }
  });
}

// this is graph path
const initDir = '/Users/seafile/PersonalRepo/ImagesMichael/dot';
// todo check init dir is valid
generateGraph(initDir);

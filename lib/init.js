const inquirer = require('inquirer');
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const download = require('download-git-repo')
// 本地模板 模板维护都在这个项目里
// const CHOICES = fs.readdirSync(path.join(__dirname, '../templates')) 
const CHOICES = ['hb-templates']

function createProject (path) {
  if (fs.existsSync(path)) {
    console.log('folder exists');
    return false;
  }
  console.log('created folder ' + colors.blue(path))
  fs.mkdirSync(path);
  return true;
}
const CURR_DIR = process.cwd();
const SKIP_FILES = ['node_modules', '.git', '.svn', '.idea']

function moveFileToPath (templatePath, projectName) {
  const filesToCreate = fs.readdirSync(templatePath)
  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);
    const stats = fs.statSync(origFilePath);
    if (SKIP_FILES.indexOf(file) > -1) return;
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');
      const writePath = path.join(CURR_DIR, projectName, file);
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(CURR_DIR, projectName, file));
      moveFileToPath(path.join(templatePath, file), path.join(projectName, file))
    }
  })
  console.log(templatePath + colors.green(' created'))
}

function downloadFromGit (template, projectName) {
  const downloadPath = 'chouensei/' + template
  console.log('start downloading from ' + colors.blue(downloadPath))
  download(downloadPath, projectName ,function(err) {
    if (err) { 
      console.log(colors.red('Fail to download '))
      console.log(err.statusCode)
    }
    else console.log('download finished')
  })
}

module.exports = function (name) {
  let newpath = null
  let templatePath = null
  if (name) {
    newpath = name
    inquirer
      .prompt([
        { type: 'list', name: 'template', message: 'choose one template', choices: CHOICES}
      ])
      .then(function(answers) {
        templatePath = path.join(__dirname,'../templates', answers.template)
        if (!createProject(newpath)) return;
        moveFileToPath(templatePath, newpath)
        console.log(colors.blue('initial project finished'))
      })
  } else {
    inquirer
      .prompt([
        { type: 'input', name: 'folderName', message: '请输入文件夹名' },
        { type: 'list', name: 'template', message: 'choose one template', choices: CHOICES}
      ])
      .then(function (answers) {
        newpath = answers.folderName
        // templatePath = path.join(__dirname,'../templates', answers.template)
        if (!createProject(newpath)) return;
        // moveFileToPath(templatePath, newpath)
        // console.log(colors.blue('initial project finished'))
        downloadFromGit(answers.template, newpath)
      })
  }
  
}
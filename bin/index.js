#!/usr/bin/env node

const program = require('commander');
const list = require('../lib/list');
const init = require('../lib/init');

program
  .command('list')
  .alias('ls')
  .description('List templates')
  .action(function(){
    list();
  });

// []可选 <>必须输入
program
  .command('init [folderName]')
  .description('init a project from one template')
  .action(function (folderName) {
    init(folderName);
  });
program.parse(process.argv);
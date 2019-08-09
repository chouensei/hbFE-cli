#!/usr/bin/env node

const program = require('commander');
const list = require('../lib/list');
const order = require('../lib/order');
const init = require('../lib/init');

program
  .command('list')
  .alias('ls')
  .description('List coffee menu')
  .action(function(){
    list();
  });

program
  .command('order')
  .alias('o')
  .description('Order a coffee')
  .action(function () {
    order();
  });
// []可选 <>必须输入
program
  .command('init [folderName]')
  .description('init a project')
  .action(function (folderName) {
    init(folderName);
  });
program.parse(process.argv);
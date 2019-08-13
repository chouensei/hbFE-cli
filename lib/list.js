const colors = require('colors');
const { getTemplates } = require('./values')

module.exports = function () {
  getTemplates()
    .then(choices => {
      console.log('template list');
      console.log('---------------------');
      choices.forEach((choice)=>{
        console.log(colors.blue(choice));
      })
    })
  
}
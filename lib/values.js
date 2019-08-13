const https = require('https')

exports.USER_REPO = 'chouensei'

exports.getTemplates = function () {
  return new Promise((resolve, reject)=>{
    const options = {
      headers: {
        'User-Agent': 'node',
      },
      hostname: 'api.github.com',
      port: 443,
      path: '/users/' + exports.USER_REPO + '/repos',
      method: 'GET'
    }
    const req = https.request(options, (res) => {
      let data = []
      res
        .on('data', (chunk) => {
          data.push(chunk);
        })
        .on('end', () => {
          let buffer = Buffer.concat(data);
          let arr = JSON.parse(buffer.toString())
          const templates = arr.map((val) => {
            return val.name
          })
          resolve(templates)
        })
      })
    req.on('error', (e) => {
      reject(e)
    })
    req.end()
  })
}
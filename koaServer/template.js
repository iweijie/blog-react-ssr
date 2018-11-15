const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

module.exports = fs.readFileSync(filePath, 'utf8');

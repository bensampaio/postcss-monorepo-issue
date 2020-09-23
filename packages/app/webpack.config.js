const path = require('path');

const create = require('@test/config/src/webpack');

module.exports = create({ main: path.join(process.cwd(), 'src', 'index.jsx') });

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'renderer.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
         }
  }
};
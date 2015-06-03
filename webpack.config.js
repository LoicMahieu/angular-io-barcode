
'use strict'

var webpack = require('webpack')

var env = process.env.NODE_ENV || 'development'

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': env
  })
]

if (env === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

module.exports = {
  devtool: env === 'development' && 'inline-source-map',
  externals: {
    'angular': 'angular'
  },
  output: {
    library: 'angularIoBarcode',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  devServer: {
    contentBase: './demo',
    info: true,
    hot: true,
    inline: true,
    port: 3000
  }
}

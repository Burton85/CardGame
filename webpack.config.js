// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path =require('path')

module.exports={
  entry:'./src/style.js',
  output:{
    path:path.resolve(__dirname,'bundle'),
    filename:'style.js'
  },
  module: {
      rules: [
        // {
        //   test: /\.(js)$/,
        //   exclude:/(node_modules)/,
        //   use: {
        //     loader:'babel-loader',
        //     options:{
        //       presets:['@babel/preset-env']
        //     }
        //   }
        // },
        {
          test: /\.(sass|scss)$/,
          use: ['style-loader', 'css-loader','sass-loader']
        },
      ]
    }
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path')
module.exports = {
entry: "./index.js",
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: 'assets/[name][ext]',
    clean: true
    },
plugins:[ new CopyPlugin({
  patterns: [
    { from: "./img", to: "./" },
  ],
}),new MiniCssExtractPlugin({
    filename: 'index.css'
}), 
    new HtmlWebpackPlugin({
    template: path.resolve(__dirname,'index.html')
})],

module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader","sass-loader",],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
    {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
            filename:'fonts/[name][ext]'
        }
    }
    ],
  },

}
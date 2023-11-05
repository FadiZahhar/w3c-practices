const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

  const glob = require('glob');

  // Function to generate an array of HtmlWebpackPlugin instances
  function generateHtmlPlugins(templateDir) {
    const templateFiles = glob.sync(path.resolve(__dirname, templateDir, '**/*.html'));
    return templateFiles.map(item => {
      const parts = item.split('/');
      const name = parts[parts.length - 1];
      const filename = name;
      return new HtmlWebpackPlugin({
        title: 'Webpack App',
        filename: filename,
        template: path.resolve(__dirname, templateDir, name),
        minify: false
      });
    });
  }

    // Function to generate an array of HtmlWebpackPlugin ejs instances
    function generateEjsPlugins(templateDir) {
      const templateFiles = glob.sync(path.resolve(__dirname, templateDir, '*.ejs'));
      return templateFiles.map(item => {
        const parts = item.split('/');
        const name = parts[parts.length - 1];
        let filename = name.split('.');
        filename = filename[0] + '.html';
        return new HtmlWebpackPlugin({
          title: 'Webpack App',
          filename: filename,
          template: path.resolve(__dirname, templateDir, name),
          inject: true,
          minify: false
        });
      });
    }
  
  const htmlPlugins = generateHtmlPlugins('./src');
  const ejsPlugins = generateEjsPlugins('./src');
module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/main.js',
    clean: true,
    //assetModuleFilename: 'assets/[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    watchFiles: ['src/*.*','src/**/*'],
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-loader',
            options: {
              variable: 'data', // specify a variable name
              esModule: false,  // disable ESM
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3|mp4|pdf|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            // Get the relative path of the file from the 'src' directory
            const relativePath = path.relative(path.resolve(__dirname, 'src'), pathData.filename);
            console.log("pathData",pathData);
            // Prepend 'assets/' to maintain the 'assets' folder in the output
            return relativePath.replace(/\\/g, '/');
            //return `${relativePath}`;
          },
      },
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/main.css', // Output CSS to 'assets/css/main.css'
    }),
   ...htmlPlugins,
   //...ejsPlugins
    //new BundleAnalyzerPlugin(),
  ],
}

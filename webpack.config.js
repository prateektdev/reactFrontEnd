var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 8080;

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                }
            }
        ]
    },
    
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
    })],

    devServer: {
        historyApiFallback: true,
        port: port,
        disableHostCheck: true, 
    }, 
    
    externals: {
        // global app config object
        config: JSON.stringify({ 
            apiUrl: 'http://3.1.168.7:8080/servicedesk', 
        })
    }
}
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
        host: '192.168.43.212',
        port: 8088,
        disableHostCheck: true, 
    }, 
    
    externals: {
        // global app config object
        config: JSON.stringify({ 
            apiUrl: 'http://3.1.168.7:8080/servicedesk', 
        })
    }
}
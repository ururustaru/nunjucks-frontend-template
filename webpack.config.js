const fs = require('fs');
const path = require('path');

const exec = require('child_process').exec;

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const ASSET_PATH = process.env.ASSET_PATH || '';
const BABEL_LOADER = NODE_ENV == 'development' ? process.env.BABEL_LOADER : 'true';
const SITE = process.env.SITE || 'true';

const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

let htmlData = JSON.parse(fs.readFileSync('./app/data.json', { encoding: 'utf8' }));
htmlData.dev = {
    mode: NODE_ENV,
    site: SITE
};

let config = {
    entry: {
        app: ['./app/script.js', './app/scss/style.scss'],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: ASSET_PATH,
        filename: '[name].js',
        chunkFilename: NODE_ENV == 'development' ? 'js/chunks/[name].js' : 'js/chunks/[name].[contenthash].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        watchContentBase: true,
        overlay: true,
        hot: true,
        host: '0.0.0.0',
        stats: 'minimal'
    },
    stats: 'minimal',
    mode: NODE_ENV,
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    devtool: NODE_ENV == 'development' ? 'source-map' : 'source-map',
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: isDevServer == true,
                          reloadAll: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: NODE_ENV == 'development' ? [require('autoprefixer')] : [require('autoprefixer'), require('cssnano')()],
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            includePaths: ['app/components', 'app/scss'],
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|woff|woff2|gif)$/,
                loader: 'file-loader',
                options: {
                    context: 'app',
                    outputPath: (url) => {
                        if (/components/.test(url)) {
                          return `images/${url}`;
                        }
                        return url;
                    },
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            attrs: ['img:src', ':data-src', 'use:xlink:href']
                        }
                    },
                    {
                        loader: path.resolve('./loaders/nunjucks-loader.js'),
                        options: {
                            searchPaths: ['./app/layouts', './app/html', './app/components', './app/blocks'],
                            context: htmlData
                        }
                    },
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'app/components'),
                use: (info) => ([
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search: '\.\.\/components\/',
                                replace: '/local/templates/main_new/images/components/',
                                flags: 'g'
                            }
                        },
                    ])
            },


        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'windows.jQuery': 'jquery',
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            SITE: JSON.stringify(SITE)
        }),
        new CleanWebpackPlugin('build', {}),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: NODE_ENV == 'development' ? 'js/chunks/[name].css' : 'js/chunks/[name].[contenthash].css',
        }),
        new CopyWebpackPlugin([
            { from: './app/ajax.pages_list.php', to: '.' }
        ]),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(generateHtmlPlugins('./app/html'))
}

module.exports = (env, argv) => {
    if (SITE == 'true') {
        config.plugins.push(
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                        exec(`"./node_modules/.bin/cross-env" NODE_ENV=${NODE_ENV} SITE=${SITE} node ./loaders/copyFiles.js`, (err, stdout, stderr) => {
                            if (stdout) process.stdout.write(stdout);
                            if (stderr) process.stderr.write(stderr);
                        });
                    });
                }
            }
        )
        config.module.rules.push(
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: 'xlink:href="../images/sprite.svg',
                            replace: 'xlink:href="/local/templates/main_new/images/sprite.svg',
                            flags: 'g'
                        }
                    }
                ]
            }
        )
    }
    if (BABEL_LOADER == 'true') {
        config.module.rules.push(
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env"]
                        ],
                        plugins: ["@babel/plugin-syntax-dynamic-import"]
                    }
                }
            }
        )
    }
    return config
};

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        return new HtmlWebpackPlugin({
            // title: parts[0],
            // meta: { viewport: 'width=device-width, initial-scale=1, user-scalable=no' },
            filename: `${parts[0]}.html`,
            template: `./app/html/${parts[0]}.html`,
            inject: false,
        })
    })
}

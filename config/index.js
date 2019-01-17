'use strict'
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.WYeT57QFXwQUvRB2FAhrXuD8sl97z0kVXtXbCA_tw-AWYzMfAf7zaYng8NZ5DmApbmJkew==     wTx9yVEH7YZ94ySgUpUZcJ6VQOWz-ZCNoWIMBeQKN2B3L9s_9J2Fn_zgiRi3ETZEOjdrkw==

const path = require('path')

// ------------------------------
const myStupidToken1 = "6u8_cX398H3X6_roqlLIE0invSlW7U72B97PKv-8tj6ZkAr2SBKw_r51XeOfZHpUiOr-1A==";
const myStupidToken2 = "jO5NAlEdOVeCr6z5vHJ6niuV39LL-VKgFJYbGWgreeLi7okCIaTTjQqCoAWz6SJoQ46FZQ=="

const myStupidToken = myStupidToken1
    // ------------------------------

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            "/api": {
                target: "http://singledog.qianz.com",
                changeOrigin: true,
                pathRewrite: function(path, req) {
                    return path + "&tk=" + myStupidToken
                }
            },
        },

        // Various Dev Server settings
        host: '172.18.9.232',
        //  host: '192.168.1.116',
        //host: 'localhost', // can be overwritten by process.env.HOST
        port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
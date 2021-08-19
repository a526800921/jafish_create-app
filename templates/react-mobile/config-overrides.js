const { override, fixBabelImports, addPostcssPlugins } = require('customize-cra');

/**
 * [关闭打包后的sourcemap description]
 * [打包后我们会发现静态文件夹中会有很多的css和js的map文件，关闭sourcemap]
 */
process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addPostcssPlugins([
        // require('autoprefixer')(),
        require('postcss-pxtorem')({
            rootValue: 50,
            propList: ['*'],
            "unitPrecision": 5,
            "minPixelValue": 2,
            "selectorBlackList": [
                // 忽略weui样式
                /^.weui/,
                /^.am-/,
            ],
        }),
        // require('postcss-preset-env')({
        //     stage: 0
        // }),
        // require('precss')(),
    ])
)

// module.exports = {
//     webpack(config, env) {
//         console.log(config.module.rules[2], env)

//         return config
//     }
// }

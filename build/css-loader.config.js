module.exports = (isDev) => {
    return {
        // css-loader3以下的写法
        //localIdentName:'[path][name]__[local]--[hash:base64:5]',
        //camelCase: true,

        // css-loader3写法
        modules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
        },
        localsConvention: 'camelCase'
    }
}
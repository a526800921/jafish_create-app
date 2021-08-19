const proxy = require("http-proxy-middleware");

module.exports = function (app) {

    app.use(
        proxy.createProxyMiddleware("/api", {
            target: "https://xxx",
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            },
        })
    );
};


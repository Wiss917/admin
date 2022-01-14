const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://wangge.xcuni.com:10365/testxclife/chShow/mobile/mobileApi',
      '^/api': '/',
      changeOrigin: true,
    })
  );
};

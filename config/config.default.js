const resolvePath = (path) => require('path').resolve(__dirname, path);

module.exports = {
  keys: 'egg-ssr',
  static: {
    prefix: '/',
    dir: [resolvePath('../dist'), resolvePath('../app/public')],
  },
  siteFile: {
    '/favicon.ico': 'https://file.iweijie.cn/static/uploads/2020-05/image/08c412220bcb93d2c351ecaefa6616129.png',
  },
};

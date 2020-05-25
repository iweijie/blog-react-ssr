const resolvePath = (path) => require('path').resolve(__dirname, path);

module.exports = {
  keys: 'egg-ssr',
  static: {
    prefix: '/',
    dir: [resolvePath('../dist'), resolvePath('../app/public')],
  },
  siteFile: {
    '/favicon.ico': 'https://file.iweijie.cn/static/uploads/2020-05/image/000.png',
  },
};

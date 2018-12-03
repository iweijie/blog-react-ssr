module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'blog',
      script: './koaServer/index.js',
      watch: true,
      ignore_watch: ["node_modules"],
      max_memory_restart: "200M",
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "weijie",
      host: "47.104.199.117",
      port: "2200",
      ssh_options: "StrictHostKeyChecking=no",
      ref: 'origin/master',
      repo: 'git@github.com:weijie9520/blog-react-ssr.git',
      path: '/weijie/blog-react-ssr',
      'post-deploy': 'yarn install && yarn build && pm2 reload ecosystem.config.js --env production'
    },
  }
};
module.exports = {
  apps: [
    {
      name: 'ltools-unified',
      script: 'npm',
      args: 'run start',
      env: {
        PORT: 8025,
        NODE_ENV: 'production'
      }
    }
  ]
};
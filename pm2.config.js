module.exports = {
  apps: [
    {
      name: 'ltools-unified',
      script: 'npm',
      args: 'run start',
      env: {
        PORT: 8015,
        NODE_ENV: 'production'
      }
    }
  ]
};

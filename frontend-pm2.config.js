module.exports = {
    apps: [
      {
        name: 'frontend-app',
        script: 'serve',
        args: ['-s', 'client/dist', '-l', '80'], // Adjust the path to your dist folder
        exec_mode: 'fork',
        autorestart: true,
        max_restarts: 10,
        watch: false,
        kill_timeout: 3000,
      },
    ],
  };
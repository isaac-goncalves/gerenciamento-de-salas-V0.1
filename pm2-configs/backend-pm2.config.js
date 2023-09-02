module.exports = {
    apps: [
      {
        name: 'backend-app',
        cwd: 'server/dist', // Set the working directory to server/dist
        script: 'node',
        args: 'server.js', // Replace 'server.js' with your backend entry file
        exec_mode: 'fork',
        autorestart: true,
        max_restarts: 10,
        watch: false,
        kill_timeout: 3000,
      },
    ],
  };
module.exports = {
  apps: [
    {
      name: 'workout-server',
      script: 'python',
      args: 'app.py',
      watch: true,
      env: {
        PORT: 5000
      }
    },
    {
      name: 'nutrition-server',
      script: 'python',
      args: 'nutrition_app.py',
      watch: true,
      env: {
        PORT: 5001
      }
    }
  ]
};

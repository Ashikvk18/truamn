module.exports = {
  apps: [
    {
      name: "rec-website",
      script: "server.js",
      watch: false,
      ignore_watch: ["node_modules", "logs", "*.log", "public", "*.html"],
      env: {
        "NODE_ENV": "production",
      },
      autorestart: false,
      max_memory_restart: "1G",
      error_file: "logs/chatbot-err.log",
      out_file: "logs/chatbot-out.log",
      restart_delay: 4000
    },
    {
      name: "nutrition-server",
      script: "start_nutrition.js",
      watch: false,
      ignore_watch: ["node_modules", "logs", "*.log"],
      env: {
        "NODE_ENV": "production",
      },
      autorestart: false,
      max_memory_restart: "1G",
      error_file: "logs/nutrition-err.log",
      out_file: "logs/nutrition-out.log",
      restart_delay: 4000
    },
    {
      name: "workout-server",
      script: "start_workout.js",
      watch: false,
      ignore_watch: ["node_modules", "logs", "*.log"],
      env: {
        "NODE_ENV": "production",
      },
      autorestart: false,
      max_memory_restart: "1G",
      error_file: "logs/workout-err.log",
      out_file: "logs/workout-out.log",
      restart_delay: 4000
    }
  ]
}

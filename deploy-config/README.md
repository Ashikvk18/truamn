# Deployment Instructions

This project can be deployed to Render.com without modifying the main codebase. Follow these steps:

1. Go to [Render.com](https://render.com) and create an account if you don't have one
2. Click "New +" and select "Blueprint"
3. Connect your GitHub repository
4. When asked for the render.yaml location, specify: `deploy-config/render.yaml`
5. Click "Apply"

Render will automatically:
- Deploy all three services (main web server, workout generator, nutrition generator)
- Set up the environment variables
- Connect the services together

The deployment will create:
- A web service for the main website
- A web service for the workout generator
- A web service for the nutrition generator

No changes to the main codebase are required as all configuration is contained in this directory.

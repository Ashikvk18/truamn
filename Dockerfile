# Use Node.js base image
FROM node:18

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY requirements.txt ./

# Install dependencies
RUN npm install
RUN pip3 install -r requirements.txt

# Copy application files
COPY . .

# Set environment variables
ENV PORT=3000
ENV WORKOUT_SERVER=http://localhost:5000
ENV NUTRITION_SERVER=http://localhost:5001

# Expose ports
EXPOSE 3000 5000 5001

# Start the application using PM2
CMD ["npm", "start"]

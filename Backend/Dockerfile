# Use official Node.js LTS as base
FROM node:18-slim

# Install Python and dependencies
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-dev python3-venv \
    ffmpeg libsm6 libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy backend source code (everything from Backend/)
COPY . .

# Install Python dependencies
RUN pip3 install --no-cache-dir opencv-python==4.8.1.78 \
    && pip3 install --no-cache-dir mediapipe==0.9.3

# Expose port (change if needed)
EXPOSE 5000

# Start Node.js server
CMD ["node", "app.js"]

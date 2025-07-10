# Base image with Node.js
FROM node:18-slim

# Install Python, venv, and required system packages
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv python3-dev ffmpeg libsm6 libxext6 \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy Node.js dependencies and install
COPY package*.json ./
RUN npm install

# Copy backend source code
COPY . .

# Create a virtual environment
RUN python3 -m venv /opt/venv

# Activate the virtual environment and install Python dependencies
RUN /opt/venv/bin/pip install --no-cache-dir opencv-python==4.8.1.78 \
    && /opt/venv/bin/pip install --no-cache-dir mediapipe==0.10.9


# Ensure Python commands use venv by default
ENV PATH="/opt/venv/bin:$PATH"

# Expose port
EXPOSE 5000

# Run your Node.js backend
CMD ["node", "app.js"]

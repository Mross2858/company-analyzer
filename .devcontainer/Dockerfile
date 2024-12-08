FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install development tools
RUN pip install black pylint
RUN npm install -g eslint prettier

WORKDIR /workspace
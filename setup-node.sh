#!/bin/bash
# Script to set up Node.js 20.9.0 for this project

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install Node.js 20.9.0 if not already installed
if ! nvm list | grep -q "v20.9.0"; then
    echo "Installing Node.js 20.9.0..."
    nvm install 20.9.0
fi

# Use Node.js 20.9.0
echo "Switching to Node.js 20.9.0..."
nvm use 20.9.0

# Verify version
echo "Current Node.js version:"
node --version

echo ""
echo "✓ Node.js setup complete! You can now run 'npm run build'"


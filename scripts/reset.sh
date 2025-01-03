#!/bin/bash

# Function to kill processes on ports
kill_port() {
    lsof -ti :$1 | xargs kill -9 2>/dev/null
}

echo "🔄 Resetting servers..."

# Kill processes on common development ports
kill_port 3000  # Frontend
kill_port 5000  # Backend

# Wait a moment for processes to fully terminate
sleep 1

# Start servers
echo "🚀 Starting servers..."
cd "$(dirname "$0")/.."  # Move to project root

# Start the development server
npm run dev &

echo "✅ Reset complete! Servers restarted."

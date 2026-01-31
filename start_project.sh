#!/bin/bash

# Swaralipi AI - Starter Script (Bash)

echo "=========================================="
echo "   Swaralipi AI - Starter Script"
echo "=========================================="

# Backend Setup and Start
echo "Starting Backend..."
(
    echo "Initializing Backend..."
    pip install -r requirements.txt
    python3 backend/app.py
) &

# Frontend Setup and Start
echo "Starting Frontend..."
(
    cd frontend
    echo "Initializing Frontend..."
    npm install
    npm run dev
) &

echo ""
echo "Both servers are starting in the background."
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "=========================================="
wait

@echo off
echo ==========================================
echo    Swaralipi AI - Starter Script
echo ==========================================

:: Backend Setup and Start
echo starting Backend...
start cmd /k "echo Initializing Backend... && pip install -r requirements.txt && python backend/app.py"

:: Frontend Setup and Start
echo Starting Frontend...
start cmd /k "cd frontend && echo Initializing Frontend... && npm install && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo ==========================================
pause

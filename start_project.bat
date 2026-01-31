@echo off
echo ==========================================
echo    Swaralipi AI - Starter Script
echo ==========================================

:: Backend Setup and Start
echo Starting Backend...
if exist ".venv\Scripts\python.exe" (
    start cmd /k "echo Using Virtual Environment... && .venv\Scripts\python.exe -m pip install -r requirements.txt && .venv\Scripts\python.exe backend/app.py"
) else (
    start cmd /k "echo Starting Backend... && pip install -r requirements.txt && python backend/app.py"
)

:: Frontend Setup and Start
echo Starting Frontend...
start cmd /k "cd frontend && echo Initializing Frontend... && npm install && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo ==========================================
pause

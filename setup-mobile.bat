@echo off
REM Swaralipi PWA Mobile Setup Script for Windows
REM This script helps you set up and run the PWA for mobile device testing

echo.
echo ========================================
echo   Swaralipi PWA - Mobile Setup Script
echo ========================================
echo.

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4 Address"') do set "LOCAL_IP=%%a"
set "LOCAL_IP=%LOCAL_IP: =%"

echo Your Local IP Address: %LOCAL_IP%
echo.
echo This IP will be used to access the app from mobile.
echo.

REM Check if .env exists
if exist "frontend\.env" (
    echo .env file found.
    echo Current settings:
    type frontend\.env
    echo.
    set /p update="Update .env with new IP? (y/n): "
    if /i "%update%"=="y" (
        (
            echo # Backend API URL - Update this with your local network IP
            echo # For local development: http://localhost:8000
            echo # For mobile access on same network: http://<YOUR_LOCAL_IP>:8000
            echo VITE_API_BASE=http://%LOCAL_IP%:8000
        ) > frontend\.env
        echo .env updated!
    )
) else (
    echo Creating .env file...
    (
        echo # Backend API URL - Update this with your local network IP
        echo # For local development: http://localhost:8000
        echo # For mobile access on same network: http://<YOUR_LOCAL_IP>:8000
        echo VITE_API_BASE=http://%LOCAL_IP%:8000
    ) > frontend\.env
    echo .env created!
)

echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Backend Server (Terminal 1):
echo    - Activate venv: .venv\Scripts\Activate.ps1
echo    - Start: uvicorn app:app --host 0.0.0.0 --port 8000
echo.
echo 2. Frontend Server (Terminal 2):
echo    - Navigate: cd frontend
echo    - Install: npm install (if needed^)
echo    - Start: npm run dev
echo.
echo 3. Mobile Browser:
echo    - Make sure mobile is on SAME Wi-Fi network
echo    - Open browser (Chrome or Safari^)
echo    - Enter: http://%LOCAL_IP%:5173
echo.
echo 4. Allow Camera Permissions:
echo    - When app requests, tap "Allow"
echo    - iOS: Settings -> Safari -> Camera/Microphone -> Allow
echo.
echo ========================================
echo   Troubleshooting:
echo ========================================
echo.
echo If mobile can't connect:
echo 1. Check both devices on same Wi-Fi
echo 2. Verify IP address is correct
echo 3. Check Windows Firewall allows port 5173 and 8000
echo 4. Restart development servers
echo.
echo For detailed instructions, see: MOBILE_SETUP.md
echo.
pause

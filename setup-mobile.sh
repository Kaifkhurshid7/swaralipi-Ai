#!/bin/bash
# Swaralipi PWA Mobile Setup Script for macOS/Linux
# This script helps you set up and run the PWA for mobile device testing

echo ""
echo "========================================"
echo "  Swaralipi PWA - Mobile Setup Script"
echo "========================================"
echo ""

# Get local IP address
if [[ "$OSTYPE" == "darwin"* ]]; then
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
else
    LOCAL_IP=$(hostname -I | awk '{print $1}')
fi

echo "Your Local IP Address: $LOCAL_IP"
echo ""
echo "This IP will be used to access the app from mobile."
echo ""

# Check if .env exists
if [ -f "frontend/.env" ]; then
    echo ".env file found."
    echo "Current settings:"
    cat frontend/.env
    echo ""
    read -p "Update .env with new IP? (y/n): " update
    if [ "$update" = "y" ] || [ "$update" = "Y" ]; then
        cat > frontend/.env << EOF
# Backend API URL - Update this with your local network IP
# For local development: http://localhost:8000
# For mobile access on same network: http://<YOUR_LOCAL_IP>:8000
VITE_API_BASE=http://$LOCAL_IP:8000
EOF
        echo ".env updated!"
    fi
else
    echo "Creating .env file..."
    cat > frontend/.env << EOF
# Backend API URL - Update this with your local network IP
# For local development: http://localhost:8000
# For mobile access on same network: http://<YOUR_LOCAL_IP>:8000
VITE_API_BASE=http://$LOCAL_IP:8000
EOF
    echo ".env created!"
fi

echo ""
echo "========================================"
echo "   Next Steps:"
echo "========================================"
echo ""
echo "1. Backend Server (Terminal 1):"
echo "   - Activate venv: source venv/bin/activate"
echo "   - Start: uvicorn app:app --host 0.0.0.0 --port 8000"
echo ""
echo "2. Frontend Server (Terminal 2):"
echo "   - Navigate: cd frontend"
echo "   - Install: npm install (if needed)"
echo "   - Start: npm run dev"
echo ""
echo "3. Mobile Browser:"
echo "   - Make sure mobile is on SAME Wi-Fi network"
echo "   - Open browser (Chrome or Safari)"
echo "   - Enter: http://$LOCAL_IP:5173"
echo ""
echo "4. Allow Camera Permissions:"
echo "   - When app requests, tap 'Allow'"
echo "   - iOS: Settings -> Safari -> Camera/Microphone -> Allow"
echo ""
echo "========================================"
echo "   Troubleshooting:"
echo "========================================"
echo ""
echo "If mobile can't connect:"
echo "1. Check both devices on same Wi-Fi"
echo "2. Verify IP address is correct"
echo "3. Check firewall allows port 5173 and 8000"
echo "4. Restart development servers"
echo ""
echo "For detailed instructions, see: MOBILE_SETUP.md"
echo ""

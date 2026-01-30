# Running Swaralipi PWA on Mobile Device

This guide will help you run the Swaralipi React PWA on your mobile device (Android or iOS) for testing and development.

## Prerequisites

- Mobile device (Android or iOS) connected to the same Wi-Fi network as your development machine
- Browser on mobile: Chrome (Android) or Safari (iOS)
- Backend FastAPI server running and accessible
- Node.js and npm installed on development machine

---

## Step 1: Get Your Local Network IP Address

### On Windows (PowerShell)
```powershell
ipconfig
```
Look for "IPv4 Address" under your Wi-Fi adapter (usually something like `192.168.x.x`)

### On macOS/Linux
```bash
ifconfig
```
Look for `inet` address under your Wi-Fi interface

**Example IP: `192.168.1.105`**

---

## Step 2: Configure Environment Variables

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Create a `.env` file based on `.env.example`:
```bash
copy .env.example .env    # Windows
# or
cp .env.example .env      # macOS/Linux
```

3. Update `.env` with your local IP:
```env
# Replace 192.168.1.105 with YOUR actual local IP address
VITE_API_BASE=http://192.168.1.105:8000
```

---

## Step 3: Start the Backend Server

The backend must be accessible from mobile devices on your network.

### In terminal 1 (Backend):
```bash
cd d:\Swarlipi app
.venv\Scripts\Activate.ps1
uvicorn app:app --host 0.0.0.0 --port 8000
```

**Output should show:**
```
Uvicorn running on http://0.0.0.0:8000
```

Test on your computer:
```bash
curl http://192.168.1.105:8000/docs
```

---

## Step 4: Start the Frontend Development Server

### In terminal 2 (Frontend):
```bash
cd d:\Swarlipi app\frontend
npm install    # if not done yet
npm run dev
```

**Output should show:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.105:5173/
```

**Copy the Network URL** (it will be shown in the terminal)

---

## Step 5: Connect Mobile Device to the PWA

### Setup (do once)

1. **Ensure Mobile is on Same Wi-Fi Network**
   - Go to mobile Settings → Wi-Fi
   - Connect to the same network as your development machine

2. **Open Browser on Mobile**
   - Android: Open Chrome
   - iOS: Open Safari

3. **Enter the Network URL**
   - In address bar, enter: `http://192.168.1.105:5173/` (use YOUR IP from Step 1)
   - Press Enter

4. **Allow Camera Permission**
   - App will request camera access
   - Tap "Allow" when prompted
   - On iOS, you may need to allow in Settings → Safari → Camera/Microphone

---

## Step 6: Test the PWA Features

### Test Image Capture:
1. Tap "Start Scanning"
2. Tap "Open Camera"
3. Capture or upload a Swaralipi image
4. Verify detection results appear

### Test History:
1. Tap "View Scan History"
2. Confirm previous scans are displayed
3. Tap a history item to view results

### Test Learning:
1. Tap "Learn About Swaras"
2. Scroll through swara information

---

## Step 7: Install as PWA (Optional)

### Android (Chrome):
1. Tap the three-dot menu ⋮
2. Tap "Install app" or "Add to Home screen"
3. Confirm
4. App icon appears on home screen
5. App runs in fullscreen mode without address bar

### iOS (Safari):
1. Tap the Share button ⬇️
2. Scroll down and tap "Add to Home Screen"
3. Choose name and tap "Add"
4. App icon appears on home screen
5. App runs in fullscreen mode

---

## Troubleshooting

### Mobile Can't Connect to `http://192.168.1.105:5173/`

**Solution:**
1. Verify both devices are on same Wi-Fi network
2. Check Windows Firewall isn't blocking port 5173:
   ```powershell
   # Run as Administrator
   netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=tcp localport=5173
   ```
3. Confirm correct IP address in `.env` file
4. Check backend `.env` or startup logs for actual IP

### Camera Not Working

**Solution:**
- iOS: Settings → Safari → Camera/Microphone → Allow
- Android: App Permissions → Camera → Allow
- URL must be HTTPS for production or localhost (HTTP works on localhost in Chrome)
- For HTTP access, disable "Insecure origins treated as secure" is NOT recommended

### Backend Connection Error

**Solution:**
1. Verify backend is running: `curl http://192.168.1.105:8000/docs`
2. Check `.env` file has correct backend IP
3. Verify firewall allows port 8000:
   ```powershell
   netsh advfirewall firewall add rule name="FastAPI" dir=in action=allow protocol=tcp localport=8000
   ```

### Blank Page on Mobile

**Solution:**
1. Check browser console (Chrome: Menu → More Tools → Developer Tools)
2. Clear browser cache: Menu → Settings → Clear browsing data
3. Verify network URL is correct in address bar
4. Try refreshing the page (Ctrl+R or Cmd+R)

---

## Important Notes

⚠️ **For Production:**
- Don't use HTTP for production
- Enable HTTPS with proper SSL certificates
- Camera requires secure context (HTTPS or localhost)
- Use a proper domain or cloud deployment

✅ **For Development on Local Network:**
- HTTP is acceptable for testing
- Both devices must be on same Wi-Fi
- Backend must allow CORS from mobile URL
- Use the Network IP (not localhost)

---

## Quick Reference

| Component | URL | Notes |
|-----------|-----|-------|
| Frontend (Dev) | `http://192.168.1.105:5173` | Use YOUR local IP |
| Backend API | `http://192.168.1.105:8000` | Must match in `.env` |
| API Docs | `http://192.168.1.105:8000/docs` | Swagger UI |
| Frontend (PC) | `http://localhost:5173` | Localhost only |
| Backend (PC) | `http://localhost:8000` | Localhost only |

---

## Performance Tips

1. **Network Speed**: Use 5GHz Wi-Fi for faster uploads
2. **Image Size**: Compress images before upload for faster processing
3. **Dev Tools**: Disable on mobile for better performance
4. **Progressive**: Install as PWA for better offline support

---

## Next Steps

After successful mobile testing:
1. Deploy to cloud (Heroku, Railway, Vercel)
2. Obtain SSL certificate
3. Use production domain
4. Monitor performance metrics

For production deployment questions, refer to backend and frontend deployment guides.

# Swaralipi PWA Mobile Testing Checklist

## 📋 Pre-Flight Checklist

### Network Setup
- [ ] Mobile device connected to Wi-Fi
- [ ] Development machine connected to **same** Wi-Fi
- [ ] Local IP address identified (e.g., 192.168.1.105)
- [ ] Firewall allows ports 5173 and 8000

### Environment Setup
- [ ] `.env` file created in `frontend/` folder
- [ ] `VITE_API_BASE` set to `http://<LOCAL_IP>:8000`
- [ ] Backend and Frontend dependencies installed

---

## 🚀 Startup Sequence

### Terminal 1: Backend Server
```
[ ] 1. Navigate: cd d:\Swarlipi app
[ ] 2. Activate venv: .venv\Scripts\Activate.ps1
[ ] 3. Start backend: uvicorn app:app --host 0.0.0.0 --port 8000
[ ] 4. Confirm: "Uvicorn running on http://0.0.0.0:8000"
[ ] 5. Test: Open http://<LOCAL_IP>:8000/docs in browser
```

### Terminal 2: Frontend Server
```
[ ] 1. Navigate: cd d:\Swarlipi app\frontend
[ ] 2. Install: npm install (if first time)
[ ] 3. Start dev: npm run dev
[ ] 4. Find Network URL in output
[ ] 5. Copy URL: http://<LOCAL_IP>:5173
```

### Mobile Device
```
[ ] 1. Connect to same Wi-Fi network
[ ] 2. Open browser (Chrome or Safari)
[ ] 3. Enter Network URL from Terminal 2
[ ] 4. Wait for page to load
[ ] 5. Allow camera permission when prompted
```

---

## ✅ Feature Testing

### Home Page
- [ ] Logo displays correctly
- [ ] "Start Scanning" button visible
- [ ] "How It Works" section shows
- [ ] Navigation links work

### Scan Feature
- [ ] "Start Scanning" button taps
- [ ] "Open Camera" button appears
- [ ] Camera opens when tapped
- [ ] Can capture image
- [ ] Image sends to backend
- [ ] Results display correctly

### Results Page
- [ ] Confidence percentage shows
- [ ] Numeric sequence displays
- [ ] Detected swaras list appears
- [ ] Can go back or rescan

### History Page
- [ ] Previous scans listed
- [ ] Can tap to view results
- [ ] "New Scan" button works

### Learn Page
- [ ] Swara cards display
- [ ] Information is readable
- [ ] Can scroll smoothly

---

## 📱 PWA Installation

### Android (Chrome)
```
[ ] 1. Tap menu (three dots)
[ ] 2. Find "Install app" or "Add to Home screen"
[ ] 3. Confirm installation
[ ] 4. Icon appears on home screen
[ ] 5. Tap icon to launch
[ ] 6. App opens fullscreen
```

### iOS (Safari)
```
[ ] 1. Tap Share button
[ ] 2. Find "Add to Home Screen"
[ ] 3. Enter app name
[ ] 4. Tap "Add"
[ ] 5. Icon appears on home screen
[ ] 6. Tap icon to launch
[ ] 7. App opens fullscreen
```

---

## 🔧 Troubleshooting Checklist

### Can't Connect to App
```
[ ] 1. Verify correct IP address in `.env`
[ ] 2. Check both devices on same Wi-Fi
[ ] 3. Ping test: ping <LOCAL_IP>
[ ] 4. Try accessing http://<LOCAL_IP>:5173 directly
[ ] 5. Check Windows/Mac Firewall settings
[ ] 6. Restart both development servers
```

### Camera Not Working
```
[ ] 1. Check browser is using HTTPS or localhost
[ ] 2. Check mobile device camera permissions
[ ] 3. iOS: Settings > Safari > Camera/Microphone
[ ] 4. Android: App Permissions > Camera
[ ] 5. Refresh page after granting permission
[ ] 6. Try different browser
```

### Backend Connection Error
```
[ ] 1. Verify backend running: curl http://<LOCAL_IP>:8000/docs
[ ] 2. Check `.env` backend URL
[ ] 3. Restart backend server
[ ] 4. Check firewall allows port 8000
[ ] 5. Check backend error logs
```

### Page Shows Blank
```
[ ] 1. Clear browser cache
[ ] 2. Refresh page (Ctrl+R or Cmd+R)
[ ] 3. Open browser console for errors (F12)
[ ] 4. Try different browser
[ ] 5. Restart dev server
```

---

## 📊 Performance Testing

### Network Performance
- [ ] Image upload takes < 5 seconds
- [ ] Results display smoothly
- [ ] No lag when scrolling
- [ ] Buttons respond immediately

### Image Quality
- [ ] Camera captures clear images
- [ ] Can detect in various lighting
- [ ] Works with different angles
- [ ] Handles image orientation

### App Performance
- [ ] App doesn't freeze
- [ ] Smooth animations/transitions
- [ ] Low memory usage
- [ ] Battery drain acceptable

---

## 🐛 Debug Information to Collect

If issues occur, collect:

```
1. Browser Console Output (F12):
   - Copy errors/warnings
   - Note network requests status

2. Network URL Used:
   - Write exact URL entered in browser
   - Note local IP used

3. Device Information:
   - Device: iPhone/Android?
   - OS Version: iOS 14? Android 11?
   - Browser: Chrome? Safari?

4. Backend Status:
   - Is it running?
   - Can you access /docs endpoint?
   - Any error messages?

5. Network Status:
   - Same Wi-Fi network?
   - Can you ping local IP?
   - Firewall blocking ports?
```

---

## ✨ Success Indicators

When everything works:
- ✓ App loads in < 3 seconds
- ✓ Camera opens and captures images
- ✓ Backend processes and returns results
- ✓ Results display with confidence scores
- ✓ Navigation between pages is smooth
- ✓ Can install as home screen app
- ✓ App works offline (cached pages)

---

## 📞 Support

For issues not listed:
1. Check `MOBILE_SETUP.md` for detailed troubleshooting
2. Review `QUICK_START.md` for common steps
3. Check browser console (F12) for JavaScript errors
4. Check backend terminal for API errors
5. Verify network connectivity

---

**Last Updated:** January 30, 2026  
**Status:** Ready for Testing ✅

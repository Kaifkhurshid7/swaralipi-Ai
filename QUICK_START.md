# Quick Start: Running Swaralipi on Mobile

## 🚀 Fast Setup (5 minutes)

### 1️⃣ Run the Setup Script
```bash
cd d:\Swarlipi app
setup-mobile.bat
```
This will:
- Detect your local IP address
- Create/update `.env` file
- Show you next steps

### 2️⃣ Start Backend (Terminal 1)
```powershell
cd d:\Swarlipi app
.venv\Scripts\Activate.ps1
uvicorn app:app --host 0.0.0.0 --port 8000
```

Wait for: `Uvicorn running on http://0.0.0.0:8000`

### 3️⃣ Start Frontend (Terminal 2)
```bash
cd d:\Swarlipi app\frontend
npm install
npm run dev
```

Look for the **Network URL** in output:
```
➜  Network: http://192.168.1.105:5173/
```

### 4️⃣ Open on Mobile
- Connect mobile to **same Wi-Fi** as your PC
- Open browser (Chrome or Safari)
- Enter the Network URL from Step 3
- Allow camera permissions when prompted

---

## ✅ What Should Work

- ✓ Image capture from mobile camera
- ✓ Upload and AI detection
- ✓ View results on mobile
- ✓ Scan history
- ✓ Learn swaras page
- ✓ Add to home screen as app

---

## 🔧 Find Your IP Address

### Windows (PowerShell)
```powershell
ipconfig
```
Look for IPv4 Address (e.g., `192.168.1.105`)

### macOS/Linux
```bash
ifconfig
```
Look for `inet` under Wi-Fi

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Mobile page blank | Clear browser cache, refresh |
| Camera not working | Check app permissions, retry |
| Can't connect | Same Wi-Fi? Correct IP? Firewall? |
| Backend error | Check backend running on port 8000 |

---

## 📖 Full Documentation

See `MOBILE_SETUP.md` for:
- Detailed troubleshooting
- iOS-specific setup
- PWA installation steps
- Performance tips
- Production deployment

---

## 💡 Pro Tips

1. **Use 5GHz Wi-Fi** for faster speed
2. **Compress images** before upload for speed
3. **Install as PWA** for app-like experience
4. **Test before deploying** to production

---

## 📱 Install as PWA

### Android (Chrome)
- Menu ⋮ → Add to Home screen

### iOS (Safari)
- Share ⬇️ → Add to Home Screen

App runs fullscreen without address bar!

---

**Ready to test? Start with Step 2️⃣ above!**

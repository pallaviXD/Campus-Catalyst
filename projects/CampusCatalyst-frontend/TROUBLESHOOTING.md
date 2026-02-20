# Troubleshooting Guide

## ✅ Environment Variables Error - FIXED!

**Error Message:**
```
Error occurred
Please make sure to set up your environment variables correctly.
Create a .env file based on .env.template
```

**Solution:**
The `.env` file has been created for you! Just restart the dev server.

---

## 🚀 How to Start the App Now

### In VS Code Terminal:

```powershell
# Make sure you're in the frontend directory
cd CampusCatalyst\projects\CampusCatalyst-frontend

# Start the dev server
npm run dev
```

The app should now start successfully! 🎉

---

## 🌐 What Network Are We Using?

The app is configured to use **Algorand TestNet** by default. This means:

✅ **You can develop the frontend without LocalNet**
✅ **Wallet connection will work**
✅ **UI will work perfectly**
⏳ **Smart contract features need deployment** (do this later)

---

## 📝 Common Issues & Solutions

### Issue 1: "Cannot find module"
**Solution:**
```powershell
npm install
```

### Issue 2: Port 5173 already in use
**Solution:**
```powershell
# Kill the process
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or just restart your computer
```

### Issue 3: Changes not showing
**Solution:**
- Hard refresh: `Ctrl + Shift + R`
- Clear cache
- Restart dev server

### Issue 4: Wallet won't connect
**Solution:**
- Install Pera Wallet or Defly Wallet browser extension
- Make sure you're on TestNet
- Refresh the page

---

## 🎯 Development Workflow

### Phase 1: Frontend Development (Current)
```powershell
cd CampusCatalyst\projects\CampusCatalyst-frontend
npm run dev
```

- Work on UI/UX
- Test navigation
- Design components
- No blockchain needed yet!

### Phase 2: Smart Contract Development (Later)
```powershell
# Start LocalNet
algokit localnet start

# Build contracts
cd CampusCatalyst\projects\CampusCatalyst-contracts
algokit project run build

# Deploy
algokit project deploy localnet
```

### Phase 3: Integration (Final)
- Deploy contract to TestNet
- Get App ID
- Update `.env` with App ID
- Test full integration

---

## 🔧 Environment File Explained

Your `.env` file contains:

```env
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_NETWORK=testnet
```

This connects to Algorand's public TestNet node. No local setup needed!

---

## ✅ Checklist

- [x] Dependencies installed (`npm install`)
- [x] `.env` file created
- [ ] Dev server running (`npm run dev`)
- [ ] Browser opened (http://localhost:5173)
- [ ] App loads successfully

---

## 🆘 Still Having Issues?

1. **Restart VS Code**
2. **Delete `node_modules` and reinstall:**
   ```powershell
   rm -r node_modules
   npm install
   ```
3. **Check Node.js version:**
   ```powershell
   node --version
   # Should be 20.0 or higher
   ```

---

## 🎉 Success Indicators

When everything works, you'll see:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

And the browser will show the beautiful red & black login page! 🚀

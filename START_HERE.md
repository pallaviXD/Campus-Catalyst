# 🚀 START HERE - Quick Start in VS Code

## ⚡ Super Quick Start (Copy & Paste)

### Step 1: Open VS Code Terminal
Press `` Ctrl+` `` (backtick key) or go to `View > Terminal`

### Step 2: Install Dependencies (First Time Only)
```bash
cd projects/CampusCatalyst-frontend
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open Browser
Click this link or copy to browser: **http://localhost:5173**

## ✅ That's It! You're Running!

---

## 🎯 What You Can Do Now

### 1. View the App
- Open http://localhost:5173 in your browser
- You'll see the Login page with red & black theme

### 2. Test the App
- Click "Sign up now" to create an account
- Enter any email and password
- You'll be redirected to the dashboard

### 3. Explore Features
- **Dashboard**: View all campaigns
- **Create Campaign**: Click the button to create a new campaign
- **Campaign Cards**: Click any campaign to see details
- **Wallet**: Connect your Algorand wallet (Pera or Defly)

### 4. Make Changes
- Edit any file in VS Code
- Save the file (`Ctrl+S`)
- Browser automatically refreshes
- See your changes instantly!

---

## 📝 Common Tasks

### Start the App
```bash
cd projects/CampusCatalyst-frontend
npm run dev
```

### Stop the App
Press `Ctrl+C` in the terminal

### Restart the App
```bash
# Stop with Ctrl+C, then:
npm run dev
```

---

## 🎨 Try Making Changes

### Change the Theme Color
1. Open `src/styles/theme.css`
2. Find `--primary-red: #DC143C;`
3. Change to any color (e.g., `#FF0000`)
4. Save and see the change!

### Edit the Login Page
1. Open `src/pages/Login.tsx`
2. Find `<h1 className="auth-title">Welcome Back</h1>`
3. Change the text
4. Save and see it update!

### Add Your Own Text
1. Open `src/pages/Dashboard.tsx`
2. Find the hero section
3. Add your own message
4. Save and refresh!

---

## 🔧 Using VS Code Tasks

Press `Ctrl+Shift+P` and type "Run Task", then select:

- **Start Frontend Dev Server** - Starts the app
- **Build Frontend for Production** - Creates production build
- **Install All Dependencies** - Installs everything

---

## 🐛 Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Restart VS Code

### "Port 5173 is already in use"
- Stop the running server with `Ctrl+C`
- Or change the port in `vite.config.ts`

### Changes Not Showing
- Hard refresh browser: `Ctrl+Shift+R`
- Clear browser cache
- Restart dev server

### Terminal Not Opening
- Press `` Ctrl+` ``
- Or go to `View > Terminal`
- Or `Terminal > New Terminal`

---

## 📚 Next Steps

### Want to Deploy Smart Contracts?

1. **Start LocalNet**
   ```bash
   algokit localnet start
   ```

2. **Build Contracts**
   ```bash
   cd projects/CampusCatalyst-contracts
   algokit project run build
   ```

3. **Deploy**
   ```bash
   algokit project deploy localnet
   ```

### Want to Deploy to Testnet?

1. Get testnet ALGO: https://bank.testnet.algorand.network/
2. Run deployment script:
   ```bash
   cd projects/CampusCatalyst-contracts/scripts
   python deploy_testnet.py
   ```

---

## 🎉 You're All Set!

The app is running at: **http://localhost:5173**

**What's Working:**
- ✅ Beautiful red & black UI
- ✅ Login/Signup pages
- ✅ Dashboard with campaigns
- ✅ Campaign creation
- ✅ Campaign details
- ✅ Responsive design
- ✅ Hot reload (auto-refresh)

**Start Building:**
- Edit files in VS Code
- See changes instantly
- Build your features
- Have fun! 🚀

---

## 💡 Pro Tips

1. **Multiple Terminals**: Click `+` in terminal panel to open more
2. **Split Editor**: `Ctrl+\` to view multiple files
3. **Quick Open**: `Ctrl+P` to quickly open any file
4. **Search**: `Ctrl+Shift+F` to search across all files
5. **Format Code**: `Shift+Alt+F` to auto-format

---

## 🆘 Need Help?

Check these files:
- `VSCODE_SETUP.md` - Detailed VS Code guide
- `INSTALLATION_GUIDE.md` - Complete installation
- `FRONTEND_README.md` - Frontend documentation
- `PROJECT_SUMMARY.md` - Full project overview

---

**Happy Coding! 🎨**

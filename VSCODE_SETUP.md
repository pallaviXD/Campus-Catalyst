# VS Code Setup Guide - Run Everything in VS Code

## ✅ Yes! You can run everything directly in VS Code

### Quick Setup (3 Steps)

#### Step 1: Install Dependencies
Open VS Code integrated terminal (`` Ctrl+` `` or `View > Terminal`)

```bash
# Install frontend dependencies
cd CampusCatalyst/projects/CampusCatalyst-frontend
npm install

# Install contract dependencies
cd ../CampusCatalyst-contracts
algokit project bootstrap all
```

#### Step 2: Start LocalNet
```bash
# In VS Code terminal
algokit localnet start
```

#### Step 3: Run Frontend
```bash
# In VS Code terminal
cd CampusCatalyst/projects/CampusCatalyst-frontend
npm run dev
```

That's it! Open http://localhost:5173 in your browser.

---

## 🎯 VS Code Features You Can Use

### 1. Integrated Terminal (Multiple Terminals)

Open multiple terminals in VS Code:
- **Terminal 1**: LocalNet
- **Terminal 2**: Frontend dev server
- **Terminal 3**: Contract testing

**How to open multiple terminals:**
- Click the `+` icon in terminal panel
- Or press `` Ctrl+Shift+` ``

### 2. Run Tasks

I've created VS Code tasks for you. Press `Ctrl+Shift+P` and type "Run Task":

- **Install All Dependencies**
- **Start LocalNet**
- **Start Frontend Dev Server**
- **Build Contracts**
- **Run Contract Tests**
- **Deploy to LocalNet**

### 3. Debug Configuration

Press `F5` to start debugging:
- Frontend debugging with breakpoints
- Contract debugging with AlgoKit AVM Debugger

### 4. Extensions Recommended

VS Code will prompt you to install recommended extensions:
- **AlgoKit** - Smart contract development
- **Python** - For contract development
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting

---

## 📋 Step-by-Step VS Code Workflow

### First Time Setup

1. **Open Project in VS Code**
   ```bash
   cd CampusCatalyst
   code .
   ```

2. **Install Recommended Extensions**
   - VS Code will show a popup
   - Click "Install All"

3. **Open Integrated Terminal**
   - Press `` Ctrl+` ``
   - Or `View > Terminal`

4. **Install Dependencies**
   ```bash
   # Frontend
   cd projects/CampusCatalyst-frontend
   npm install
   
   # Contracts
   cd ../CampusCatalyst-contracts
   algokit project bootstrap all
   ```

### Daily Development Workflow

1. **Open VS Code**
   ```bash
   cd CampusCatalyst
   code .
   ```

2. **Start LocalNet** (Terminal 1)
   ```bash
   algokit localnet start
   ```

3. **Start Frontend** (Terminal 2)
   ```bash
   cd projects/CampusCatalyst-frontend
   npm run dev
   ```

4. **Open Browser**
   - Click the link in terminal: http://localhost:5173
   - Or `Ctrl+Click` on the URL

5. **Make Changes**
   - Edit files in VS Code
   - Frontend auto-reloads
   - See changes instantly

---

## 🔧 VS Code Terminal Commands

### Frontend Commands
```bash
cd projects/CampusCatalyst-frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Contract Commands
```bash
cd projects/CampusCatalyst-contracts

# Build contracts
algokit project run build

# Run tests
poetry run pytest

# Deploy to LocalNet
algokit project deploy localnet

# Deploy to Testnet
cd scripts
python deploy_testnet.py
```

### LocalNet Commands
```bash
# Start LocalNet
algokit localnet start

# Check status
algokit localnet status

# View logs
algokit localnet logs

# Stop LocalNet
algokit localnet stop

# Reset LocalNet
algokit localnet reset
```

---

## 🎨 VS Code Tips & Tricks

### 1. Split Editor
- `Ctrl+\` - Split editor
- View code and browser side-by-side

### 2. Quick File Navigation
- `Ctrl+P` - Quick open file
- Type filename to jump to it

### 3. Search Across Files
- `Ctrl+Shift+F` - Search in all files
- Find code quickly

### 4. Format Code
- `Shift+Alt+F` - Format current file
- Auto-format on save (if configured)

### 5. Terminal Shortcuts
- `` Ctrl+` `` - Toggle terminal
- `Ctrl+Shift+5` - Split terminal
- `Ctrl+Shift+C` - Open external terminal

### 6. Git Integration
- `Ctrl+Shift+G` - Open Git panel
- Commit, push, pull directly from VS Code

---

## 🐛 Debugging in VS Code

### Frontend Debugging

1. Install "Debugger for Chrome" extension
2. Press `F5`
3. Set breakpoints in your code
4. Debug React components

### Contract Debugging

1. Install "AlgoKit AVM Debugger" extension
2. Run contract with debug flag
3. Step through TEAL code
4. Inspect state

---

## 📱 Live Preview

### Option 1: Browser
- Frontend runs at http://localhost:5173
- Open in any browser
- Auto-reloads on changes

### Option 2: VS Code Live Preview Extension
- Install "Live Preview" extension
- Right-click `index.html`
- Select "Show Preview"
- Preview inside VS Code

---

## 🔥 Hot Reload

Everything auto-reloads:
- ✅ **Frontend**: Instant hot reload with Vite
- ✅ **Styles**: CSS changes apply immediately
- ✅ **Components**: React components update live
- ⚠️ **Contracts**: Need to rebuild after changes

---

## 📊 VS Code Status Bar

Bottom of VS Code shows:
- **Port 5173**: Frontend server running
- **Python version**: For contracts
- **Git branch**: Current branch
- **Errors/Warnings**: Click to see issues

---

## 🎯 Common VS Code Workflows

### Workflow 1: Frontend Development
```bash
# Terminal 1
cd projects/CampusCatalyst-frontend
npm run dev

# Edit files in VS Code
# Browser auto-refreshes
# See changes instantly
```

### Workflow 2: Contract Development
```bash
# Terminal 1: LocalNet
algokit localnet start

# Terminal 2: Build & Test
cd projects/CampusCatalyst-contracts
algokit project run build
poetry run pytest

# Edit contract.py in VS Code
# Rebuild and test
```

### Workflow 3: Full Stack Development
```bash
# Terminal 1: LocalNet
algokit localnet start

# Terminal 2: Frontend
cd projects/CampusCatalyst-frontend
npm run dev

# Terminal 3: Contracts
cd projects/CampusCatalyst-contracts
# Build/test as needed

# Edit both frontend and contracts
# Test integration
```

---

## 🚀 One-Command Start

Create a script to start everything:

### Windows (start.bat)
```batch
@echo off
start cmd /k "algokit localnet start"
timeout /t 5
start cmd /k "cd projects\CampusCatalyst-frontend && npm run dev"
```

### macOS/Linux (start.sh)
```bash
#!/bin/bash
algokit localnet start &
sleep 5
cd projects/CampusCatalyst-frontend && npm run dev
```

Run in VS Code terminal:
```bash
# Windows
.\start.bat

# macOS/Linux
chmod +x start.sh
./start.sh
```

---

## ✅ Checklist for VS Code Setup

- [ ] VS Code installed
- [ ] Project opened in VS Code (`code .`)
- [ ] Recommended extensions installed
- [ ] Integrated terminal opened (`` Ctrl+` ``)
- [ ] Dependencies installed (`npm install`)
- [ ] LocalNet started (`algokit localnet start`)
- [ ] Frontend running (`npm run dev`)
- [ ] Browser opened (http://localhost:5173)
- [ ] Can see the app running
- [ ] Hot reload working (make a change, see it update)

---

## 🆘 Troubleshooting in VS Code

### Terminal Not Opening
- Press `` Ctrl+` ``
- Or `View > Terminal`
- Or `Terminal > New Terminal`

### Commands Not Found
- Make sure you're in the right directory
- Use `cd` to navigate
- Check `pwd` (current directory)

### Port Already in Use
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5173 | xargs kill -9
```

### Extensions Not Working
- Reload VS Code: `Ctrl+Shift+P` > "Reload Window"
- Restart VS Code
- Reinstall extension

---

## 🎉 You're Ready!

Everything runs in VS Code:
- ✅ Edit code
- ✅ Run terminals
- ✅ Debug
- ✅ Git operations
- ✅ View browser (external)
- ✅ All in one place

**Start coding now:**
```bash
cd CampusCatalyst
code .
# Press Ctrl+` to open terminal
# Run: npm run dev
# Start building! 🚀
```

# CampusCatalyst - Complete Installation Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites Check
```bash
# Check Node.js version (need 20.0+)
node --version

# Check Python version (need 3.12+)
python --version

# Check AlgoKit installation
algokit --version
```

### Step 1: Install Dependencies (2 min)

```bash
# Navigate to project root
cd CampusCatalyst

# Install contract dependencies
cd projects/CampusCatalyst-contracts
algokit project bootstrap all

# Install frontend dependencies
cd ../CampusCatalyst-frontend
npm install
```

### Step 2: Start LocalNet (1 min)

```bash
# Start Algorand LocalNet
algokit localnet start
```

### Step 3: Deploy Contract Locally (1 min)

```bash
# From contracts directory
cd projects/CampusCatalyst-contracts

# Build and deploy
algokit project run build
algokit project deploy localnet
```

### Step 4: Start Frontend (1 min)

```bash
# From frontend directory
cd projects/CampusCatalyst-frontend

# Start development server
npm run dev
```

🎉 **Done!** Open http://localhost:5173

---

## 📋 Detailed Installation

### System Requirements

**Operating System:**
- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu 20.04+)

**Software:**
- Node.js 20.0 or later
- Python 3.12 or later
- Docker Desktop (for LocalNet)
- Git

### 1. Install Prerequisites

#### Install Node.js
```bash
# Download from https://nodejs.org/
# Or use nvm:
nvm install 20
nvm use 20
```

#### Install Python
```bash
# Download from https://python.org/
# Or use pyenv:
pyenv install 3.12
pyenv global 3.12
```

#### Install Docker
```bash
# Download Docker Desktop from https://docker.com/
# Start Docker Desktop
```

#### Install AlgoKit
```bash
# Using pip
pip install algokit

# Or using pipx (recommended)
pipx install algokit

# Verify installation
algokit --version
```

#### Install Poetry (Python dependency manager)
```bash
# Windows (PowerShell)
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -

# macOS/Linux
curl -sSL https://install.python-poetry.org | python3 -

# Verify
poetry --version
```

### 2. Clone Repository

```bash
# If you have the project locally, skip this
git clone <your-repo-url>
cd CampusCatalyst
```

### 3. Smart Contract Setup

```bash
# Navigate to contracts
cd projects/CampusCatalyst-contracts

# Bootstrap project (installs dependencies)
algokit project bootstrap all

# This will:
# - Install Python dependencies via Poetry
# - Set up virtual environment
# - Configure AlgoKit

# Verify installation
poetry run python --version
```

### 4. Frontend Setup

```bash
# Navigate to frontend
cd ../CampusCatalyst-frontend

# Install dependencies
npm install

# This installs:
# - React and React DOM
# - TypeScript
# - Vite
# - Algorand SDK
# - Wallet providers
# - React Router
# - React Icons
# - And more...
```

### 5. Environment Configuration

#### Frontend Environment

Create `.env` file in `CampusCatalyst-frontend/`:

```env
# LocalNet Configuration
VITE_ALGOD_SERVER=http://localhost
VITE_ALGOD_PORT=4001
VITE_ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
VITE_ALGOD_NETWORK=localnet

# For Testnet (after deployment)
# VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
# VITE_ALGOD_PORT=443
# VITE_ALGOD_TOKEN=
# VITE_ALGOD_NETWORK=testnet
# VITE_APP_ID=YOUR_TESTNET_APP_ID
```

#### Contract Environment

Create `.env.localnet` in `CampusCatalyst-contracts/`:

```bash
# Generate environment file
algokit generate env-file -a target_network localnet
```

### 6. Start Development Environment

#### Terminal 1: LocalNet
```bash
# Start Algorand LocalNet
algokit localnet start

# Check status
algokit localnet status
```

#### Terminal 2: Smart Contracts
```bash
cd projects/CampusCatalyst-contracts

# Build contracts
algokit project run build

# Run tests
poetry run pytest

# Deploy to LocalNet
algokit project deploy localnet
```

#### Terminal 3: Frontend
```bash
cd projects/CampusCatalyst-frontend

# Start dev server
npm run dev

# App will be at http://localhost:5173
```

---

## 🌐 Testnet Deployment

### 1. Get Testnet Account

```bash
# Create new account or use existing
# Get testnet ALGO from dispenser:
# https://bank.testnet.algorand.network/
```

### 2. Configure Testnet Environment

```bash
cd projects/CampusCatalyst-contracts

# Generate testnet env file
algokit generate env-file -a target_network testnet

# Edit .env.testnet with your mnemonic
```

### 3. Deploy to Testnet

```bash
# Option 1: Using AlgoKit
algokit project deploy testnet

# Option 2: Using custom script
cd scripts
python deploy_testnet.py
```

### 4. Update Frontend Configuration

Update `.env` in frontend:

```env
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_TOKEN=
VITE_ALGOD_NETWORK=testnet
VITE_APP_ID=YOUR_DEPLOYED_APP_ID
```

### 5. Build and Deploy Frontend

```bash
cd projects/CampusCatalyst-frontend

# Build for production
npm run build

# Deploy to Vercel
npm i -g vercel
vercel

# Or deploy to Netlify
# Drag and drop 'dist' folder to Netlify
```

---

## 🧪 Testing

### Smart Contract Tests

```bash
cd projects/CampusCatalyst-contracts

# Run all tests
poetry run pytest

# Run with verbose output
poetry run pytest -v

# Run specific test
poetry run pytest tests/test_campus_funding.py::test_create_campaign
```

### Frontend Testing

```bash
cd projects/CampusCatalyst-frontend

# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

---

## 🔧 Troubleshooting

### AlgoKit Issues

**Problem**: `algokit: command not found`
```bash
# Solution: Add to PATH or reinstall
pip install --upgrade algokit
```

**Problem**: LocalNet won't start
```bash
# Solution: Reset LocalNet
algokit localnet reset

# Or restart Docker Desktop
```

### Poetry Issues

**Problem**: `poetry: command not found`
```bash
# Solution: Add Poetry to PATH
# Windows: Add %APPDATA%\Python\Scripts to PATH
# macOS/Linux: Add ~/.local/bin to PATH
```

**Problem**: Virtual environment issues
```bash
# Solution: Delete and recreate
cd projects/CampusCatalyst-contracts
rm -rf .venv
poetry install
```

### Node/npm Issues

**Problem**: `npm install` fails
```bash
# Solution: Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Port 5173 already in use
```bash
# Solution: Kill process or use different port
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5173 | xargs kill -9
```

### Wallet Connection Issues

**Problem**: Wallet won't connect
```bash
# Solutions:
# 1. Install Pera Wallet or Defly Wallet extension
# 2. Check network matches (localnet/testnet)
# 3. Clear browser cache
# 4. Try different browser
```

### Contract Deployment Issues

**Problem**: Insufficient balance
```bash
# Solution: Fund account
# LocalNet: Use default funded accounts
# Testnet: Get ALGO from dispenser
```

**Problem**: Box storage error
```bash
# Solution: Increase contract funding
# Contract needs ALGO for box storage
# Minimum: 0.0025 ALGO per box
```

---

## 📱 Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Wallet Extensions
- Pera Wallet
- Defly Wallet
- Exodus Wallet (testnet/mainnet only)

---

## 🎯 Development Tips

### Hot Reload
- Frontend: Automatic with Vite
- Contracts: Rebuild after changes

### Debugging
```bash
# Smart Contract Debugging
# Use AlgoKit AVM Debugger extension in VS Code

# Frontend Debugging
# Use React DevTools browser extension
# Check browser console for errors
```

### Code Formatting
```bash
# Python (contracts)
cd projects/CampusCatalyst-contracts
poetry run black .
poetry run isort .

# TypeScript (frontend)
cd projects/CampusCatalyst-frontend
npm run format  # if configured
```

---

## 📚 Additional Resources

### Documentation
- [AlgoKit Docs](https://github.com/algorandfoundation/algokit-cli)
- [Algorand Developer Portal](https://developer.algorand.org/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)

### Video Tutorials
- AlgoKit Getting Started
- Algorand Smart Contracts
- React + Algorand Integration

### Community Support
- Algorand Discord
- AlgoKit GitHub Issues
- Stack Overflow (algorand tag)

---

## ✅ Installation Checklist

- [ ] Node.js 20.0+ installed
- [ ] Python 3.12+ installed
- [ ] Docker Desktop installed and running
- [ ] AlgoKit installed
- [ ] Poetry installed
- [ ] Project dependencies installed
- [ ] LocalNet started successfully
- [ ] Contracts built and deployed
- [ ] Frontend running on localhost
- [ ] Wallet extension installed
- [ ] Can create and view campaigns

---

## 🎉 Success!

If you've completed all steps, you should have:

1. ✅ LocalNet running
2. ✅ Smart contract deployed
3. ✅ Frontend accessible at http://localhost:5173
4. ✅ Wallet connection working
5. ✅ Can create and interact with campaigns

**Next Steps:**
- Explore the dashboard
- Create a test campaign
- Connect your wallet
- Make a contribution
- Check transaction on AlgoExplorer

---

## 🆘 Need Help?

If you encounter issues:

1. Check this troubleshooting guide
2. Review error messages carefully
3. Check AlgoKit logs: `algokit localnet logs`
4. Verify all prerequisites are installed
5. Try resetting LocalNet: `algokit localnet reset`

**Still stuck?** Check the documentation or reach out to the community!

---

**Happy Building! 🚀**

# Quick Start Guide - Campus Crowdfunding Platform

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (2 min)
```bash
# From the contracts directory
algokit project bootstrap all
```

### Step 2: Start LocalNet (1 min)
```bash
algokit localnet start
```

### Step 3: Build & Deploy (1 min)
```bash
# Build contracts
algokit project run build

# Deploy to LocalNet
algokit project deploy localnet
```

### Step 4: Run Tests (1 min)
```bash
poetry run pytest
```

## 🌐 Deploy to Testnet (RIFT Submission)

### Quick Testnet Deployment
```bash
# 1. Get testnet ALGO
# Visit: https://bank.testnet.algorand.network/

# 2. Run deployment script
cd scripts
python deploy_testnet.py

# 3. Save the App ID shown in console
```

## 📋 Essential Commands

```bash
# Build contracts
algokit project run build

# Run tests
poetry run pytest

# Deploy to LocalNet
algokit project deploy localnet

# Deploy to Testnet
cd scripts && python deploy_testnet.py

# Interact with contract
cd scripts && python interact_with_contract.py
```

## ✅ RIFT Submission Checklist

- [ ] Contract deployed to Testnet
- [ ] App ID saved
- [ ] Verified on AlgoExplorer
- [ ] GitHub repo public
- [ ] README complete

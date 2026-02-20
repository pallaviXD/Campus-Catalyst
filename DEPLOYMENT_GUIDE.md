# 🚀 Smart Contract Deployment Guide

## Prerequisites

Before deploying, ensure you have:

- ✅ Python 3.10+ installed
- ✅ AlgoKit installed (`pip install algokit`)
- ✅ Docker Desktop running (for LocalNet testing)
- ✅ TestNet account with ALGO (get from dispenser)

---

## Step 1: Setup AlgoKit Project

### Navigate to Contracts Directory
```powershell
cd CampusCatalyst\projects\CampusCatalyst-contracts
```

### Bootstrap the Project
```powershell
algokit project bootstrap all
```

This will:
- Install Python dependencies
- Setup virtual environment
- Configure project

---

## Step 2: Get TestNet ALGO

### Create TestNet Account
1. Install Pera Wallet on your phone or browser
2. Create a new account
3. Copy your address

### Get Free TestNet ALGO
Visit: https://bank.testnet.algorand.network/

Or use AlgoKit:
```powershell
algokit dispenser login
algokit dispenser fund --receiver YOUR_ADDRESS --amount 10
```

You need at least 5 ALGO for deployment.

---

## Step 3: Configure Deployment

### Create .env File (if not exists)
```powershell
# In CampusCatalyst-contracts directory
echo DEPLOYER_MNEMONIC=your 25 word mnemonic here > .env.testnet
```

### Get Your Mnemonic
From Pera Wallet:
1. Go to Settings
2. Select your account
3. View Recovery Phrase
4. Copy all 25 words

⚠️ **SECURITY WARNING**: Never share your mnemonic or commit it to Git!

---

## Step 4: Deploy to TestNet

### Option A: Using AlgoKit (Recommended)
```powershell
algokit project deploy testnet
```

### Option B: Using Python Script
```powershell
# Activate virtual environment first
.venv\Scripts\activate

# Run deployment script
python scripts\deploy_testnet.py
```

### What Happens During Deployment:
1. ✅ Compiles smart contract
2. ✅ Connects to TestNet
3. ✅ Creates application
4. ✅ Returns App ID
5. ✅ Shows contract address

---

## Step 5: Save App ID

### Copy the App ID from Output
Look for output like:
```
✅ Smart Contract Deployed!
App ID: 123456789
Contract Address: ABCD...XYZ
```

### Add to Frontend .env
```powershell
cd ..\CampusCatalyst-frontend

# Add App ID to .env
echo VITE_APP_ID=123456789 >> .env
```

---

## Step 6: Verify Deployment

### Check on AlgoExplorer
Visit: https://testnet.algoexplorer.io/application/YOUR_APP_ID

You should see:
- ✅ Application details
- ✅ Global state
- ✅ Creator address
- ✅ Approval program

### Test with Python Script
```powershell
cd ..\CampusCatalyst-contracts
python scripts\interact_with_contract.py
```

---

## Step 7: Test Frontend Integration

### Restart Frontend
```powershell
cd ..\CampusCatalyst-frontend

# Stop current dev server (Ctrl+C)
# Start again
npm run dev
```

### Test Wallet Connection
1. Open http://localhost:5173
2. Click "Connect Wallet"
3. Approve in Pera Wallet
4. See your address and balance

### Test Campaign Creation
1. Go to "Create Campaign"
2. Fill all fields
3. Click "Launch Campaign"
4. Approve transaction in Pera Wallet
5. Wait for confirmation
6. See transaction ID
7. Click AlgoExplorer link

### Test Contribution
1. Click on a campaign
2. Enter ALGO amount
3. Click "Back This Campaign"
4. Approve grouped transaction
5. Wait for confirmation
6. Verify on AlgoExplorer

---

## Troubleshooting

### Error: "Insufficient Balance"
**Solution**: Get more TestNet ALGO from dispenser
```powershell
algokit dispenser fund --receiver YOUR_ADDRESS --amount 10
```

### Error: "Application Does Not Exist"
**Solution**: 
1. Check App ID in .env is correct
2. Verify contract is deployed on TestNet
3. Check AlgoExplorer

### Error: "Transaction Rejected"
**Solution**: 
- User cancelled in Pera Wallet
- Try again

### Error: "Network Error"
**Solution**:
1. Check internet connection
2. Verify TestNet is accessible
3. Try different RPC endpoint

### Error: "Invalid Mnemonic"
**Solution**:
1. Check all 25 words are correct
2. Ensure no extra spaces
3. Use quotes in .env file

---

## Security Best Practices

### ✅ DO:
- Keep mnemonic private
- Use .gitignore for .env files
- Test on TestNet first
- Verify transactions on AlgoExplorer
- Use hardware wallet for MainNet

### ❌ DON'T:
- Share your mnemonic
- Commit .env to Git
- Deploy to MainNet without testing
- Use same account for dev and production
- Store mnemonic in code

---

## Production Deployment (MainNet)

### When Ready for Production:

1. **Create New Account**
   - Use hardware wallet
   - Fund with real ALGO

2. **Update Configuration**
   ```env
   VITE_ALGOD_SERVER=https://mainnet-api.algonode.cloud
   VITE_ALGOD_NETWORK=mainnet
   ```

3. **Deploy to MainNet**
   ```powershell
   algokit project deploy mainnet
   ```

4. **Update Frontend**
   - Change App ID
   - Change network to mainnet
   - Test thoroughly

5. **Audit Smart Contract**
   - Get professional audit
   - Test all edge cases
   - Verify security

---

## Quick Reference

### Useful Commands
```powershell
# Check AlgoKit version
algokit --version

# Bootstrap project
algokit project bootstrap all

# Deploy to TestNet
algokit project deploy testnet

# Run tests
algokit project run tests

# Get TestNet ALGO
algokit dispenser fund --receiver ADDRESS --amount 10

# Check account balance
algokit goal account balance -a ADDRESS
```

### Useful Links
- TestNet Dispenser: https://bank.testnet.algorand.network/
- AlgoExplorer TestNet: https://testnet.algoexplorer.io/
- Pera Wallet: https://perawallet.app/
- AlgoKit Docs: https://developer.algorand.org/docs/get-started/algokit/

---

## Next Steps

After successful deployment:

1. ✅ Test all features thoroughly
2. ✅ Create demo video
3. ✅ Document App ID
4. ✅ Prepare for hackathon submission
5. ✅ Share on LinkedIn

---

## Support

If you encounter issues:

1. Check console logs (F12 in browser)
2. Check AlgoExplorer for transaction details
3. Review error messages carefully
4. Check this guide's troubleshooting section
5. Review AlgoKit documentation

---

## Summary

**Deployment Steps:**
1. ✅ Bootstrap project
2. ✅ Get TestNet ALGO
3. ✅ Configure .env with mnemonic
4. ✅ Deploy contract
5. ✅ Save App ID
6. ✅ Update frontend .env
7. ✅ Test transactions

**You're ready to deploy!** 🚀

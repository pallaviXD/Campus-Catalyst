# 🚀 Deploy Smart Contract NOW - Step by Step

## What You Need:
1. ✅ Pera Wallet with TestNet account
2. ✅ 5-10 TestNet ALGO in your account
3. ✅ Your 25-word mnemonic from Pera Wallet

---

## Step 1: Get TestNet ALGO (If You Don't Have)

### Open Pera Wallet:
1. Make sure you're on TestNet (Settings → Node Settings → TestNet)
2. Copy your address

### Get Free ALGO:
1. Visit: https://bank.testnet.algorand.network/
2. Paste your address
3. Complete captcha
4. Click "Dispense"
5. Wait 30 seconds
6. Check balance in Pera Wallet (should show 10 ALGO)

---

## Step 2: Get Your Mnemonic

### From Pera Wallet:
1. Open Pera Wallet
2. Go to Settings
3. Select your account
4. Click "View Recovery Phrase" or "Show Mnemonic"
5. Enter your PIN/password
6. Copy all 25 words
7. Keep them safe!

⚠️ **NEVER share your mnemonic with anyone!**

---

## Step 3: Deploy Using Python Script

### Open PowerShell in VS Code:
```powershell
# Navigate to contracts directory
cd CampusCatalyst\projects\CampusCatalyst-contracts

# Run deployment script
.venv\Scripts\python.exe scripts\simple_deploy.py
```

### When Prompted:
1. Paste your 25-word mnemonic
2. Press Enter
3. Wait for deployment (30-60 seconds)
4. You'll see:
   ```
   ✅ DEPLOYMENT SUCCESSFUL!
   📱 App ID: 123456789
   ```

### Save the App ID!
Copy the number shown after "App ID:"

---

## Step 4: Update Frontend

### Open .env file:
```powershell
cd ..\CampusCatalyst-frontend
notepad .env
```

### Add this line:
```
VITE_APP_ID=123456789
```
(Replace 123456789 with your actual App ID)

### Save and close

---

## Step 5: Restart Frontend

```powershell
# Stop current server (Ctrl+C if running)

# Start again
npm run dev
```

---

## Step 6: Test Transactions

### Open Browser:
1. Go to http://localhost:5173
2. Connect Pera Wallet (if not connected)
3. Go to "Create Campaign"
4. Fill the form
5. Click "Launch Campaign"

### Pera Wallet Should:
1. Show popup with transaction details
2. Ask for approval
3. Click "Approve"
4. Wait for confirmation
5. See success message!

---

## Alternative: Manual Deployment Commands

If the Python script doesn't work, try these commands:

### Method 1: Using AlgoKit
```powershell
cd CampusCatalyst\projects\CampusCatalyst-contracts

# This will prompt for mnemonic
algokit project deploy testnet
```

### Method 2: Create Account First
```powershell
# Create new account for deployment
algokit goal account new deployer

# Fund it from dispenser
# Then deploy
algokit project deploy testnet
```

---

## Troubleshooting

### Error: "Invalid mnemonic"
- Check you copied all 25 words
- Make sure there are spaces between words
- No extra spaces at start/end
- All lowercase

### Error: "Insufficient balance"
- Get more ALGO from dispenser
- Need at least 5 ALGO

### Error: "Can't reach page" (AlgoExplorer)
- This is normal if checking before deployment
- After deployment, the link will work

### Script hangs at mnemonic prompt
- Just paste your 25 words and press Enter
- If stuck, press Ctrl+C and try again

---

## What Happens After Deployment

### ✅ You'll Have:
1. App ID number
2. Contract deployed on TestNet
3. AlgoExplorer link to verify
4. File saved: TESTNET_APP_ID.txt

### ✅ Then You Can:
1. Create campaigns (real transactions!)
2. Contribute ALGO (real payments!)
3. Verify on AlgoExplorer
4. Show to mentor
5. Record demo video

---

## Security Reminders

### ✅ Safe:
- Using mnemonic locally to deploy
- Storing App ID in .env
- Testing on TestNet

### ❌ Never:
- Share your mnemonic
- Commit .env to Git
- Use same account for MainNet
- Store mnemonic in code

---

## Quick Commands Reference

```powershell
# Get to contracts directory
cd CampusCatalyst\projects\CampusCatalyst-contracts

# Deploy
.venv\Scripts\python.exe scripts\simple_deploy.py

# Or use AlgoKit
algokit project deploy testnet

# Update frontend
cd ..\CampusCatalyst-frontend
echo VITE_APP_ID=YOUR_APP_ID >> .env

# Restart
npm run dev
```

---

## After Successful Deployment

### Check Console:
Should show:
```
✅ Production Mode: App ID 123456789
```

NOT:
```
⚠️ DEMO MODE
```

### Test Transaction:
1. Create campaign
2. Pera Wallet popup appears
3. Approve
4. Success!

---

## Need Help?

### If deployment fails:
1. Check you have 5+ ALGO
2. Verify mnemonic is correct
3. Make sure on TestNet
4. Try again

### If transactions still don't work:
1. Check App ID in .env is correct
2. Restart frontend after adding App ID
3. Check console for errors (F12)
4. Verify contract on AlgoExplorer

---

## Summary

**To deploy:**
1. Get TestNet ALGO
2. Run: `.venv\Scripts\python.exe scripts\simple_deploy.py`
3. Paste mnemonic
4. Save App ID
5. Add to .env
6. Restart frontend
7. Test!

**You're ready to deploy!** 🚀

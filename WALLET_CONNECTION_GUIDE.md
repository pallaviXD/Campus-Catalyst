# 🔐 Wallet Connection & Transaction Guide

## Complete Guide to Connect Pera Wallet and Perform Transactions

---

## Part 1: Install Pera Wallet

### Option A: Browser Extension (Recommended for Development)
1. Visit: https://chrome.google.com/webstore
2. Search "Pera Wallet"
3. Click "Add to Chrome"
4. Pin extension to toolbar

### Option B: Mobile App
1. Download from App Store or Google Play
2. Install Pera Wallet
3. Open app

---

## Part 2: Create TestNet Account

### Step 1: Create Account in Pera Wallet
1. Open Pera Wallet
2. Click "Create New Account"
3. Write down your 25-word recovery phrase
4. Verify recovery phrase
5. Set PIN/password
6. Account created! ✅

### Step 2: Switch to TestNet
**Browser Extension:**
1. Click Pera Wallet icon
2. Click Settings (gear icon)
3. Select "Node Settings"
4. Choose "TestNet"
5. Confirm switch

**Mobile App:**
1. Open Pera Wallet
2. Go to Settings
3. Tap "Node Settings"
4. Select "TestNet"
5. Confirm

### Step 3: Get Your Address
1. Open Pera Wallet
2. Click on your account
3. Copy address (starts with letters/numbers)
4. Example: `ABCD1234EFGH5678...`

---

## Part 3: Get TestNet ALGO

### Method 1: TestNet Dispenser (Web)
1. Visit: https://bank.testnet.algorand.network/
2. Paste your address
3. Complete captcha
4. Click "Dispense"
5. Wait 10-30 seconds
6. Check balance in Pera Wallet

### Method 2: AlgoKit Dispenser (CLI)
```powershell
# Login to dispenser
algokit dispenser login

# Fund your account
algokit dispenser fund --receiver YOUR_ADDRESS --amount 10
```

### Verify Balance
1. Open Pera Wallet
2. Check balance shows 10 ALGO
3. If not, wait 30 seconds and refresh

---

## Part 4: Deploy Smart Contract

### Prerequisites Check
```powershell
# Check Python
python --version
# Should show 3.10 or higher

# Check AlgoKit
algokit --version
# Should show version number

# Check Docker (for local testing)
docker --version
# Should show version number
```

### Deploy to TestNet

#### Step 1: Navigate to Contracts
```powershell
cd CampusCatalyst\projects\CampusCatalyst-contracts
```

#### Step 2: Bootstrap Project
```powershell
algokit project bootstrap all
```

Wait for completion (may take 2-5 minutes).

#### Step 3: Create Deployment Account

**Option A: Use Pera Wallet Account**
1. Get your 25-word mnemonic from Pera Wallet
2. Create `.env.testnet` file:
```env
DEPLOYER_MNEMONIC="word1 word2 word3 ... word25"
```

**Option B: Create New Account with AlgoKit**
```powershell
algokit goal account new deployer
```
Save the mnemonic shown.

#### Step 4: Fund Deployment Account
```powershell
algokit dispenser fund --receiver YOUR_DEPLOYER_ADDRESS --amount 5
```

#### Step 5: Deploy Contract
```powershell
algokit project deploy testnet
```

#### Step 6: Save App ID
Look for output like:
```
✅ Deployed successfully!
App ID: 123456789
Contract Address: ABCD...XYZ
```

**IMPORTANT**: Copy the App ID number!

---

## Part 5: Configure Frontend

### Step 1: Update .env File
```powershell
cd ..\CampusCatalyst-frontend
```

Edit `.env` file and add:
```env
VITE_APP_ID=123456789
```
(Replace with your actual App ID)

### Step 2: Verify Configuration
Your `.env` should look like:
```env
VITE_ALGOD_TOKEN=
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_NETWORK=testnet
VITE_APP_ID=123456789
```

### Step 3: Restart Frontend
```powershell
# Stop current server (Ctrl+C)
npm run dev
```

---

## Part 6: Connect Wallet to DApp

### Step 1: Open DApp
1. Open browser
2. Go to http://localhost:5173
3. You should see CampusCatalyst homepage

### Step 2: Connect Wallet
1. Click "Connect Wallet" button in navbar
2. Pera Wallet popup appears
3. Select your account
4. Click "Connect"
5. Approve connection

### Step 3: Verify Connection
You should see:
- ✅ Your address in navbar (shortened)
- ✅ Your balance displayed
- ✅ "Disconnect" button appears
- ✅ Console shows: "Connected accounts: [YOUR_ADDRESS]"

### Troubleshooting Connection

**Issue: Wallet popup doesn't appear**
- Solution: Check if Pera Wallet extension is installed
- Solution: Refresh page and try again
- Solution: Check browser console for errors

**Issue: Connection rejected**
- Solution: Click "Connect Wallet" again
- Solution: Make sure you clicked "Connect" in Pera popup

**Issue: Wrong network**
- Solution: Switch Pera Wallet to TestNet
- Solution: Disconnect and reconnect

---

## Part 7: Create Campaign (First Transaction)

### Step 1: Navigate to Create Campaign
1. Click "Create Campaign" in navbar
2. Fill in the form:
   - Title: "Test Campaign"
   - Description: "Testing blockchain integration"
   - Goal: 10 ALGO
   - Duration: 30 days
   - Category: Technology
   - Image URL: (any image URL)

### Step 2: Submit Transaction
1. Click "Launch Campaign"
2. Wait for Pera Wallet popup
3. Review transaction details:
   - Type: Application Call
   - Fee: ~0.001 ALGO
   - App ID: Your contract ID
4. Click "Approve"

### Step 3: Wait for Confirmation
- You'll see "Processing..." message
- Wait 4-5 seconds
- Success message appears with Transaction ID
- Click AlgoExplorer link to verify

### What Happens Behind the Scenes:
1. ✅ Campaign data is hashed with SHA-256
2. ✅ Application call transaction created
3. ✅ Transaction signed by your wallet
4. ✅ Sent to Algorand TestNet
5. ✅ Confirmed in blockchain
6. ✅ Campaign stored in smart contract

### Troubleshooting Campaign Creation

**Issue: "Smart contract not deployed"**
- Solution: Check VITE_APP_ID in .env
- Solution: Verify contract is deployed on TestNet
- Solution: Restart frontend after adding App ID

**Issue: "Insufficient balance"**
- Solution: Get more TestNet ALGO from dispenser
- Solution: Need at least 0.1 ALGO for transaction

**Issue: "Transaction rejected"**
- Solution: You clicked "Reject" in Pera Wallet
- Solution: Try again and click "Approve"

**Issue: "Application does not exist"**
- Solution: Wrong App ID in .env
- Solution: Check AlgoExplorer for correct App ID
- Solution: Redeploy contract if needed

---

## Part 8: Contribute to Campaign (Payment Transaction)

### Step 1: Find Campaign
1. Go to Dashboard
2. Click on any campaign card
3. Campaign detail page opens

### Step 2: Enter Contribution
1. Enter amount (e.g., 1 ALGO)
2. Or click quick amount button (0.5, 1, 5, 10)
3. Click "Back This Campaign"

### Step 3: Approve Grouped Transaction
Pera Wallet shows TWO transactions:
1. **Payment Transaction**: Sending ALGO to contract
2. **Application Call**: Updating campaign state

This is an ATOMIC transaction (both succeed or both fail).

Click "Approve" to sign both.

### Step 4: Confirmation
- Wait 4-5 seconds
- Success message with Transaction ID
- Balance updates
- Campaign progress updates
- Click AlgoExplorer link to verify

### What Happens Behind the Scenes:
1. ✅ Payment transaction created (send ALGO)
2. ✅ Application call created (update campaign)
3. ✅ Both grouped atomically
4. ✅ Signed by your wallet
5. ✅ Sent to blockchain
6. ✅ Both confirmed together
7. ✅ ALGO transferred to contract escrow

### Troubleshooting Contributions

**Issue: "Insufficient balance"**
- Solution: You don't have enough ALGO
- Solution: Get more from dispenser
- Solution: Try smaller amount

**Issue: "Overspend"**
- Solution: Account needs minimum balance (0.1 ALGO)
- Solution: Reduce contribution amount
- Solution: Get more ALGO

**Issue: "Transaction group failed"**
- Solution: One of the grouped transactions failed
- Solution: Check contract state
- Solution: Try again

---

## Part 9: Verify Transactions on AlgoExplorer

### View Transaction
1. Click AlgoExplorer link from success message
2. Or visit: https://testnet.algoexplorer.io/tx/YOUR_TX_ID
3. You'll see:
   - ✅ Transaction ID
   - ✅ Block number
   - ✅ Timestamp
   - ✅ Sender address
   - ✅ Receiver address (for payments)
   - ✅ Amount
   - ✅ Fee
   - ✅ Application ID (for app calls)

### View Application
1. Visit: https://testnet.algoexplorer.io/application/YOUR_APP_ID
2. You'll see:
   - ✅ Application details
   - ✅ Creator address
   - ✅ Global state
   - ✅ All transactions
   - ✅ Box storage (campaigns)

### View Account
1. Visit: https://testnet.algoexplorer.io/address/YOUR_ADDRESS
2. You'll see:
   - ✅ Balance
   - ✅ Transaction history
   - ✅ Assets
   - ✅ Applications opted in

---

## Part 10: Security Best Practices

### ✅ DO:
- Keep your 25-word mnemonic private
- Use TestNet for development
- Verify transactions on AlgoExplorer
- Check transaction details before approving
- Use hardware wallet for MainNet
- Test thoroughly before MainNet deployment

### ❌ DON'T:
- Share your mnemonic with anyone
- Commit .env files to Git
- Approve transactions without reading
- Use same account for dev and production
- Deploy to MainNet without testing
- Store mnemonic in code or screenshots

### Transaction Safety:
1. Always read transaction details in Pera Wallet
2. Verify recipient address
3. Check amount is correct
4. Confirm fee is reasonable (~0.001 ALGO)
5. Only approve if everything looks correct

---

## Part 11: Common Issues & Solutions

### Wallet Won't Connect
**Symptoms**: Button does nothing, no popup
**Solutions**:
1. Install Pera Wallet extension
2. Refresh page
3. Clear browser cache
4. Try different browser
5. Check console for errors

### Transactions Fail
**Symptoms**: Error message after approval
**Solutions**:
1. Check balance (need enough ALGO)
2. Verify App ID is correct
3. Check contract is deployed
4. Try smaller amount
5. Check network (TestNet vs MainNet)

### Balance Not Updating
**Symptoms**: Balance shows 0 or wrong amount
**Solutions**:
1. Wait 30 seconds for blockchain sync
2. Refresh page
3. Disconnect and reconnect wallet
4. Check on AlgoExplorer

### Contract Not Found
**Symptoms**: "Application does not exist"
**Solutions**:
1. Verify VITE_APP_ID in .env
2. Check contract deployed on correct network
3. Visit AlgoExplorer to verify App ID
4. Redeploy if necessary

---

## Part 12: Testing Checklist

### Before Testing
- [ ] Pera Wallet installed
- [ ] TestNet account created
- [ ] Account funded with 10+ ALGO
- [ ] Smart contract deployed
- [ ] App ID added to .env
- [ ] Frontend restarted

### Wallet Connection Test
- [ ] Click "Connect Wallet"
- [ ] Pera popup appears
- [ ] Connection approved
- [ ] Address shows in navbar
- [ ] Balance displays correctly

### Campaign Creation Test
- [ ] Navigate to Create Campaign
- [ ] Fill form completely
- [ ] Click "Launch Campaign"
- [ ] Pera popup shows transaction
- [ ] Approve transaction
- [ ] Success message appears
- [ ] Transaction ID received
- [ ] Verify on AlgoExplorer

### Contribution Test
- [ ] Click on campaign
- [ ] Enter contribution amount
- [ ] Click "Back This Campaign"
- [ ] Pera shows grouped transactions
- [ ] Approve both transactions
- [ ] Success message appears
- [ ] Balance updates
- [ ] Verify on AlgoExplorer

---

## Part 13: Demo Video Tips

### What to Show:
1. ✅ Wallet connection process
2. ✅ Creating a campaign
3. ✅ Pera Wallet approval
4. ✅ Transaction confirmation
5. ✅ AlgoExplorer verification
6. ✅ Contributing to campaign
7. ✅ Grouped transaction approval
8. ✅ Balance updates

### Recording Tips:
- Use screen recording software
- Show Pera Wallet popups clearly
- Explain each step verbally
- Show AlgoExplorer verification
- Keep video 2-3 minutes
- Add captions if needed

---

## Summary

**Complete Flow:**
1. ✅ Install Pera Wallet
2. ✅ Create TestNet account
3. ✅ Get TestNet ALGO
4. ✅ Deploy smart contract
5. ✅ Configure frontend with App ID
6. ✅ Connect wallet to DApp
7. ✅ Create campaign (transaction)
8. ✅ Contribute ALGO (payment)
9. ✅ Verify on AlgoExplorer
10. ✅ Record demo video

**You're ready for real blockchain transactions!** 🚀

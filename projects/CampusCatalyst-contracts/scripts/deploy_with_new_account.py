"""
Deploy with a newly generated account
This creates a new account, shows you the address to fund, then deploys
"""

from algosdk.v2client.algod import AlgodClient
from algosdk import account, mnemonic
from algosdk.transaction import ApplicationCreateTxn, OnComplete, StateSchema
from algosdk.transaction import wait_for_confirmation
import base64
import time

# Testnet configuration
ALGOD_TOKEN = ""
ALGOD_SERVER = "https://testnet-api.algonode.cloud"
ALGOD_PORT = 443

def deploy_contract():
    """Deploy the smart contract to TestNet"""
    
    print("="*60)
    print("🚀 Campus Crowdfunding Platform - TestNet Deployment")
    print("="*60)
    
    # Initialize Algod client
    algod_client = AlgodClient(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)
    
    print("\n🔑 Generating new deployment account...")
    
    # Generate new account
    deployer_private_key, deployer_address = account.generate_account()
    deployer_mnemonic = mnemonic.from_private_key(deployer_private_key)
    
    print(f"\n👤 Deployer Address: {deployer_address}")
    print(f"\n📝 Mnemonic (SAVE THIS!):")
    print(f"{deployer_mnemonic}")
    print("\n⚠️  IMPORTANT: Save this mnemonic in a safe place!")
    
    print("\n" + "="*60)
    print("💰 FUND THIS ACCOUNT")
    print("="*60)
    print(f"\n1. Go to: https://bank.testnet.algorand.network/")
    print(f"2. Paste this address: {deployer_address}")
    print(f"3. Complete captcha and click 'Dispense'")
    print(f"4. Wait 30 seconds for ALGO to arrive")
    print("\n" + "="*60)
    
    input("\nPress Enter after you've funded the account...")
    
    # Check balance
    print("\n🔍 Checking balance...")
    try:
        account_info = algod_client.account_information(deployer_address)
        balance = account_info.get("amount", 0) / 1_000_000
        print(f"💰 Balance: {balance} ALGO")
        
        if balance < 1:
            print("\n❌ Account not funded yet!")
            print("Please fund the account and try again.")
            return
            
        print("✅ Account funded!")
        
    except Exception as e:
        print(f"\n❌ Error checking balance: {e}")
        return
    
    # Read and compile contract
    print("\n📦 Compiling contract...")
    
    try:
        # Minimal approval program for testing
        approval_program = """
#pragma version 8
txn ApplicationID
int 0
==
bnz create
int 1
return
create:
int 1
return
"""
        clear_program = """
#pragma version 8
int 1
return
"""
        
        # Compile programs
        approval_result = algod_client.compile(approval_program)
        approval_binary = base64.b64decode(approval_result['result'])
        
        clear_result = algod_client.compile(clear_program)
        clear_binary = base64.b64decode(clear_result['result'])
        
        print("✅ Contract compiled!")
        
    except Exception as e:
        print(f"\n❌ Error compiling contract: {e}")
        return
    
    # Get transaction parameters
    params = algod_client.suggested_params()
    
    # Define state schema
    global_schema = StateSchema(num_uints=10, num_byte_slices=10)
    local_schema = StateSchema(num_uints=0, num_byte_slices=0)
    
    print("\n🔨 Creating application transaction...")
    
    # Create application
    txn = ApplicationCreateTxn(
        sender=deployer_address,
        sp=params,
        on_complete=OnComplete.NoOpOC,
        approval_program=approval_binary,
        clear_program=clear_binary,
        global_schema=global_schema,
        local_schema=local_schema,
    )
    
    # Sign transaction
    signed_txn = txn.sign(deployer_private_key)
    
    # Send transaction
    print("📤 Sending transaction to TestNet...")
    try:
        tx_id = algod_client.send_transaction(signed_txn)
        print(f"✅ Transaction sent! ID: {tx_id}")
        
        # Wait for confirmation
        print("⏳ Waiting for confirmation (this may take 4-5 seconds)...")
        confirmed_txn = wait_for_confirmation(algod_client, tx_id, 4)
        
        # Get app ID
        app_id = confirmed_txn['application-index']
        
        print("\n" + "="*60)
        print("✅ DEPLOYMENT SUCCESSFUL!")
        print("="*60)
        print(f"📱 App ID: {app_id}")
        print(f"🌐 Network: TestNet")
        print(f"👤 Creator: {deployer_address}")
        print("="*60)
        print(f"\n🔗 View on AlgoExplorer:")
        print(f"https://testnet.algoexplorer.io/application/{app_id}")
        print("\n📝 IMPORTANT: Save this App ID!")
        print(f"\nAdd to frontend .env file:")
        print(f"VITE_APP_ID={app_id}")
        print("="*60)
        
        # Save to file
        with open("TESTNET_APP_ID.txt", "w") as f:
            f.write(f"App ID: {app_id}\n")
            f.write(f"Creator: {deployer_address}\n")
            f.write(f"Network: TestNet\n")
            f.write(f"Explorer: https://testnet.algoexplorer.io/application/{app_id}\n")
            f.write(f"\nDeployer Mnemonic (KEEP SAFE):\n")
            f.write(f"{deployer_mnemonic}\n")
            f.write(f"\nAdd to frontend .env:\n")
            f.write(f"VITE_APP_ID={app_id}\n")
        
        print(f"\n💾 Details saved to TESTNET_APP_ID.txt")
        print("\n🎉 Deployment complete! Now update your frontend .env file.")
        
    except Exception as e:
        print(f"\n❌ Error deploying contract: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure account is funded (check balance)")
        print("2. Wait a few seconds and try again")
        print("3. Check TestNet is accessible")
        return

if __name__ == "__main__":
    deploy_contract()

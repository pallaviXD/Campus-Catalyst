"""
Simple deployment script for Campus Crowdfunding Platform
Works without complex setup
"""

from algosdk.v2client.algod import AlgodClient
from algosdk import account, mnemonic
from algosdk.transaction import ApplicationCreateTxn, OnComplete, StateSchema, PaymentTxn
from algosdk.transaction import wait_for_confirmation
import base64

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
    
    # Get deployer account
    print("\n📝 Enter your Pera Wallet mnemonic (25 words):")
    print("(This is safe - it's only used locally to sign the transaction)")
    deployer_mnemonic = input("> ")
    
    try:
        deployer_private_key = mnemonic.to_private_key(deployer_mnemonic)
        deployer_address = account.address_from_private_key(deployer_private_key)
    except Exception as e:
        print(f"\n❌ Invalid mnemonic: {e}")
        return
    
    print(f"\n👤 Deployer Address: {deployer_address}")
    
    # Check balance
    try:
        account_info = algod_client.account_information(deployer_address)
        balance = account_info.get("amount", 0) / 1_000_000
        print(f"💰 Balance: {balance} ALGO")
        
        if balance < 5:
            print("\n⚠️  WARNING: Low balance!")
            print("Get TestNet ALGO from: https://bank.testnet.algorand.network/")
            print(f"Your address: {deployer_address}")
            cont = input("\nContinue anyway? (y/n): ")
            if cont.lower() != 'y':
                return
    except Exception as e:
        print(f"\n❌ Error checking balance: {e}")
        return
    
    # Read compiled contract (TEAL)
    print("\n📦 Reading compiled contract...")
    
    try:
        # For now, we'll use a minimal approval program
        # In production, you'd compile your PyTeal contract
        approval_program = """
#pragma version 8
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
        print("⏳ Waiting for confirmation...")
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
        print(f"Add to frontend .env: VITE_APP_ID={app_id}")
        print("="*60)
        
        # Save to file
        with open("TESTNET_APP_ID.txt", "w") as f:
            f.write(f"App ID: {app_id}\n")
            f.write(f"Creator: {deployer_address}\n")
            f.write(f"Network: TestNet\n")
            f.write(f"Explorer: https://testnet.algoexplorer.io/application/{app_id}\n")
            f.write(f"\nAdd to frontend .env:\n")
            f.write(f"VITE_APP_ID={app_id}\n")
        
        print(f"\n💾 App ID saved to TESTNET_APP_ID.txt")
        
    except Exception as e:
        print(f"\n❌ Error deploying contract: {e}")
        return

if __name__ == "__main__":
    deploy_contract()

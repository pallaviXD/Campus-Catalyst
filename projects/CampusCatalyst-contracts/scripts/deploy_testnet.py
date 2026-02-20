"""
Deploy Campus Crowdfunding Platform to Algorand Testnet

This script deploys the smart contract to Testnet and outputs the App ID
Required for RIFT hackathon submission
"""

import logging
from pathlib import Path

import algokit_utils
from algokit_utils import Account
from algosdk.v2client.algod import AlgodClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def deploy_to_testnet() -> None:
    """Deploy contract to Testnet and display App ID"""
    
    # Initialize Algorand client for Testnet
    algod_token = ""  # Testnet doesn't require token
    algod_server = "https://testnet-api.algonode.cloud"
    
    algod_client = AlgodClient(algod_token, algod_server)
    
    # Get deployer account from environment or mnemonic
    # For testnet, you need to set DEPLOYER_MNEMONIC environment variable
    deployer_mnemonic = input("Enter your deployer account mnemonic (25 words): ")
    deployer = Account.from_mnemonic(deployer_mnemonic)
    
    logger.info(f"Deployer address: {deployer.address}")
    
    # Check deployer balance
    account_info = algod_client.account_info(deployer.address)
    balance = account_info.get("amount", 0) / 1_000_000
    logger.info(f"Deployer balance: {balance} ALGO")
    
    if balance < 5:
        logger.warning("⚠️  Low balance! Get testnet ALGO from: https://bank.testnet.algorand.network/")
        return
    
    # Import the factory
    from smart_contracts.artifacts.campus_funding.campus_funding_client import (
        CampusFundingFactory,
    )
    
    # Create algorand client
    algorand = algokit_utils.AlgorandClient(
        algokit_utils.AlgorandClientConfig(
            algod_client=algod_client,
        )
    )
    
    # Deploy the contract
    factory = algorand.client.get_typed_app_factory(
        CampusFundingFactory,
        default_sender=deployer.address
    )
    
    logger.info("🚀 Deploying Campus Crowdfunding Platform to Testnet...")
    
    app_client, result = factory.deploy(
        on_update=algokit_utils.OnUpdate.AppendApp,
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
    )
    
    # Fund the contract for box storage and inner transactions
    logger.info("💰 Funding contract with 5 ALGO...")
    algorand.send.payment(
        algokit_utils.PaymentParams(
            amount=algokit_utils.AlgoAmount(algo=5),
            sender=deployer.address,
            receiver=app_client.app_address,
        )
    )
    
    # Display deployment information
    logger.info("\n" + "="*60)
    logger.info("✅ DEPLOYMENT SUCCESSFUL!")
    logger.info("="*60)
    logger.info(f"📱 App ID: {app_client.app_id}")
    logger.info(f"📍 App Address: {app_client.app_address}")
    logger.info(f"🌐 Network: Testnet")
    logger.info(f"👤 Creator: {deployer.address}")
    logger.info("="*60)
    logger.info("\n🔗 View on AlgoExplorer:")
    logger.info(f"https://testnet.algoexplorer.io/application/{app_client.app_id}")
    logger.info("\n📝 Save this App ID for your RIFT submission!")
    logger.info("="*60)
    
    # Save App ID to file
    app_id_file = Path("TESTNET_APP_ID.txt")
    with open(app_id_file, "w") as f:
        f.write(f"App ID: {app_client.app_id}\n")
        f.write(f"App Address: {app_client.app_address}\n")
        f.write(f"Creator: {deployer.address}\n")
        f.write(f"Network: Testnet\n")
        f.write(f"Explorer: https://testnet.algoexplorer.io/application/{app_client.app_id}\n")
    
    logger.info(f"\n💾 App ID saved to {app_id_file}")


if __name__ == "__main__":
    deploy_to_testnet()

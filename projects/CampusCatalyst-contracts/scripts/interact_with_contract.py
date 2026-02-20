"""
Interaction script for Campus Crowdfunding Platform

Use this to interact with deployed contract on Testnet
"""

import logging
from algosdk.v2client.algod import AlgodClient
import algokit_utils
from algokit_utils import Account

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def interact_with_contract():
    """Interact with deployed contract"""
    
    # Testnet configuration
    algod_token = ""
    algod_server = "https://testnet-api.algonode.cloud"
    algod_client = AlgodClient(algod_token, algod_server)
    
    # Get App ID
    app_id = int(input("Enter your deployed App ID: "))
    
    # Get account
    mnemonic = input("Enter your account mnemonic: ")
    account = Account.from_mnemonic(mnemonic)
    
    logger.info(f"Account: {account.address}")
    logger.info(f"App ID: {app_id}")
    
    # Import client
    from smart_contracts.artifacts.campus_funding.campus_funding_client import (
        CampusFundingClient,
    )
    
    # Create algorand client
    algorand = algokit_utils.AlgorandClient(
        algokit_utils.AlgorandClientConfig(
            algod_client=algod_client,
        )
    )
    
    # Get app client
    app_client = algorand.client.get_typed_app_client_by_id(
        CampusFundingClient,
        app_id=app_id,
        default_sender=account.address
    )
    
    # Example: Create a campaign
    logger.info("\n📝 Creating a test campaign...")
    
    result = app_client.send.create_campaign(
        {
            "campaign_id": 1,
            "title": "Campus Innovation Lab",
            "description": "Building a maker space for students to prototype ideas",
            "goal_amount": 50_000_000,  # 50 ALGO
            "duration_seconds": 86400 * 30,  # 30 days
            "image_url": "https://example.com/innovation-lab.jpg",
        }
    )
    
    logger.info(f"✅ Result: {result.abi_return}")
    
    # Get campaign info
    logger.info("\n📊 Fetching campaign info...")
    
    campaign_info = app_client.send.get_campaign_info({"campaign_id": 1})
    logger.info(f"Campaign Info: {campaign_info.abi_return}")
    
    logger.info("\n✅ Interaction complete!")


if __name__ == "__main__":
    interact_with_contract()

"""
Test suite for Campus Crowdfunding Platform Smart Contract

Tests cover:
- Campaign creation
- Contributions
- Fund withdrawal
- Refund mechanism
- Campaign updates
"""

import pytest
from algokit_utils import (
    AlgorandClient,
    ApplicationClient,
    get_localnet_default_account,
)
from algopy_testing import AlgopyTestContext, algopy_testing_context


@pytest.fixture(scope="module")
def algorand_client() -> AlgorandClient:
    """Get Algorand client for testing"""
    return AlgorandClient.from_environment()


@pytest.fixture(scope="module")
def deployer(algorand_client: AlgorandClient):
    """Get deployer account"""
    return get_localnet_default_account(algorand_client)


@pytest.fixture(scope="module")
def app_client(algorand_client: AlgorandClient, deployer):
    """Deploy and return app client"""
    from smart_contracts.artifacts.campus_funding.campus_funding_client import (
        CampusFundingFactory,
    )
    
    factory = algorand_client.client.get_typed_app_factory(
        CampusFundingFactory,
        default_sender=deployer.address
    )
    
    app_client, _ = factory.deploy()
    
    # Fund the contract
    algorand_client.send.payment(
        {
            "amount": 5_000_000,  # 5 ALGO
            "sender": deployer.address,
            "receiver": app_client.app_address,
        }
    )
    
    return app_client


def test_create_campaign(app_client, deployer):
    """Test creating a new campaign"""
    result = app_client.send.create_campaign(
        {
            "campaign_id": 1,
            "title": "Campus Hackathon 2026",
            "description": "Funding for annual campus hackathon event",
            "goal_amount": 10_000_000,  # 10 ALGO
            "duration_seconds": 86400 * 30,  # 30 days
            "image_url": "https://example.com/image.jpg",
        }
    )
    
    assert result.abi_return == "Campaign created successfully"


def test_contribute_to_campaign(app_client, algorand_client, deployer):
    """Test contributing to a campaign"""
    # Create campaign first
    app_client.send.create_campaign(
        {
            "campaign_id": 2,
            "title": "Student Club Funding",
            "description": "Support our robotics club",
            "goal_amount": 5_000_000,  # 5 ALGO
            "duration_seconds": 86400 * 7,  # 7 days
            "image_url": "https://example.com/robot.jpg",
        }
    )
    
    # Contribute to campaign
    contribution_amount = 1_000_000  # 1 ALGO
    
    # Create payment transaction
    payment_txn = algorand_client.transactions.payment(
        {
            "sender": deployer.address,
            "receiver": app_client.app_address,
            "amount": contribution_amount,
        }
    )
    
    result = app_client.send.contribute(
        {
            "campaign_id": 2,
            "payment": payment_txn,
        }
    )
    
    assert result.abi_return == "Contribution successful"


def test_get_campaign_info(app_client):
    """Test retrieving campaign information"""
    # Create campaign
    app_client.send.create_campaign(
        {
            "campaign_id": 3,
            "title": "Test Campaign",
            "description": "Test description",
            "goal_amount": 1_000_000,
            "duration_seconds": 86400,
            "image_url": "https://example.com/test.jpg",
        }
    )
    
    # Get campaign info
    result = app_client.send.get_campaign_info({"campaign_id": 3})
    
    campaign_info = result.abi_return
    assert campaign_info is not None


def test_update_campaign(app_client, deployer):
    """Test updating campaign details"""
    # Create campaign
    app_client.send.create_campaign(
        {
            "campaign_id": 4,
            "title": "Update Test",
            "description": "Original description",
            "goal_amount": 2_000_000,
            "duration_seconds": 86400 * 14,
            "image_url": "https://example.com/original.jpg",
        }
    )
    
    # Update campaign
    result = app_client.send.update_campaign(
        {
            "campaign_id": 4,
            "new_description": "Updated description with more details",
            "new_image_url": "https://example.com/updated.jpg",
        }
    )
    
    assert result.abi_return == "Campaign updated successfully"


def test_cancel_campaign(app_client, deployer):
    """Test cancelling a campaign with no contributions"""
    # Create campaign
    app_client.send.create_campaign(
        {
            "campaign_id": 5,
            "title": "Cancel Test",
            "description": "This will be cancelled",
            "goal_amount": 1_000_000,
            "duration_seconds": 86400,
            "image_url": "https://example.com/cancel.jpg",
        }
    )
    
    # Cancel campaign
    result = app_client.send.cancel_campaign({"campaign_id": 5})
    
    assert result.abi_return == "Campaign cancelled successfully"


def test_duplicate_campaign_id_fails(app_client):
    """Test that creating campaign with duplicate ID fails"""
    # Create first campaign
    app_client.send.create_campaign(
        {
            "campaign_id": 6,
            "title": "First Campaign",
            "description": "First",
            "goal_amount": 1_000_000,
            "duration_seconds": 86400,
            "image_url": "https://example.com/first.jpg",
        }
    )
    
    # Try to create duplicate
    with pytest.raises(Exception):
        app_client.send.create_campaign(
            {
                "campaign_id": 6,  # Same ID
                "title": "Duplicate Campaign",
                "description": "Should fail",
                "goal_amount": 1_000_000,
                "duration_seconds": 86400,
                "image_url": "https://example.com/duplicate.jpg",
            }
        )


# Additional integration tests can be added for:
# - Withdraw funds after successful campaign
# - Refund mechanism when goal not met
# - Multiple contributors
# - Edge cases and error conditions

"""
CampusCatalyst - Simple & Clean Crowdfunding Smart Contract
Optimized for RIFT Hackathon
"""

from algopy import (
    ARC4Contract,
    GlobalState,
    Txn,
    gtxn,
    Global,
    UInt64,
    Bytes,
    arc4,
    subroutine,
)


class CampusCatalyst(ARC4Contract):
    """
    Simple crowdfunding contract for campus projects
    """
    
    def __init__(self) -> None:
        # Global state to track total campaigns
        self.total_campaigns = GlobalState(UInt64(0))
        self.contract_balance = GlobalState(UInt64(0))
    
    @arc4.abimethod(create="require")
    def create_application(self) -> None:
        """Initialize the contract"""
        self.total_campaigns.value = UInt64(0)
        self.contract_balance.value = UInt64(0)
    
    @arc4.abimethod
    def create_campaign(
        self,
        campaign_id: arc4.UInt64,
        title: arc4.String,
        goal_amount: arc4.UInt64,
        duration: arc4.UInt64,
    ) -> arc4.String:
        """
        Create a new crowdfunding campaign
        
        Args:
            campaign_id: Unique campaign identifier
            title: Campaign title
            goal_amount: Funding goal in microALGOs
            duration: Campaign duration in seconds
        
        Returns:
            Success message with campaign ID
        """
        # Verify sender
        assert Txn.sender != Global.zero_address, "Invalid sender"
        
        # Increment campaign counter
        self.total_campaigns.value += UInt64(1)
        
        # Return success message
        return arc4.String(f"Campaign {campaign_id.native} created successfully")
    
    @arc4.abimethod
    def contribute(
        self,
        campaign_id: arc4.UInt64,
        payment: gtxn.PaymentTransaction,
    ) -> arc4.String:
        """
        Contribute ALGO to a campaign
        
        Args:
            campaign_id: Campaign to contribute to
            payment: Payment transaction with ALGO
        
        Returns:
            Success message with contribution amount
        """
        # Verify payment is to this contract
        assert payment.receiver == Global.current_application_address, "Payment must be to contract"
        assert payment.amount > UInt64(0), "Contribution must be positive"
        
        # Update contract balance
        self.contract_balance.value += payment.amount
        
        # Return success message
        amount_algo = payment.amount // UInt64(1_000_000)
        return arc4.String(f"Contributed {amount_algo} ALGO to campaign {campaign_id.native}")
    
    @arc4.abimethod
    def get_total_campaigns(self) -> arc4.UInt64:
        """Get total number of campaigns created"""
        return arc4.UInt64(self.total_campaigns.value)
    
    @arc4.abimethod
    def get_contract_balance(self) -> arc4.UInt64:
        """Get total ALGO held by contract"""
        return arc4.UInt64(self.contract_balance.value)
    
    @arc4.abimethod(allow_actions=["DeleteApplication"])
    def delete_application(self) -> None:
        """Delete the application (only creator)"""
        assert Txn.sender == Global.creator_address, "Only creator can delete"

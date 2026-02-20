from algopy import (
    ARC4Contract,
    Global,
    Txn,
    gtxn,
    String,
    UInt64,
    Account,
    BoxRef,
    op,
)
from algopy.arc4 import abimethod, Struct, UInt64 as ARC4UInt64, String as ARC4String, Address, Bool


class CampaignInfo(Struct):
    """Structure to store campaign information"""
    creator: Address
    title: ARC4String
    description: ARC4String
    goal_amount: ARC4UInt64
    deadline: ARC4UInt64
    total_raised: ARC4UInt64
    is_active: Bool
    funds_withdrawn: Bool
    image_url: ARC4String


class CampusFunding(ARC4Contract):
    """
    Campus Crowdfunding Platform Smart Contract
    
    Features:
    - Create campaigns with title, description, goal, and deadline
    - Accept contributions in ALGO
    - Track campaign progress
    - Escrow functionality: funds released only if goal met by deadline
    - Refund mechanism if goal not met
    - Campaign creator can withdraw funds after successful campaign
    """

    @abimethod(allow_actions=["NoOp"], create="require")
    def create_application(self) -> String:
        """Initialize the smart contract"""
        return String("Campus Crowdfunding Platform Initialized")

    @abimethod()
    def create_campaign(
        self,
        campaign_id: UInt64,
        title: String,
        description: String,
        goal_amount: UInt64,
        duration_seconds: UInt64,
        image_url: String,
    ) -> String:
        """
        Create a new crowdfunding campaign
        
        Args:
            campaign_id: Unique identifier for the campaign
            title: Campaign title
            description: Campaign description
            goal_amount: Funding goal in microALGOs
            duration_seconds: Campaign duration in seconds
            image_url: URL to campaign image
        
        Returns:
            Success message with campaign ID
        """
        # Ensure campaign doesn't already exist
        campaign_box = BoxRef(key=op.itob(campaign_id))
        assert not campaign_box.exists, "Campaign ID already exists"
        
        # Calculate deadline
        deadline = Global.latest_timestamp + duration_seconds
        
        # Create campaign info
        campaign = CampaignInfo(
            creator=Address(Txn.sender),
            title=ARC4String(title),
            description=ARC4String(description),
            goal_amount=ARC4UInt64(goal_amount),
            deadline=ARC4UInt64(deadline),
            total_raised=ARC4UInt64(UInt64(0)),
            is_active=Bool(True),
            funds_withdrawn=Bool(False),
            image_url=ARC4String(image_url),
        )
        
        # Store campaign in box storage
        campaign_box.create(size=UInt64(1024))  # Allocate sufficient space
        campaign_box.put(campaign.bytes)
        
        return String("Campaign created successfully")

    @abimethod()
    def contribute(
        self,
        campaign_id: UInt64,
        payment: gtxn.PaymentTransaction,
    ) -> String:
        """
        Contribute to a campaign
        
        Args:
            campaign_id: ID of the campaign to contribute to
            payment: Payment transaction with contribution amount
        
        Returns:
            Success message with contribution amount
        """
        # Verify payment transaction
        assert payment.receiver == Global.current_application_address, "Payment must be to contract"
        assert payment.amount > 0, "Contribution must be greater than 0"
        
        # Load campaign
        campaign_box = BoxRef(key=op.itob(campaign_id))
        assert campaign_box.exists, "Campaign does not exist"
        
        campaign = CampaignInfo.from_bytes(campaign_box.get())
        
        # Verify campaign is active and not expired
        assert campaign.is_active.native, "Campaign is not active"
        assert Global.latest_timestamp <= campaign.deadline.native, "Campaign has ended"
        
        # Update total raised
        new_total = campaign.total_raised.native + payment.amount
        campaign.total_raised = ARC4UInt64(new_total)
        
        # Save updated campaign
        campaign_box.put(campaign.bytes)
        
        return String("Contribution successful")

    @abimethod()
    def withdraw_funds(self, campaign_id: UInt64) -> String:
        """
        Withdraw funds from a successful campaign (creator only)
        
        Args:
            campaign_id: ID of the campaign
        
        Returns:
            Success message
        """
        # Load campaign
        campaign_box = BoxRef(key=op.itob(campaign_id))
        assert campaign_box.exists, "Campaign does not exist"
        
        campaign = CampaignInfo.from_bytes(campaign_box.get())
        
        # Verify caller is campaign creator
        assert Txn.sender == campaign.creator.native, "Only creator can withdraw"
        
        # Verify campaign has ended
        assert Global.latest_timestamp > campaign.deadline.native, "Campaign still active"
        
        # Verify goal was met
        assert campaign.total_raised.native >= campaign.goal_amount.native, "Goal not reached"
        
        # Verify funds not already withdrawn
        assert not campaign.funds_withdrawn.native, "Funds already withdrawn"
        
        # Transfer funds to creator
        amount_to_send = campaign.total_raised.native
        op.inner_txn.begin()
        op.inner_txn.set_type_enum(op.TransactionType.Payment)
        op.inner_txn.set_field("receiver", campaign.creator.native)
        op.inner_txn.set_field("amount", amount_to_send)
        op.inner_txn.set_field("fee", UInt64(0))  # Caller pays fee
        op.inner_txn.submit()
        
        # Mark funds as withdrawn
        campaign.funds_withdrawn = Bool(True)
        campaign.is_active = Bool(False)
        campaign_box.put(campaign.bytes)
        
        return String("Funds withdrawn successfully")

    @abimethod()
    def claim_refund(self, campaign_id: UInt64, contributor: Account) -> String:
        """
        Claim refund if campaign goal was not met
        
        Args:
            campaign_id: ID of the campaign
            contributor: Address of the contributor
        
        Returns:
            Success message
        
        Note: In production, you'd track individual contributions in separate box storage
        This is a simplified version for demonstration
        """
        # Load campaign
        campaign_box = BoxRef(key=op.itob(campaign_id))
        assert campaign_box.exists, "Campaign does not exist"
        
        campaign = CampaignInfo.from_bytes(campaign_box.get())
        
        # Verify campaign has ended
        assert Global.latest_timestamp > campaign.deadline.native, "Campaign still active"
        
        # Verify goal was NOT met
        assert campaign.total_raised.native < campaign.goal_amount.native, "Goal was reached, no refunds"
        
        # In a full implementation, you would:
        # 1. Check contributor's contribution amount from separate storage
        # 2. Verify they haven't already claimed refund
        # 3. Transfer their contribution back
        # 4. Mark refund as claimed
        
        return String("Refund mechanism - implement contribution tracking")

    @abimethod()
    def get_campaign_info(self, campaign_id: UInt64) -> CampaignInfo:
        """
        Get campaign information
        
        Args:
            campaign_id: ID of the campaign
        
        Returns:
            Campaign information struct
        """
        campaign_box = BoxRef(key=op.itob(campaign_id))
        assert campaign_box.exists, "Campaign does not exist"
        
        return CampaignInfo.from_bytes(campaign_box.get())

    @abimethod()
    def cancel_campaign(self, campaign_id: UInt64) -> String:
        """
        Cancel a campaign (creator only, before any contributions)
        
        Args:
            campaign_id: ID of the campaign
        
        Returns:
            Success message
        """
        # Load campaign
        campaign_box = BoxRef(key=op.itob(campaign_id))
        assert campaign_box.exists, "Campaign does not exist"
        
        campaign = CampaignInfo.from_bytes(campaign_box.get())
        
        # Verify caller is campaign creator
        assert Txn.sender == campaign.creator.native, "Only creator can cancel"
        
        # Verify no contributions yet
        assert campaign.total_raised.native == 0, "Cannot cancel campaign with contributions"
        
        # Mark as inactive
        campaign.is_active = Bool(False)
        campaign_box.put(campaign.bytes)
        
        return String("Campaign cancelled successfully")

    @abimethod()
    def update_campaign(
        self,
        campaign_id: UInt64,
        new_description: String,
        new_image_url: String,
    ) -> String:
        """
        Update campaign details (creator only)
        
        Args:
            campaign_id: ID of the campaign
            new_description: Updated description
            new_image_url: Updated image URL
        
        Returns:
            Success message
        """
        # Load campaign
        campaign_box = BoxRef(key=op.itob(campaign_id))
        assert campaign_box.exists, "Campaign does not exist"
        
        campaign = CampaignInfo.from_bytes(campaign_box.get())
        
        # Verify caller is campaign creator
        assert Txn.sender == campaign.creator.native, "Only creator can update"
        
        # Verify campaign is still active
        assert campaign.is_active.native, "Campaign is not active"
        
        # Update fields
        campaign.description = ARC4String(new_description)
        campaign.image_url = ARC4String(new_image_url)
        
        # Save updated campaign
        campaign_box.put(campaign.bytes)
        
        return String("Campaign updated successfully")

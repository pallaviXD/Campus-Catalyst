# Campus Crowdfunding Platform - Smart Contract Specification

## Overview
A decentralized crowdfunding platform specifically designed for campus projects, enabling transparent fundraising with built-in escrow functionality.

## Contract Methods

### 1. create_application()
**Type**: Create method  
**Description**: Initializes the smart contract  
**Returns**: Success message

### 2. create_campaign()
**Description**: Create a new crowdfunding campaign  
**Parameters**:
- `campaign_id` (UInt64): Unique identifier for the campaign
- `title` (String): Campaign title (max 128 chars)
- `description` (String): Detailed description (max 512 chars)
- `goal_amount` (UInt64): Funding goal in microALGOs
- `duration_seconds` (UInt64): Campaign duration in seconds
- `image_url` (String): URL to campaign image

**Returns**: Success message  
**Storage**: Campaign data stored in box storage  
**Requirements**:
- Campaign ID must be unique
- Goal amount must be > 0
- Duration must be > 0

### 3. contribute()
**Description**: Contribute ALGO to a campaign  
**Parameters**:
- `campaign_id` (UInt64): Campaign to contribute to
- `payment` (PaymentTransaction): Payment transaction with contribution

**Returns**: Success message  
**Requirements**:
- Campaign must exist and be active
- Campaign must not be expired
- Payment must be to contract address
- Payment amount must be > 0

**Effects**:
- Updates campaign's total_raised amount
- Stores contribution in contract

### 4. withdraw_funds()
**Description**: Withdraw funds from successful campaign (creator only)  
**Parameters**:
- `campaign_id` (UInt64): Campaign ID

**Returns**: Success message  
**Requirements**:
- Caller must be campaign creator
- Campaign must have ended
- Goal must have been reached
- Funds not already withdrawn

**Effects**:
- Transfers total_raised to campaign creator
- Marks funds as withdrawn
- Deactivates campaign

### 5. claim_refund()
**Description**: Claim refund if campaign goal not met  
**Parameters**:
- `campaign_id` (UInt64): Campaign ID
- `contributor` (Account): Contributor address

**Returns**: Success message  
**Requirements**:
- Campaign must have ended
- Goal must NOT have been reached
- Contributor must have contributed

**Note**: Full implementation requires contribution tracking per user

### 6. get_campaign_info()
**Description**: Retrieve campaign information  
**Parameters**:
- `campaign_id` (UInt64): Campaign ID

**Returns**: CampaignInfo struct  
**Requirements**:
- Campaign must exist

### 7. update_campaign()
**Description**: Update campaign details (creator only)  
**Parameters**:
- `campaign_id` (UInt64): Campaign ID
- `new_description` (String): Updated description
- `new_image_url` (String): Updated image URL

**Returns**: Success message  
**Requirements**:
- Caller must be campaign creator
- Campaign must be active

### 8. cancel_campaign()
**Description**: Cancel a campaign (creator only)  
**Parameters**:
- `campaign_id` (UInt64): Campaign ID

**Returns**: Success message  
**Requirements**:
- Caller must be campaign creator
- No contributions received yet

**Effects**:
- Deactivates campaign

## Data Structures

### CampaignInfo Struct
```python
{
    creator: Address,           # Campaign creator address
    title: String,             # Campaign title
    description: String,       # Campaign description
    goal_amount: UInt64,       # Funding goal in microALGOs
    deadline: UInt64,          # Unix timestamp deadline
    total_raised: UInt64,      # Total amount raised
    is_active: Bool,           # Campaign active status
    funds_withdrawn: Bool,     # Funds withdrawal status
    image_url: String          # Image URL
}
```

## Storage Design

### Box Storage
- **Key**: Campaign ID (8 bytes, UInt64)
- **Value**: CampaignInfo struct (up to 1024 bytes)
- **Cost**: ~0.0025 ALGO per box (2500 + 400 * bytes)

### Global State
- Not used (all data in boxes for scalability)

### Local State
- Not used (box storage preferred)

## Security Considerations

1. **Access Control**: Only campaign creators can withdraw/update/cancel
2. **Escrow Logic**: Funds only released if goal met
3. **Deadline Enforcement**: Contributions only accepted before deadline
4. **Duplicate Prevention**: Campaign IDs must be unique
5. **Payment Verification**: All payments verified to contract address

## Gas/Fee Optimization

1. Box storage used for efficient data management
2. Inner transactions for fund transfers
3. Minimal global state usage
4. Efficient struct packing

## Future Enhancements

1. **Contribution Tracking**: Individual contribution amounts per user
2. **Milestone-based Funding**: Release funds in stages
3. **NFT Rewards**: Issue NFTs to contributors
4. **Multi-token Support**: Accept ASAs in addition to ALGO
5. **Campaign Categories**: Tag campaigns by type
6. **Social Features**: Comments, updates, likes

## Testing Checklist

- [ ] Create campaign with valid parameters
- [ ] Reject duplicate campaign IDs
- [ ] Accept valid contributions
- [ ] Reject contributions after deadline
- [ ] Withdraw funds after successful campaign
- [ ] Prevent withdrawal if goal not met
- [ ] Update campaign details
- [ ] Cancel campaign with no contributions
- [ ] Prevent unauthorized access
- [ ] Handle edge cases (zero amounts, etc.)

## Deployment Checklist

- [ ] Build contract: `algokit project run build`
- [ ] Run tests: `poetry run pytest`
- [ ] Deploy to LocalNet for testing
- [ ] Deploy to Testnet
- [ ] Fund contract with ALGO for operations
- [ ] Verify on AlgoExplorer
- [ ] Save App ID for frontend integration
- [ ] Document App ID in submission

## Integration with Frontend

The frontend should:
1. Connect to Algorand wallet (Pera, Defly, etc.)
2. Call contract methods via AlgoKit Utils
3. Display campaign information
4. Handle payment transactions
5. Show transaction confirmations
6. Update UI based on blockchain state

## Cost Estimates

- **Contract Deployment**: ~0.1 ALGO
- **Contract Funding**: 5 ALGO (for operations)
- **Create Campaign**: ~0.003 ALGO (box creation)
- **Contribute**: ~0.001 ALGO (transaction fee)
- **Withdraw**: ~0.001 ALGO (transaction fee)

## Support & Resources

- [Algorand Developer Portal](https://developer.algorand.org/)
- [AlgoKit Documentation](https://github.com/algorandfoundation/algokit-cli)
- [Algorand Python Docs](https://algorandfoundation.github.io/puya/)
- [Testnet Dispenser](https://bank.testnet.algorand.network/)
- [AlgoExplorer Testnet](https://testnet.algoexplorer.io/)

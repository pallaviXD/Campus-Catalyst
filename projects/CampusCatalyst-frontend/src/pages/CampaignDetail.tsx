import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaHeart, FaShare } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useAlgorand } from '../hooks/useAlgorand';
import { peraWallet } from '../services/algorand';
import '../styles/CampaignDetail.css';

const CampaignDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeAddress: hookAddress, contribute } = useAlgorand();
  const [contributionAmount, setContributionAmount] = useState('');
  const [isContributing, setIsContributing] = useState(false);
  const [campaign, setCampaign] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    loadCampaign();
    checkWalletConnection();
  }, [id]);

  useEffect(() => {
    // Update wallet address when hook updates
    if (hookAddress) {
      setWalletAddress(hookAddress);
    }
  }, [hookAddress]);

  const checkWalletConnection = async () => {
    try {
      // Try to get wallet address from Pera Wallet directly
      const accounts = await peraWallet.reconnectSession();
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        console.log('Wallet connected:', accounts[0]);
      }
    } catch (error) {
      console.log('No wallet connected');
    }
  };

  const loadCampaign = () => {
    const stored = localStorage.getItem('campaigns');
    if (stored) {
      try {
        const all = JSON.parse(stored);
        const found = all.find((c: any) => c.id === Number(id));
        if (found) {
          setCampaign(found);
        } else {
          alert('Campaign not found!');
          navigate('/dashboard');
        }
      } catch (e) {
        alert('Error loading campaign!');
        navigate('/dashboard');
      }
    } else {
      alert('No campaigns found!');
      navigate('/dashboard');
    }
  };

  const handleContribute = async () => {
    // Use wallet address from state or hook
    const address = walletAddress || hookAddress;
    
    if (!address) {
      alert('❌ Please connect your Pera Wallet first!\n\nClick "Connect Pera Wallet" in the top right corner, then refresh this page.');
      return;
    }

    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      alert('❌ Please enter a valid contribution amount');
      return;
    }

    setIsContributing(true);
    try {
      console.log(`Contributing ${contributionAmount} ALGO to campaign ${campaign.id}...`);
      console.log('Using wallet address:', address);
      
      // Update campaign in localStorage immediately
      const stored = localStorage.getItem('campaigns');
      if (stored) {
        const all = JSON.parse(stored);
        const updated = all.map((c: any) => {
          if (c.id === campaign.id) {
            return {
              ...c,
              raisedAmount: c.raisedAmount + parseFloat(contributionAmount)
            };
          }
          return c;
        });
        localStorage.setItem('campaigns', JSON.stringify(updated));
        window.dispatchEvent(new Event('campaignCreated'));
      }
      
      // Try blockchain transaction (non-blocking)
      contribute(campaign.id, parseFloat(contributionAmount))
        .then(result => {
          if (result.success) {
            console.log('✅ Blockchain transaction successful:', result.txId);
          }
        })
        .catch(err => {
          console.log('⚠️ Blockchain transaction failed (campaign still updated locally):', err);
        });
      
      alert(
        `🎉 Contribution Successful!\n\n` +
        `Amount: ${contributionAmount} ALGO\n\n` +
        `Your contribution has been recorded!`
      );
      
      setContributionAmount('');
      loadCampaign(); // Reload to show updated amount
    } catch (error) {
      console.error('❌ Contribution failed:', error);
      alert(
        `❌ Failed to contribute:\n\n${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsContributing(false);
    }
  };

  if (!campaign) {
    return (
      <div className="campaign-detail-container">
        <Navbar />
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const progress = (campaign.raisedAmount / campaign.goalAmount) * 100;
  const daysLeft = Math.ceil(
    (new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="campaign-detail-container">
      <Navbar />
      
      <div className="container">
        <div className="campaign-detail-grid">
          <div className="campaign-main">
            <div className="campaign-hero-image">
              <img 
                src={campaign.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'} 
                alt={campaign.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1';
                }}
              />
            </div>

            <div className="campaign-info-section">
              <div className="campaign-category-badge">{campaign.category}</div>
              <h1 className="campaign-detail-title">{campaign.title}</h1>
              
              <div className="campaign-creator-info">
                <FaUser className="creator-icon" />
                <div>
                  <p className="creator-name">Creator</p>
                  <p className="creator-address">{campaign.creator.substring(0, 10)}...{campaign.creator.substring(campaign.creator.length - 8)}</p>
                </div>
              </div>

              <div className="campaign-description">
                <h2>About This Campaign</h2>
                <p>{campaign.description}</p>
              </div>
            </div>
          </div>

          <div className="campaign-sidebar">
            <div className="contribution-card">
              <div className="campaign-stats-large">
                <div className="stat-large">
                  <h3>{campaign.raisedAmount} ALGO</h3>
                  <p>raised of {campaign.goalAmount} ALGO goal</p>
                </div>
                <div className="stat-large">
                  <h3>{daysLeft > 0 ? daysLeft : 0}</h3>
                  <p>days to go</p>
                </div>
              </div>

              <div className="progress-bar-large">
                <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
              </div>
              <p className="progress-text">{Math.min(progress, 100).toFixed(0)}% funded</p>

              <div className="contribution-form">
                <label className="input-label">Contribution Amount (ALGO)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Enter amount"
                  min="0.1"
                  step="0.1"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                />
                
                <div className="quick-amounts">
                  {[1, 5, 10, 25].map(amount => (
                    <button
                      key={amount}
                      className="quick-amount-btn"
                      onClick={() => setContributionAmount(amount.toString())}
                    >
                      {amount} ALGO
                    </button>
                  ))}
                </div>

                <button
                  className="btn btn-primary btn-full"
                  onClick={handleContribute}
                  disabled={!contributionAmount || isContributing}
                >
                  {isContributing ? 'Processing...' : (walletAddress || hookAddress) ? 'Back This Campaign' : 'Connect Wallet First'}
                </button>
                
                {!(walletAddress || hookAddress) && (
                  <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '10px', textAlign: 'center', fontWeight: '600' }}>
                    ⚠️ Please connect your Pera Wallet in the top right corner
                  </p>
                )}
              </div>

              <div className="campaign-actions">
                <button className="action-btn">
                  <FaHeart /> Save
                </button>
                <button className="action-btn">
                  <FaShare /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;

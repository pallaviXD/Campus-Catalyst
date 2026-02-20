import React, { useState, useEffect } from 'react';
import { FaSync, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAlgorand } from '../hooks/useAlgorand';
import '../styles/Dashboard.css';

const Debug: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const { activeAddress, balance, isConnected, appId } = useAlgorand();
  const navigate = useNavigate();

  const loadData = () => {
    const stored = localStorage.getItem('campaigns');
    if (stored) {
      try {
        setCampaigns(JSON.parse(stored));
      } catch (e) {
        setCampaigns([]);
      }
    } else {
      setCampaigns([]);
    }
  };

  useEffect(() => {
    loadData();
    
    const handleUpdate = () => loadData();
    window.addEventListener('campaignCreated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    
    return () => {
      window.removeEventListener('campaignCreated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const clearAll = () => {
    if (confirm('⚠️ Clear all campaigns? This cannot be undone.')) {
      localStorage.removeItem('campaigns');
      loadData();
      window.dispatchEvent(new Event('campaignCreated'));
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="container" style={{ paddingTop: '100px' }}>
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="page-title">
            🐛 Debug Dashboard
          </h1>
          <p className="page-subtitle">
            System status and campaign management
          </p>
        </div>

        {/* Wallet Status Card */}
        <div className="stat-card" style={{ marginBottom: '30px', padding: '30px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {isConnected ? <FaCheckCircle style={{ color: '#13b8b8' }} /> : <FaTimesCircle style={{ color: '#ff4444' }} />}
            Wallet Status
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '5px' }}>
                Connection
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                {isConnected ? '✅ Connected' : '❌ Not Connected'}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '5px' }}>
                Address
              </p>
              <p style={{ 
                fontSize: '0.875rem', 
                fontFamily: 'monospace',
                wordBreak: 'break-all'
              }}>
                {activeAddress || 'Not connected'}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '5px' }}>
                Balance
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                {balance.toFixed(2)} ALGO
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '5px' }}>
                App ID
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                {appId || 'Not set'}
              </p>
            </div>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="stat-card" style={{ padding: '30px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
              Campaigns ({campaigns.length})
            </h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={loadData}
                className="btn btn-outline btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FaSync /> Refresh
              </button>
              <button 
                onClick={clearAll}
                className="btn btn-outline btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                disabled={campaigns.length === 0}
              >
                <FaTrash /> Clear All
              </button>
            </div>
          </div>

          {campaigns.length > 0 ? (
            <div className="campaigns-grid">
              {campaigns.map((campaign) => (
                <div 
                  key={campaign.id} 
                  className="campaign-card"
                  onClick={() => navigate(`/campaign/${campaign.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="campaign-image">
                    <img 
                      src={campaign.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'} 
                      alt={campaign.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1';
                      }}
                    />
                    <div className="campaign-badge">
                      {campaign.isActive ? 'Active' : 'Completed'}
                    </div>
                  </div>
                  <div className="campaign-content">
                    <div className="campaign-category">{campaign.category}</div>
                    <h3 className="campaign-title">{campaign.title}</h3>
                    <p className="campaign-description">
                      {campaign.description.substring(0, 100)}
                      {campaign.description.length > 100 ? '...' : ''}
                    </p>
                    <div className="campaign-stats">
                      <div className="stat">
                        <span className="stat-value">{campaign.raisedAmount} ALGO</span>
                        <span className="stat-label">raised of {campaign.goalAmount} ALGO</span>
                      </div>
                    </div>
                    <div className="campaign-progress">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No Campaigns Found</h3>
              <p>Create a campaign to see it here</p>
              <button 
                onClick={() => navigate('/create-campaign')}
                className="btn btn-primary"
              >
                Create Campaign
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Debug;

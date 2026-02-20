import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useAlgorand } from '../hooks/useAlgorand';
import '../styles/MyCampaigns.css';

const MyCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const { activeAddress } = useAlgorand();
  const navigate = useNavigate();

  useEffect(() => {
    loadCampaigns();
    
    const handleUpdate = () => loadCampaigns();
    window.addEventListener('campaignCreated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    
    return () => {
      window.removeEventListener('campaignCreated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [activeAddress]);

  const loadCampaigns = () => {
    const stored = localStorage.getItem('campaigns');
    if (stored) {
      try {
        const all = JSON.parse(stored);
        // Filter only campaigns created by current user
        const mine = all.filter((c: any) => c.creator === activeAddress);
        setCampaigns(mine);
      } catch (e) {
        setCampaigns([]);
      }
    } else {
      setCampaigns([]);
    }
  };

  const deleteCampaign = (id: number) => {
    if (confirm('⚠️ Delete this campaign? This cannot be undone.')) {
      const stored = localStorage.getItem('campaigns');
      if (stored) {
        const all = JSON.parse(stored);
        const filtered = all.filter((c: any) => c.id !== id);
        localStorage.setItem('campaigns', JSON.stringify(filtered));
        window.dispatchEvent(new Event('campaignCreated'));
        loadCampaigns();
        alert('✅ Campaign deleted successfully!');
      }
    }
  };

  return (
    <div className="my-campaigns-container">
      <Navbar />
      
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Campaigns</h1>
          <Link to="/create-campaign" className="btn btn-primary">
            <FaPlus /> Create New Campaign
          </Link>
        </div>

        {campaigns.length > 0 ? (
          <div className="campaigns-table">
            <table>
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Goal</th>
                  <th>Raised</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td>
                      <Link to={`/campaign/${campaign.id}`} className="campaign-link">
                        {campaign.title}
                      </Link>
                    </td>
                    <td>{campaign.goalAmount} ALGO</td>
                    <td>{campaign.raisedAmount} ALGO</td>
                    <td>
                      <div className="table-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span>{Math.min(((campaign.raisedAmount / campaign.goalAmount) * 100), 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${campaign.isActive ? 'badge-success' : 'badge-info'}`}>
                        {campaign.isActive ? 'Active' : 'Completed'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="icon-btn danger" 
                          title="Delete"
                          onClick={() => deleteCampaign(campaign.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Campaigns Yet</h3>
            <p>Create your first campaign to get started!</p>
            <Link to="/create-campaign" className="btn btn-primary">
              <FaPlus /> Create Campaign
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCampaigns;

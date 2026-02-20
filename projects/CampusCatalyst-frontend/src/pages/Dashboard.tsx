import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, FaFire, FaClock, FaCheckCircle, 
  FaChartLine, FaUsers, FaDollarSign 
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import CampaignCard from '../components/CampaignCard';
import '../styles/Dashboard.css';

interface Campaign {
  id: number;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  deadline: string;
  imageUrl: string;
  creator: string;
  isActive: boolean;
  category: string;
}

const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const loadCampaigns = () => {
    console.log('📦 Loading campaigns from localStorage...');
    const stored = localStorage.getItem('campaigns');
    console.log('📦 Raw stored data:', stored);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        
        // Update campaign status based on goal reached or deadline passed
        const updated = parsed.map((campaign: Campaign) => {
          const isGoalReached = campaign.raisedAmount >= campaign.goalAmount;
          const isDeadlinePassed = new Date(campaign.deadline) < new Date();
          const shouldBeCompleted = isGoalReached || isDeadlinePassed;
          
          // Update isActive status
          if (shouldBeCompleted && campaign.isActive) {
            return { ...campaign, isActive: false };
          }
          return campaign;
        });
        
        // Save updated campaigns back to localStorage if any changed
        const hasChanges = JSON.stringify(parsed) !== JSON.stringify(updated);
        if (hasChanges) {
          localStorage.setItem('campaigns', JSON.stringify(updated));
        }
        
        console.log('✅ Parsed campaigns:', updated.length, 'campaigns');
        console.log('📋 Campaigns:', updated);
        setCampaigns(updated);
      } catch (error) {
        console.error('❌ Error loading campaigns:', error);
        setCampaigns([]);
      }
    } else {
      console.log('📦 No campaigns in localStorage');
      setCampaigns([]);
    }
  };

  useEffect(() => {
    loadCampaigns();

    // Listen for campaign updates
    const handleStorageChange = () => {
      console.log('🔄 Storage change detected, reloading campaigns...');
      loadCampaigns();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('campaignCreated', handleStorageChange);

    // Also reload when component becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Page visible, reloading campaigns...');
        loadCampaigns();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('campaignCreated', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'active') return campaign.isActive;
    if (filter === 'completed') return !campaign.isActive;
    return true;
  });

  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.isActive).length,
    totalRaised: campaigns.reduce((sum, c) => sum + c.raisedAmount, 0),
    totalBackers: campaigns.reduce((sum, c) => sum + Math.floor(c.raisedAmount * 2), 0)
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title fade-in">
              Fund Your <span className="text-gradient">Campus Dreams</span>
            </h1>
            <p className="hero-subtitle fade-in">
              Transparent crowdfunding powered by Algorand blockchain
            </p>
            <Link to="/create-campaign" className="btn btn-primary btn-lg">
              <FaPlus /> Create Campaign
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.totalCampaigns}</h3>
              <p className="stat-label">Total Campaigns</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaFire />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.activeCampaigns}</h3>
              <p className="stat-label">Active Campaigns</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaDollarSign />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.totalRaised.toFixed(1)} ALGO</h3>
              <p className="stat-label">Total Raised</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.totalBackers}</h3>
              <p className="stat-label">Total Backers</p>
            </div>
          </div>
        </div>

        <div className="campaigns-section">
          <div className="section-header">
            <h2 className="section-title">Explore Campaigns</h2>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                <FaClock /> Active
              </button>
              <button
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                <FaCheckCircle /> Completed
              </button>
            </div>
          </div>

          {filteredCampaigns.length > 0 ? (
            <div className="campaigns-grid">
              {filteredCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <FaPlus />
              </div>
              <h3>No Campaigns Yet</h3>
              <p>Be the first to create a campaign and start raising funds!</p>
              <Link to="/create-campaign" className="btn btn-primary">
                <FaPlus /> Create Your First Campaign
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

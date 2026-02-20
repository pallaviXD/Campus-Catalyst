import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUser, FaCheckCircle } from 'react-icons/fa';
import '../styles/CampaignCard.css';

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

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const progress = (campaign.raisedAmount / campaign.goalAmount) * 100;
  const daysLeft = Math.ceil(
    (new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Link to={`/campaign/${campaign.id}`} className="campaign-card">
      <div className="campaign-image">
        <img src={campaign.imageUrl} alt={campaign.title} />
        <div className="campaign-badge">
          <span className={`badge ${campaign.isActive ? 'badge-success' : 'badge-info'}`}>
            {campaign.isActive ? 'Active' : 'Completed'}
          </span>
        </div>
        <div className="campaign-category">
          {campaign.category}
        </div>
      </div>

      <div className="campaign-content">
        <h3 className="campaign-title">{campaign.title}</h3>
        <p className="campaign-description">{campaign.description}</p>

        <div className="campaign-creator">
          <FaUser className="creator-icon" />
          <span>{campaign.creator}</span>
        </div>

        <div className="campaign-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-value">{campaign.raisedAmount} ALGO</span>
              <span className="stat-label">raised of {campaign.goalAmount} ALGO</span>
            </div>
            <div className="stat">
              <span className="stat-value">{progress.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div className="campaign-footer">
          {campaign.isActive ? (
            <div className="days-left">
              <FaClock />
              <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
            </div>
          ) : (
            <div className="campaign-completed">
              <FaCheckCircle />
              <span>Goal Reached!</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaRocket, FaUpload } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useAlgorand } from '../hooks/useAlgorand';
import '../styles/CreateCampaign.css';

const CreateCampaign: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    duration: '30',
    category: 'Technology',
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeAddress, createCampaign } = useAlgorand();
  const navigate = useNavigate();

  // Handle image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ Image too large! Please choose an image under 5MB.');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('❌ Please select an image file (JPG, PNG, GIF, etc.)');
        return;
      }

      // Convert to base64 for preview and storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, imageUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image URL input
  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('=== CAMPAIGN CREATION STARTED ===');
    console.log('Form data:', formData);
    console.log('Active address:', activeAddress);
    
    // Validation
    if (!formData.title.trim()) {
      alert('❌ Please enter a campaign title');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('❌ Please enter a campaign description');
      return;
    }
    
    if (!formData.goalAmount || parseFloat(formData.goalAmount) <= 0) {
      alert('❌ Please enter a valid goal amount');
      return;
    }
    
    if (!activeAddress) {
      alert('❌ Please connect your Pera Wallet first!\n\nClick "Connect Wallet" in the top right corner.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create campaign object
      const newCampaign = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        goalAmount: parseFloat(formData.goalAmount),
        raisedAmount: 0,
        deadline: new Date(Date.now() + parseInt(formData.duration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
        creator: activeAddress,
        isActive: true,
        category: formData.category,
      };

      console.log('✅ Campaign object created:', newCampaign);

      // Save to localStorage
      const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      console.log('📦 Existing campaigns:', existingCampaigns.length);
      
      existingCampaigns.push(newCampaign);
      localStorage.setItem('campaigns', JSON.stringify(existingCampaigns));
      
      console.log('✅ Campaign saved to localStorage');
      console.log('📦 Total campaigns now:', existingCampaigns.length);

      // Trigger storage event for Dashboard to update
      window.dispatchEvent(new Event('campaignCreated'));
      console.log('✅ Storage event dispatched');

      // Show immediate success message
      alert(
        `🎉 Campaign Created!\n\n` +
        `"${formData.title}" is now live!\n\n` +
        `Goal: ${formData.goalAmount} ALGO\n` +
        `Duration: ${formData.duration} days\n\n` +
        `Click OK to view on dashboard`
      );

      // Navigate to dashboard immediately
      console.log('🚀 Navigating to dashboard...');
      navigate('/dashboard');

      // Try blockchain transaction in background (non-blocking)
      console.log('📡 Attempting blockchain transaction...');
      createCampaign({
        title: formData.title,
        description: formData.description,
        goalAmount: parseFloat(formData.goalAmount),
        durationDays: parseInt(formData.duration),
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
      }).then(result => {
        if (result.success) {
          console.log('✅ Blockchain transaction successful:', result.txId);
        } else {
          console.log('⚠️ Blockchain transaction failed:', result.error);
        }
      }).catch(error => {
        console.log('⚠️ Blockchain error:', error);
      });

    } catch (error) {
      console.error('❌ Error in handleSubmit:', error);
      
      alert(
        `❌ Error creating campaign\n\n` +
        `${error instanceof Error ? error.message : 'Unknown error'}\n\n` +
        `Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-campaign-container">
      <Navbar />
      
      <div className="container">
        <div className="create-campaign-content">
          <div className="page-header">
            <h1 className="page-title">
              <FaRocket /> Create New Campaign
            </h1>
            <p className="page-subtitle">
              Launch your project and start raising funds on the blockchain
            </p>
          </div>

          <form onSubmit={handleSubmit} className="campaign-form">
            <div className="form-section">
              <h2 className="section-title">Campaign Details</h2>
              
              <div className="input-group">
                <label className="input-label">Campaign Title *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Campus Innovation Lab"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Description *</label>
                <textarea
                  className="input-field"
                  placeholder="Describe your project, goals, and how funds will be used..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={6}
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">Goal Amount (ALGO) *</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="50"
                    min="1"
                    step="0.1"
                    value={formData.goalAmount}
                    onChange={(e) => setFormData({...formData, goalAmount: e.target.value})}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Duration (days) *</label>
                  <select
                    className="input-field"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Category *</label>
                <select
                  className="input-field"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Technology">Technology</option>
                  <option value="Environment">Environment</option>
                  <option value="Education">Education</option>
                  <option value="Sports">Sports</option>
                  <option value="Arts">Arts & Culture</option>
                  <option value="Social">Social Impact</option>
                  <option value="Event">Event</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <FaImage /> Campaign Image
                </label>
                
                <div className="image-upload-section">
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Campaign preview" />
                    </div>
                  )}
                  
                  <div className="upload-options">
                    <div className="upload-option">
                      <label className="upload-btn">
                        <FaUpload /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <p className="upload-hint">JPG, PNG, GIF (Max 5MB)</p>
                    </div>
                    
                    <div className="upload-divider">OR</div>
                    
                    <div className="upload-option">
                      <input
                        type="url"
                        className="input-field"
                        placeholder="https://example.com/image.jpg"
                        value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl}
                        onChange={(e) => handleImageUrlChange(e.target.value)}
                      />
                      <p className="upload-hint">Enter image URL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !activeAddress}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner-small"></div>
                    Creating Campaign...
                  </>
                ) : (
                  <>
                    <FaRocket /> Launch Campaign
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;

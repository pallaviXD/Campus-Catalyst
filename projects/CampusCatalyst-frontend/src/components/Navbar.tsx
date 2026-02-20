import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaRocket, FaWallet, FaUser, FaSignOutAlt, 
  FaBars, FaTimes, FaPlus, FaHome
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useAlgorand } from '../hooks/useAlgorand';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { 
    activeAddress, 
    balance, 
    isConnected, 
    connectWallet, 
    disconnectWallet,
    formatAddress
  } = useAlgorand();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (isConnected) {
      disconnectWallet();
    }
    navigate('/login');
  };

  const handleConnectWallet = async () => {
    const result = await connectWallet();
    if (result.success) {
      console.log('Wallet connected:', result.address);
    } else {
      alert(`Failed to connect wallet: ${result.error}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-brand">
            <FaRocket className="brand-icon" />
            <span className="brand-text">Campus<span className="text-red">Catalyst</span></span>
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/dashboard" className="nav-link">
              <FaHome /> Dashboard
            </Link>
            <Link to="/create-campaign" className="nav-link">
              <FaPlus /> Create Campaign
            </Link>
            <Link to="/my-campaigns" className="nav-link">
              My Campaigns
            </Link>
          </div>

          <div className="navbar-actions">
            {isConnected && activeAddress ? (
              <div className="wallet-info">
                <div className="wallet-badge">
                  <FaWallet />
                  <div className="wallet-details">
                    <span className="wallet-address">{formatAddress(activeAddress)}</span>
                    <span className="wallet-balance">{balance.toFixed(2)} ALGO</span>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={handleConnectWallet} className="btn btn-outline btn-sm">
                <FaWallet /> Connect Pera Wallet
              </button>
            )}

            <div className="user-menu-container">
              <button
                className="user-avatar"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FaUser />
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user?.name}</p>
                    <p className="user-email">{user?.email}</p>
                    {isConnected && (
                      <p className="user-wallet">{formatAddress(activeAddress)}</p>
                    )}
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item">
                    <FaUser /> Profile
                  </Link>
                  {isConnected && (
                    <button onClick={disconnectWallet} className="dropdown-item">
                      <FaWallet /> Disconnect Wallet
                    </button>
                  )}
                  <button onClick={handleLogout} className="dropdown-item">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

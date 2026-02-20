import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import '../styles/Auth.css';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/verify-email');
      }, 2000);
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-background">
          <div className="auth-glow"></div>
        </div>
        <div className="auth-content">
          <div className="auth-card fade-in text-center">
            <FaCheckCircle className="success-icon" />
            <h2>Account Created!</h2>
            <p>Please check your email to verify your account.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-glow"></div>
      </div>
      
      <div className="auth-content">
        <div className="auth-logo-section">
          <div className="logo-container">
            <Logo size={280} />
          </div>
          <h1 className="auth-brand">CampusCatalyst</h1>
          <p className="auth-tagline">Fueling Campus Dreams Together</p>
        </div>

        <div className="auth-card fade-in">
          <div className="auth-header">
            <h2 className="auth-title">Join CampusCatalyst</h2>
            <p className="auth-subtitle">Start funding your campus dreams</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label className="input-label">
                <FaUser className="input-icon" />
                Full Name
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <FaEnvelope className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <FaLock className="input-icon" />
                Password
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <FaLock className="input-icon" />
                Confirm Password
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-options">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner-small"></div>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="link-teal">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

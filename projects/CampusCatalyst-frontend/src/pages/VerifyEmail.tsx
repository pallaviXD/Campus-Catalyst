import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    try {
      await verifyEmail(code);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid verification code');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-glow"></div>
      </div>
      
      <div className="auth-content">
        <div className="auth-card fade-in text-center">
          <FaEnvelope className="auth-icon" style={{ fontSize: '4rem' }} />
          <h1 className="auth-title">Verify Your Email</h1>
          <p className="auth-subtitle">
            We've sent a verification code to your email
          </p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleVerify} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                className="input-field text-center"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                style={{ fontSize: '1.5rem', letterSpacing: '0.5rem' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Didn't receive the code?{' '}
              <button className="link-red" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

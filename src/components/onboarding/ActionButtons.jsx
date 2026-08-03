import React from 'react';
import { theme } from './onboardingTheme';

const ActionButtons = ({ loading, onGenerate, onReset }) => {
  const buttonStyle = {
    padding: '10px 24px', // More compact padding
    borderRadius: '100px',
    border: 'none',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'Google Sans Flex, sans-serif',
    transition: 'all 0.2s ease',
  };

  const primaryStyle = {
    ...buttonStyle,
    backgroundColor: loading ? '#9CA3AF' : theme.colors.primary,
    color: theme.colors.white,
    cursor: loading ? 'not-allowed' : 'pointer',
    boxShadow: loading ? 'none' : '0 4px 12px rgba(211, 92, 24, 0.25)',
  };

  const resetStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#EF4444',
    border: 'none'
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
      
      <button 
        style={primaryStyle} 
        onClick={onGenerate} 
        disabled={loading}
        onMouseOver={(e) => { if(!loading) e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseOut={(e) => { if(!loading) e.currentTarget.style.transform = 'translateY(0)' }}
      >
        {loading ? 'Processing...' : 'Generate Pass & Send Email'}
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: '#E2E8F0', margin: '0 4px' }}></div>

      <button 
        style={resetStyle} 
        onClick={onReset}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        Reset Form
      </button>
    </div>
  );
};

export default ActionButtons;
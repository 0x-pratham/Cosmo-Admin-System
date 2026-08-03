    import React from 'react';

const WelcomeHero = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <img 
        src="https://cosmolix.co.in/logo/cosmolix-logo.png" 
        alt="Cosmolix Logo" 
        style={{ height: '60px', marginBottom: '25px' }} 
      />
      <h1 style={{ 
        fontFamily: 'Times New Roman, serif', 
        fontSize: '42px', 
        color: '#111', 
        margin: '0 0 10px 0',
        fontWeight: 'bold'
      }}>
        Welcome to <span style={{ color: '#D35C18' }}>Cosmolix</span>
      </h1>
      <p style={{ 
        fontSize: '18px', 
        color: '#666', 
        margin: 0,
        fontWeight: '500'
      }}>
        The Journey Starts Here. Let's build something amazing together.
      </p>
    </div>
  );
};

export default WelcomeHero;
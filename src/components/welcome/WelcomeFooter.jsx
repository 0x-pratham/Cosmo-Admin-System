import React from 'react';

const WelcomeFooter = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px 0', borderTop: '1px solid #E2E8F0' }}>
      <p style={{ 
        fontFamily: 'Times New Roman, serif', 
        fontSize: '18px', 
        color: '#444',
        fontStyle: 'italic',
        marginBottom: '20px'
      }}>
        "We believe in pushing boundaries and creating impact. Welcome aboard!"
        <br />
        <span style={{ fontSize: '14px', fontWeight: 'bold', fontStyle: 'normal', display: 'block', marginTop: '10px' }}>
          - Prathamesh Bhil, CEO
        </span>
      </p>
      
      <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
        © {new Date().getFullYear()} Cosmolix Private Limited. All rights reserved.
      </p>
    </div>
  );
};

export default WelcomeFooter;
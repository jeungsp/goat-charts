import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
      gap: '10px'
    }}>
      <button
        onClick={() => setLanguage('ko')}
        style={{
          padding: '8px 16px',
          backgroundColor: language === 'ko' ? '#007bff' : '#f0f0f0',
          color: language === 'ko' ? 'white' : 'black',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: language === 'ko' ? 'bold' : 'normal'
        }}
      >
        한국어
      </button>
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '8px 16px',
          backgroundColor: language === 'en' ? '#007bff' : '#f0f0f0',
          color: language === 'en' ? 'white' : 'black',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: language === 'en' ? 'bold' : 'normal'
        }}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;

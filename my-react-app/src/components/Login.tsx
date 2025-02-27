import React, { useState } from 'react';
import { useLanguage, translations } from '../context/LanguageContext';

interface LoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '380303') {
      onLogin(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      setError(language === 'ko' ? '비밀번호가 올바르지 않습니다' : 'Incorrect password');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '300px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {language === 'ko' ? '비밀번호 입력' : 'Enter Password'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={language === 'ko' ? '비밀번호' : 'Password'}
            style={{
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          />
          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          <button
            type="submit"
            style={{
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            {language === 'ko' ? '로그인' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

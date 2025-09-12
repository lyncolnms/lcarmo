import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #3a7bd5 100%)',
      color: 'white',
      padding: '1.5rem 2rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          <Link to="/" style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <i className="fa fa-user" style={{ fontSize: '1.5rem' }}></i>
            Lyncoln Carmo
          </Link>
        </div>
        <nav>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            gap: '2rem',
            margin: 0,
            padding: 0
          }}>
            <li>
              <Link to="/" style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '500',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <i className="fa fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/curriculum" style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '500',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <i className="fa fa-file-text"></i> Currículo
              </Link>
            </li>
            <li>
              <Link to="/coffee" style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '500',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <i className="fa fa-coffee"></i> Café
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

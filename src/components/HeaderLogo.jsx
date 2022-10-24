import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <div className="logo-block">
      <div className="wrapper">
        <Link to="/" className="logo">Logo</Link>
      </div>
    </div>
  );
};

export default HeaderLogo;

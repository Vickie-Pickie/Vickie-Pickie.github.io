import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderLogo from '../../components/HeaderLogo';
import HeaderMenu from '../../components/HeaderMenu';
import SearchForm from '../../components/search/SearchForm';
import Steps from '../../components/Steps';
import Footer from '../../components/Footer';

const MainLayout = () => {
  return (
    <>
      <header className="header">
        <HeaderLogo />
        <HeaderMenu />
        <div className="wrapper">
          <SearchForm orientation="wide" />
        </div>
        <Steps />
      </header>
      <main className="main">
        <div className="wrapper">
          <div className="content">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

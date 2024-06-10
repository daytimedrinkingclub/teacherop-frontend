import React from 'react';
import Navbar from './Navbar/Navbar';
import HeroSection from './Home/HeroSection';
import Footer from './Footer/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Layout;

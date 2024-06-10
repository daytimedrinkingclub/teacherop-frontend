import React from 'react';
import UserData from './UserData';
import Plan from './Plan';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const AccountLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8 text-primary-color">Your Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Plan />
          <UserData />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountLayout;
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const PrivateLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PrivateLayout;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const merchantMetadata = useSelector((state) => state.merchantMetadata);
  const [merchantName, setMerchantName] = useState("");
  const [merchantLogo, setMerchantLogo] = useState("");
  const [backgroundColor, setBackgroundColor] = useState('');
  const [foregroundColor, setForegroundColor] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');

  useEffect(() => {
    if (merchantMetadata && merchantMetadata.data ) {
      setMerchantLogo(merchantMetadata.data.merchantLogo);
      setMerchantName(merchantMetadata.data.merchantName);
      if (merchantMetadata.data.theme) {
      setBackgroundColor(merchantMetadata.data.theme['--background'] || '');
      setForegroundColor(merchantMetadata.data.theme['--foreground'] || '');
      setPrimaryColor(merchantMetadata.data.theme['--primary'] || '');
      }
    }
  }, [merchantMetadata]);

  return (
    <footer style={{ backgroundColor: backgroundColor, color: foregroundColor }} className="px-4 fixed w-full bottom-0 py-6">
      <div className="w-full flex flex-col justify-center mx-auto text-center">
      <img src={merchantLogo} alt="Logo" className=" h-[30px] w-[30px] mx-auto mb-[10px] " />
        <ul className="flex flex-wrap justify-center items-center gap-4 mb-4">
          <li><a href="#home" style={{ color: primaryColor }}>Home</a></li>
          <li><a href="#about" style={{ color: primaryColor }}>About Us</a></li>
          <li><a href="#services" style={{ color: primaryColor }}>Services</a></li>
          <li><a href="#contact" style={{ color: primaryColor }}>Contact</a></li>
        </ul>
        <p style={{ color: foregroundColor }} className="text-sm">
          © {new Date().getFullYear()} {merchantName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

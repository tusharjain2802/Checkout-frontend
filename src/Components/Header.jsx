import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const Header = () => {
  const merchantMetadata = useSelector((state) => state.merchantMetadata);
  const [merchantName, setmerchantName] = useState("");
  const [merchantLogo, setmerchantLogo] = useState("");
  const [backgroundColor, setbackgroundColor] = useState("hsl(20, 14.3%, 4.1%)");
  const [foregroundColor, setforegroundColor] = useState("hsl(60, 9.1%, 97.8%)");
  const [primaryColor, setprimaryColor] = useState("hsl(47.9, 95.8%, 53.1%)");
  const [primaryforeColor, setprimaryforeColor] = useState("hsl(26, 83.3%, 14.1%)");
  
  useEffect(() => {
    if (merchantMetadata && merchantMetadata.data) {
      setmerchantLogo(merchantMetadata.data.merchantLogo);
      setmerchantName(merchantMetadata.data.merchantName);
  
      
      if (merchantMetadata.data.theme) {
        setbackgroundColor(merchantMetadata.data.theme['--background'])
        setforegroundColor(merchantMetadata.data.theme['--foreground'])
        setprimaryColor(merchantMetadata.data.theme['--primary'])
        setprimaryforeColor(merchantMetadata.data.theme['--primary-foreground'])
      }
    }
  }, [merchantMetadata]);
  
  return (
    <div style={{backgroundColor : backgroundColor}} className="flex fixed w-full items-center justify-between p-4">
      <div className="flex items-center">
        <img src={merchantLogo} alt="Logo" className="h-8 mr-3" />
        <span style={{color:foregroundColor}} className="font-bold">{merchantName}</span>
      </div>
      <nav>
        <ul className="flex space-x-4 text-black">
          <li style={{ color: primaryColor }} className="hoverEffect transition-colors duration-150 cursor-pointer">Home</li>
          <li style={{ color: primaryColor }} className="hoverEffect transition-colors duration-150 cursor-pointer">About</li>
          <li style={{ color: primaryColor }} className="hoverEffect transition-colors duration-150 cursor-pointer">Services</li>
          <li style={{ color: primaryColor }} className="hoverEffect transition-colors duration-150 cursor-pointer">Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

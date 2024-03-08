import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import hambueger from "../assets/images/hambueger.png";
import { Link } from "react-router-dom";

const Header = () => {
  const merchantMetadata = useSelector((state) => state.merchantMetadata);
  const [merchantName, setMerchantName] = useState("");
  const [merchantLogo, setMerchantLogo] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [foregroundColor, setForegroundColor] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryForeColor, setPrimaryForeColor] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (merchantMetadata && merchantMetadata.data) {
      setMerchantLogo(merchantMetadata.data.merchantLogo);
      setMerchantName(merchantMetadata.data.merchantName);

      if (merchantMetadata.data.theme) {
        setBackgroundColor(merchantMetadata.data.theme['--background']);
        setForegroundColor(merchantMetadata.data.theme['--foreground']);
        setPrimaryColor(merchantMetadata.data.theme['--primary']);
        setPrimaryForeColor(merchantMetadata.data.theme['--primary-foreground']);
      }
    }
  }, [merchantMetadata]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ backgroundColor }} className="flex fixed w-full items-center justify-between p-4">
      <div className="flex items-center">
      <Link to="/"><img src={merchantLogo} alt="Logo" className="h-8 mr-3" /></Link>
        <Link to="/"><span style={{ color: foregroundColor }} className="font-bold">{merchantName}</span></Link>
      </div>
      <div className="md:hidden">
       {isMenuOpen? <div onClick={toggleMenu} className="text-white cursor-pointer absolute top-[20px] right-[23%] ">X</div> :<button onClick={toggleMenu}>
          <img
              className="w-[24px] h-[15px] ml-[14px]"
              draggable="false"
              src={hambueger}
              alt="hamburger"
            />
        </button>}
      </div>
      <nav className={`md:block ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 text-black">
          <li style={{ color: primaryColor, backgroundColor: primaryForeColor }} className="px-[20px] py-[6px] rounded-lg transition-colors duration-150 cursor-pointer">Home</li>
          <li style={{ color: primaryColor, backgroundColor: primaryForeColor }} className="px-[20px] py-[6px] rounded-lg transition-colors duration-150 cursor-pointer">About</li>
          <li style={{ color: primaryColor, backgroundColor: primaryForeColor }} className="px-[20px] py-[6px] rounded-lg transition-colors duration-150 cursor-pointer">Services</li>
          <li style={{ color: primaryColor, backgroundColor: primaryForeColor }} className="px-[20px] py-[6px] rounded-lg transition-colors duration-150 cursor-pointer">Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

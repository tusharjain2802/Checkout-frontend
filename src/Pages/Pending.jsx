import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Loading from '../assets/images/loading.gif';

const Pending = () => {
  const merchantMetadata = useSelector((state) => state.merchantMetadata);

  const [backgroundColor, setBackgroundColor] = useState("");
  const [foregroundColor, setForegroundColor] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryForeColor, setPrimaryForeColor] = useState("");

  useEffect(() => {
    if (merchantMetadata && merchantMetadata.data && merchantMetadata.data.theme) {
      setBackgroundColor(merchantMetadata.data.theme['--background'] || '');
      setForegroundColor(merchantMetadata.data.theme['--foreground'] || '');
      setPrimaryColor(merchantMetadata.data.theme['--primary'] || '');
      setPrimaryForeColor(merchantMetadata.data.theme['--primary-foreground'] || '');
    }
  }, [merchantMetadata]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10`} style={{backgroundColor: backgroundColor, color: foregroundColor}}>
      <img src={Loading} alt="Loading" className="w-24 h-24 mb-4 sm:w-32 sm:h-32" />
      <h1 className={`text-xl sm:text-2xl md:text-4xl font-bold mb-4`} style={{color: primaryColor}}>Payment Pending</h1>
      <div className={`p-4 rounded-lg text-center sm:text-left`} style={{backgroundColor: primaryForeColor, color: primaryColor}}>
        <p>Open the UPI app to approve the payment request from {merchantMetadata?.data?.merchantName}.</p>
      </div>
    </div>
  );
};

export default Pending;

import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import successTickGif from '../assets/images/failed.gif';

const Failed = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center" style={{backgroundColor: backgroundColor, color: foregroundColor}}>
      <img src={successTickGif} alt="Success" className="w-32 h-32 mb-4" />
      <h1 className="text-2xl md:text-4xl font-bold mb-4" style={{color: primaryColor}}>Payment Failed</h1>
    </div>
  );
};

export default Failed;

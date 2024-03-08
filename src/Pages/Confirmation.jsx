import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import successTickGif from '../assets/images/verified.gif';
import toast from "react-hot-toast";

const PaymentConfirmation = () => {
  const showErrorToastMessage = (message) => {
    toast.error(message);
  };

  const orderDetails = useSelector((state) => state.orderDetails);
  const merchantMetadata = useSelector((state) => state.merchantMetadata);
  const name = orderDetails.name; 
  const address = orderDetails.address; 
  const amount = orderDetails.totalAmount; 

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

  useEffect(() => {
    if (!orderDetails.name) {
      showErrorToastMessage("Provide your details i.e. name, address before payment.");
    }
    else if (orderDetails.totalAmount === 0) {
      showErrorToastMessage("Your cart is empty.");
    }
  }, [orderDetails.totalAmount, orderDetails.name]);

  if (orderDetails.name && orderDetails.address && orderDetails.totalAmount) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{backgroundColor: backgroundColor, color: foregroundColor}}>
        <img src={successTickGif} alt="Success" className="w-32 h-32 mb-4" />
        <h1 className="text-2xl md:text-4xl font-bold mb-4" style={{color: primaryColor}}>Payment Successful !!</h1>
        <div className="p-4 rounded-lg" style={{backgroundColor: primaryForeColor, color: primaryColor}}>
          <h2 className="text-xl font-bold">Order Details:</h2>
          <p className="mt-2">For {name}</p>
          <p>{address}</p>
          <p className="mt-4 font-bold">Total Amount: ₹{amount}</p> 
        </div>
      </div>
    );
  }

  return null;
};


export default PaymentConfirmation;

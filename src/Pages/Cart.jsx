import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import noData from "../assets/images/noData.png";
import { Link } from "react-router-dom";
const Cart = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const products = orderDetails.data.products || [];
  const merchantMetadata = useSelector((state) => state.merchantMetadata);

  const [backgroundColor, setBackgroundColor] = useState("");
  const [foregroundColor, setForegroundColor] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryForeColor, setPrimaryForeColor] = useState("");
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  useEffect(() => {
    if (merchantMetadata && merchantMetadata.data && merchantMetadata.data.theme) {
      setBackgroundColor(merchantMetadata.data.theme['--background'] || '');
      setForegroundColor(merchantMetadata.data.theme['--foreground'] || '');
      setPrimaryColor(merchantMetadata.data.theme['--primary'] || '');
      setPrimaryForeColor(merchantMetadata.data.theme['--primary-foreground'] || '');
    }

    setShowPaymentButton(products.length > 0);
  }, [merchantMetadata, products]);

  const orderTotal = products.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div style={{ backgroundColor: backgroundColor, color: foregroundColor }} className="px-4 sm:px-6 md:px-10 py-[100px]  min-h-screen">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6" style={{ color: primaryColor }}>Your Cart</h2>
      {products.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full text-center">
          <img src={noData} alt="No data available" className="max-w-full h-auto sm:w-3/4 md:w-1/2" />
          <h1 style={{ color: primaryColor }} className="font-bold text-xl sm:text-2xl md:text-3xl mt-4">No Items in the Cart</h1>
        </div>
      ) : (
        <>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="flex flex-row justify-between items-center mb-4 p-4 rounded-lg" style={{ backgroundColor: primaryForeColor }}>
                <div className="flex items-center mb-4 md:mb-0">
                  <img src={product.image} alt={product.title} className="h-20 w-20 md:h-24 md:w-24 mr-4" />
                  <div>
                    <p className="font-semibold text-lg md:text-xl" style={{ color: primaryColor }}>{product.title}</p>
                    <p className="text-sm md:text-base">Qty: {product.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-lg md:text-xl">₹{product.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6 p-4 rounded-lg" style={{ backgroundColor: primaryForeColor, color: primaryColor }}>
            <h3 className="text-xl md:text-2xl font-bold">Total</h3>
            <span className="font-bold text-xl md:text-2xl">₹{orderTotal.toFixed(2)}</span>
          </div>
          {showPaymentButton && (
           <Link to="/payment"> <button className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out" style={{ backgroundColor: primaryColor }}>Proceed to Payment</button></Link>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;

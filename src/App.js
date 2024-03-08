import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderDetails } from './store/slices/orderDetailsSlice';
import { fetchMerchantMetadata } from './store/slices/merchantMetadataSlice';
import Loader from "./Components/Loader/Loader.jsx";
import LoadingBar from "react-top-loading-bar";
import AllRoutes from "./AllRoutes/AllRoutes";
import { Toaster } from "react-hot-toast";
import './index.css';

function App() {
  const merchantMetadata = useSelector((state) => state.merchantMetadata);
  const orderDetails = useSelector(state => state.orderDetails);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(50);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails());
    dispatch(fetchMerchantMetadata());
  }, [dispatch]);

  useEffect(() => {
    const incrementProgress = () => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 70
      );
    };

    const timer = setInterval(() => {
      if (loading) {
        incrementProgress();
      }
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  useEffect(() => {
    if (merchantMetadata.status === 'succeeded') {
      const bgColor = merchantMetadata.data.theme['--background'];
      document.body.style.backgroundColor = bgColor; // Setting the background color globally
    }
  }, [merchantMetadata.status, merchantMetadata.data]);

  if (merchantMetadata.status === 'loading' || orderDetails.status === 'loading') {
    return <Loader />;
  }
  if (merchantMetadata.status === 'failed') {
    return <div>Error fetching merchant metadata: {merchantMetadata.error}</div>;
  }

  if (orderDetails.status === 'failed') {
    return <div>Error fetching order details: {orderDetails.error}</div>;
  }

  return (
    <div className="App">
      <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setLoading(false)}
        />
        
        <AllRoutes />
        <Toaster />
    </div>
  );
}

export default App;

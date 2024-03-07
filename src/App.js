import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchOrderDetails } from './store/slices/orderDetailsSlice';
import { fetchMerchantMetadata } from './store/slices/merchantMetadataSlice';

import LoadingBar from "react-top-loading-bar";
import AllRoutes from "./AllRoutes/AllRoutes";
import './index.css';
function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(50);

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails());
    dispatch(fetchMerchantMetadata());

    // Set up a timer to fetch data every 5 minutes
    const intervalId = setInterval(() => {
      dispatch(fetchOrderDetails());
      dispatch(fetchMerchantMetadata());
    }, 60000); // 60000 ms = 1 minutes

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="App">
    <LoadingBar
        color="#000000"
        progress={progress}
        onLoaderFinished={() => setLoading(false)}
      />
      <AllRoutes />
    </div>
  );
}

export default App;

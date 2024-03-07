import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderDetails } from './store/slices/orderDetailsSlice';
import { fetchMerchantMetadata } from './store/slices/merchantMetadataSlice';
import Loader from "./Components/Loader/Loader.jsx";
import LoadingBar from "react-top-loading-bar";
import AllRoutes from "./AllRoutes/AllRoutes";
import './index.css';
function App() {
  const merchantMetadata = useSelector((state) => state.merchantMetadata);
  const orderDetails = useSelector(state => state.orderDetails);
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

  if (merchantMetadata.status === 'loading' || orderDetails.status === 'loading') {
    return <div><Loader /></div>;
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
        color="#000000"
        progress={progress}
        onLoaderFinished={() => setLoading(false)}
      />
      
      <AllRoutes />
    </div>
  );
}

export default App;

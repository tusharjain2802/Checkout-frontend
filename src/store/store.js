import { configureStore } from '@reduxjs/toolkit';
import orderDetailsReducer from './slices/orderDetailsSlice';
import merchantMetadataReducer from './slices/merchantMetadataSlice';

export const store = configureStore({
  reducer: {
    orderDetails: orderDetailsReducer,
    merchantMetadata: merchantMetadataReducer,
  },
});

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchOrderDetails = createAsyncThunk(
  'orderDetails/fetchOrderDetails',
  async () => {
    const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details');
    const data = await response.json();
    return data;
  }
);

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    data: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default orderDetailsSlice.reducer;

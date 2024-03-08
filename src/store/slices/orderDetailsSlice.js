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
    name: '',
    address: '',
    totalAmount: 0,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
  },
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

export const { setName, setAddress, setTotalAmount } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMerchantMetadata = createAsyncThunk(
  'merchantMetadata/fetchMerchantMetadata',
  async () => {
    const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata');
    const data = await response.json();
    return data;
  }
);

export const merchantMetadataSlice = createSlice({
  name: 'merchantMetadata',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMerchantMetadata.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMerchantMetadata.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMerchantMetadata.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default merchantMetadataSlice.reducer;

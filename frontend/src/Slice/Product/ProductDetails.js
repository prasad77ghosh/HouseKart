import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "../../services/productService";
import { STATUSES } from "../../status";

// get product details
const ProductDetails = createSlice({
  name: "ProductDetails",
  initialState: {
    product: {},
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default ProductDetails.reducer;

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id) => {
    const res = await ProductServices.productDetails(id);
    const data = res.data;
    return data;
  }
);

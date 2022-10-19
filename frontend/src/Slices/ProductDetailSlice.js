import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "../Services/productServices";

const initialState = {
  product: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const ProductDetails = createAsyncThunk(
  "products/productDetail",
  async (id,thunkAPI) => {
    try {
      const res = await ProductServices.productDetails(id);
      const data = res.data.product;
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const ProductDetailSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(ProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.product = null;
      });
  },
});

export const { reset } = ProductDetailSlice.actions;
export default ProductDetailSlice.reducer;

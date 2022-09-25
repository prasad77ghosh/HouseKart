import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "../../services/productService";
import { STATUSES } from "../../status";

//get all products slice
const productSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
    productCount: 0,
    resultPerPage: 0,
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.status = STATUSES.SUCCESS;
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default productSlice.reducer;

export const allProducts = createAsyncThunk(
  "products/all",
  async ({ keyword, currentPage }) => {
    const res = await ProductServices.getAllProducts(keyword, currentPage);
    const data = res.data;
    return data;
  }
);

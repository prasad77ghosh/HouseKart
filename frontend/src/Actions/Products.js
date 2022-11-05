import axios from "axios";
import http from "../http";

export const allProducts =
  (currentPage = 1) =>
  async (dispatch) => {
    dispatch({
      type: "getAllProductsReqest",
    });
    const url = `/products?page=${currentPage}`;
    try {
      const { data } = await http.get(url);
      dispatch({
        type: "getAllProductsSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAllProductsFailure",
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

// Product Details
export const productDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductDetailsReqest",
    });
    const url = `/product/${id}`;
    const { data } = await http.get(url);
    const product = data.product;

    dispatch({
      type: "getProductDetailsSuccess",
      payload: product,
    });
  } catch (error) {
    dispatch({
      type: "getProductDetailsFailure",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

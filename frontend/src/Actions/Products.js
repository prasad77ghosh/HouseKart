import http from "../http";

export const allProducts =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    const url = `/products?keyword=${keyword}&page=${currentPage}`;
    try {
      dispatch({
        type: "getAllProductsReqest",
      });
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

// all Raw Products
export const allRawProducts = () => async (dispatch) => {
  const url = "/raw/products";
  try {
    dispatch({
      type: "getAllRawProductsReqest",
    });
    const { data } = await http.get(url);

    dispatch({
      type: "getAllRawProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllRawProductsFailure",
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

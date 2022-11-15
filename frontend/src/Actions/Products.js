import http from "../http";

export const allProducts =
  (keyword = "", currentPage = 1, price = [0, 200000], category, ratings = 0) =>
  async (dispatch) => {
    let url = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      url = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

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

// submit review
export const reviewSubmit = (myForm) => async (dispatch) => {
  const url = "/review";
  try {
    dispatch({
      type: "reviewSubmitRequest",
    });
    const { data } = await http.put(url, myForm);
    dispatch({
      type: "reviewSubmitSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "reviewSubmitFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

import http from "../http";

const getAllProducts = (keyword = "") => {
  let link = `/products?keyword=${keyword}`;
  return http.get(link);
};

const productDetails = (id) => {
  return http.get(`/product/${id}`);
};

const ProductServices = {
  getAllProducts,
  productDetails,
};

export default ProductServices;

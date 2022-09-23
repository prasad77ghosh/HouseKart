import http from "../http";

const getAllProducts = () => {
  return http.get("/products");
};

const productDetails = (id) => {
  return http.get(`/product/${id}`);
};

const ProductServices = {
  getAllProducts,
  productDetails,
};

export default ProductServices;

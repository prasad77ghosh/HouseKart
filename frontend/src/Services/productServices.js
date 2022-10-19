import http from "../http";
const allProducts = async () => {
  // let link = "/products"
  return await http.get("/products");
};

const productDetails = async (id) => {
  return await http.get(`product/${id}`);
};

const ProductServices = {
  allProducts,
  productDetails,
};

export default ProductServices;

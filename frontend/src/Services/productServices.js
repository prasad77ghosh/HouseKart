import http from "../http";
const allProducts = async (keyword = "", currentPage = 1) => {
  let link = `/products?${keyword}&page=${currentPage}`;
  return await http.get(link);
};

const productDetails = async (id) => {
  return await http.get(`product/${id}`);
};

const ProductServices = {
  allProducts,
  productDetails,
};

export default ProductServices;

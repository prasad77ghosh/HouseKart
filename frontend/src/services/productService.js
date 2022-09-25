import http from "../http";

const getAllProducts = (keyword = "", currentPage = 1) => {

  let link = `/products?keyword=${keyword}&page=${currentPage}`;
  // console.log(keyword);
  // console.log(currentPage);
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

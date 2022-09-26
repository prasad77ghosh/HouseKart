import http from "../http";

const getAllProducts = (
  keyword = "",
  currentPage = 1,
  price = [0, 20000],
  Category = "",
  ratings = 0
) => {
  let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

  if (Category) {
    link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${Category}&ratings[gte]=${ratings}`;
  }

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

const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(isAuthUser, getAllProducts);
router.route("/product/new").post(isAuthUser,createProduct);
router
  .route("/product/:id")
  .put(isAuthUser, updateProduct)
  .delete(isAuthUser, deleteProduct)
  .get(getProductDetails);

module.exports = router;

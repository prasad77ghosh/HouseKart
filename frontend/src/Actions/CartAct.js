import http from "../http";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const url = `product/${id}`;

  const { data } = await http.get(url);

  dispatch({
    type: "addToCart",
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("Cart_Items", JSON.stringify(getState().Cart.CartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: id,
  });

  localStorage.setItem("Cart_Items", JSON.stringify(getState().Cart.CartItems));
};

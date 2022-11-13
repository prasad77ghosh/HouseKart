import http from "../http";

export const orderCreation = (order) => async (dispatch) => {
  const url = "/order/new";
  try {
    dispatch({
      type: "createOrderRequest",
    });
    const { data } = await http.post(url, order);
    dispatch({
      type: "createOrderSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

//  all Orders of user
export const myOrders = () => async (dispatch) => {
  const url = "/orders/me";
  try {
    dispatch({
      type: "myOrderRequest",
    });

    const { data } = await http.get(url);
    dispatch({
      type: "myOrderSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "myOrderFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

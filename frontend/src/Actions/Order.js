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

//order Details
export const detailsOfOrder = (id) => async (dispatch) => {
  const url = `/order/${id}`;
  try {
    dispatch({
      type: "orderDetailsRequest",
    });

    const { data } = await http.get(url);
    dispatch({
      type: "orderDetailsSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "orderDetailsFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

//get all orders admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  const url = "/admin/orders";
  try {
    dispatch({
      type: "getAllOrderRequest",
    });

    const { data } = await http.get(url);
    dispatch({
      type: "getAllOrderSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrderFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

//delete Order action
export const deleteOrderOfAdmin = (id) => async (dispatch) => {
  const url = `/admin/order/${id}`;
  try {
    dispatch({
      type: "deleteOrderRequest",
    });

    const { data } = await http.delete(url);
    dispatch({
      type: "deleteOrderSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "deleteOrderFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

//update Order action
export const updateOrderOfAdmin = (id, myForm) => async (dispatch) => {
  const url = `/admin/order/${id}`;
  try {
    dispatch({
      type: "updateOrderRequest",
    });

    const { data } = await http.put(url, myForm);
    console.log(data)
    dispatch({
      type: "updateOrderSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "updateOrderFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

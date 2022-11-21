import http from "../http";

export const allUserOfAdmin = () => async (dispatch) => {
  const url = "/admin/users";
  try {
    dispatch({
      type: "getAllUserRequest",
    });

    const { data } = await http.get(url);

    dispatch({
      type: "getAllUserSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUserFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const userDeleteOfAdmin = (id) => async (dispatch) => {
  const url = `/admin/user/${id}`;
  try {
    dispatch({
      type: "deleteUserRequest",
    });

    const { data } = await http.delete(url, id);

    dispatch({
      type: "deleteUserSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

//update user
export const userUpdateOfAdmin = (id, myForm) => async (dispatch) => {
  const url = `/admin/user/${id}`;
  try {
    dispatch({
      type: "updateUserRequest",
    });

    const { data } = await http.put(url, myForm);

    dispatch({
      type: "updateUserSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "updateUserFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const userDetailsOfAdmin = (id) => async (dispatch) => {
  const url = `/admin/user/${id}`;
  try {
    dispatch({
      type: "getUserDetailsRequest",
    });

    const { data } = await http.get(url);

    dispatch({
      type: "getUserDetailsSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "getUserDetailsFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

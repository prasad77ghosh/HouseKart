import http from "../http";
//login user
export const userLogin = (email, password) => async (dispatch) => {
  const url = "/login";
  try {
    dispatch({
      type: "loginUserRequest",
    });
    const { data } = await http.post(url, { email, password });
    dispatch({
      type: "loginUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loginUserFailure",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Register call

export const userRegister =
  (name, email, password, avatar) => async (dispatch) => {
    const url = "/register";

    try {
      dispatch({
        type: "registerUserRequest",
      });

      const { data } = await http.post(url, { name, email, password, avatar });
      dispatch({
        type: "registerUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "registerUserFailure",
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

//load user information
export const userInfo = () => async (dispatch) => {
  const url = "/me";
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const { data } = await http.get(url);
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

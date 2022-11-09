import http from "../http";

export const profileUpdate = (name, email, avatar) => async (dispatch) => {
  const url = "/me/update";

  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await http.put(url, { name, email, avatar });
    dispatch({
      type: "updateProfileSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const passwordUpdate =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    const url = "/password/update";
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await http.put(url, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      dispatch({
        type: "updatePassswordSuccess",
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFail",
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

//forgot password
export const passwordForgot = (email) => async (dispatch) => {
  const url = "/password/forgot";

  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await http.post(url, { email });
    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

//reset password
export const passwordReset =
  (token, password, confirmPassword) => async (dispatch) => {
    const url = `/password/reset/${token}`;

    try {
      dispatch({
        type: "resetPasswordRequest",
      });

      const { data } = await http.put(url, {
        password,
        confirmPassword,
      });
      dispatch({
        type: "resetPasswordSuccess",
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: "resetPasswordFail",
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

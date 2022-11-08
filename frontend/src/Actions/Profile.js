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

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../actions/types";

const initialState = {
  la_token: localStorage.getItem("la_token"),
  isAuthenticated: localStorage.getItem("la_token") ? true : false,
  user: localStorage.getItem("la_token")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("la_token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload));

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("la_token");
      return {
        ...state,
        la_token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;

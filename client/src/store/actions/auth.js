import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../actions/types";
import { setAlert } from "./alert";

const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/login", { email, password });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch(setAlert(err.response.data.message, "danger"));
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
export { login, loadUser, logout };

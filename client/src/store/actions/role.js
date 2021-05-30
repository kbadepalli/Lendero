import axios from "axios";
import {
  GET_ROLES,
  GET_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
  ROLE_ERROR,
} from "./types";
import { setAlert } from "./alert";

const getRoles = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/roles?page=${page ? page : 1}`);

    dispatch({ type: GET_ROLES, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, "danger"));

    dispatch({
      type: ROLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const getRole = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/role/${id}`);

    dispatch({ type: GET_ROLE, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: ROLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const createRole = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/add-role`, data);

    dispatch(
      setAlert(`Role with name ${data.name} has been created`, "success")
    );

    dispatch({ type: GET_ROLE, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: ROLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
const updateRole = (data) => async (dispatch) => {
  try {
    const res = await axios.put(`/edit-role`, data);

    dispatch({ type: UPDATE_ROLE, payload: res.data });
  } catch (err) {
    err.forEach((error) =>
      dispatch(setAlert(err.response.statusText, "danger"))
    );

    dispatch({
      type: ROLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const deleteRole = (id) => async (dispatch) => {
  try {
    await axios.post(`/delete-role`, { id });

    dispatch({ type: DELETE_ROLE, payload: id });
  } catch (err) {
    err.forEach((error) =>
      dispatch(setAlert(err.response.statusText, "danger"))
    );

    dispatch({
      type: ROLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export { getRoles, getRole, createRole, updateRole, deleteRole };

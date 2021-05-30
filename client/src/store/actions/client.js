import axios from "axios";
import {
  GET_CLIENTS,
  GET_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
  CLIENT_ERROR,
} from "./types";
import { setAlert } from "./alert";
const getClients = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/clients?page=${page ? page : 1}`);
    dispatch({ type: GET_CLIENTS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const getClient = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/client/${id}`);
    dispatch({ type: GET_CLIENT, payload: res.data });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
const createClient = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/add-client`, data);

    dispatch(
      setAlert(`Client with email ${data.email} has been created`, "success")
    );

    dispatch({ type: GET_CLIENT, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
const updateClient = (data) => async (dispatch) => {
  try {
    const res = await axios.put(`/edit-client`, data);

    dispatch({ type: UPDATE_CLIENT, payload: res.data });
  } catch (err) {
    err.forEach((error) =>
      dispatch(setAlert(err.response.statusText, "danger"))
    );

    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const deleteClient = (id) => async (dispatch) => {
  try {
    await axios.post(`/delete-client`, { id });

    dispatch({ type: DELETE_CLIENT, payload: id });
  } catch (err) {
    err.forEach((error) =>
      dispatch(setAlert(err.response.statusText, "danger"))
    );

    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export { getClients, getClient, createClient, updateClient, deleteClient };

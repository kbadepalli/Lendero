import axios from 'axios';
import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from './types';
import { setAlert } from './alert';
const getUsers = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/users?page=${page ? page : 1}`);

    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/${id}`);
    dispatch({ type: GET_USER, payload: res.data });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
const createUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/add-user`, data);

    dispatch(
      setAlert(`User with name ${data.email} has been created`, 'success')
    );

    dispatch({ type: GET_USER, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
const updateUser = (data) => async (dispatch) => {
  try {
    const res = await axios.put(`/edit-user`, data);

    dispatch({ type: UPDATE_USER, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.post(`/delete-user`, { id });

    dispatch({ type: DELETE_USER, payload: id });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export { getUsers, getUser, createUser, updateUser, deleteUser };

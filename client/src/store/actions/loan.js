import axios from "axios";
import {
  GET_LOANS,
  GET_LOAN,
  DELETE_LOAN,
  UPDATE_LOAN,
  LOAN_ERROR,
} from "./types";
import { setAlert } from "./alert";
const getLoans = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/loans?page=${page ? page : 1}`);
    dispatch({ type: GET_LOANS, payload: res.data });
  } catch (err) {
    dispatch({
      type: LOAN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const getLoan = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/loan/${id}`);

    dispatch({ type: GET_LOAN, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: LOAN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const createLoan = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/add-loan`, data);

    dispatch(setAlert(`Loan has been created`, "success"));

    dispatch({ type: GET_LOAN, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: LOAN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
const updateLoan = (data) => async (dispatch) => {
  try {
    const res = await axios.put(`/edit-loan`, data);

    dispatch({ type: UPDATE_LOAN, payload: res.data });
  } catch (err) {
    err.forEach((error) =>
      dispatch(setAlert(err.response.statusText, "danger"))
    );

    dispatch({
      type: LOAN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const deleteLoan = (id) => async (dispatch) => {
  try {
    await axios.post(`/delete-loan`, { id });

    dispatch({ type: DELETE_LOAN, payload: id });
  } catch (err) {
    err.forEach((error) =>
      dispatch(setAlert(err.response.statusText, "danger"))
    );

    dispatch({
      type: LOAN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export { getLoans, getLoan, createLoan, updateLoan, deleteLoan };

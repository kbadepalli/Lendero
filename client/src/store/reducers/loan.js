import {
  GET_LOANS,
  GET_LOAN,
  UPDATE_LOAN,
  DELETE_LOAN,
  LOAN_ERROR,
} from "../actions/types";
const initialState = {
  loans: [],
  loan: null,
  loading: true,
  error: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LOANS:
      return {
        ...state,
        loans: payload.loans,
        pager: payload.pager,
        loading: false,
      };
    case GET_LOAN:
      return {
        ...state,
        loan: payload,
        loading: false,
      };
    case UPDATE_LOAN:
      return {
        ...state,
        loan: payload,
        loans: state.loans,
      };
    case DELETE_LOAN:
      return {
        ...state,
        loans: state.loans.filter((loan) => loan.id !== payload),
      };
    case LOAN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;

import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from '../actions/types';
const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload.users,
        pager: payload.pager,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        users: state.users,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
      };
    case USER_ERROR:
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

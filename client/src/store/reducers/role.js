import {
  GET_ROLES,
  GET_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  ROLE_ERROR,
} from "../actions/types";
const initialState = {
  roles: [],
  role: null,
  loading: true,
  error: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ROLES:
      return {
        ...state,
        roles: payload.roles,
        pager: payload.pager,
        loading: false,
      };
    case GET_ROLE:
      return {
        ...state,
        role: payload,
        loading: false,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        role: payload,
        roles: state.roles,
      };
    case DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== payload),
      };
    case ROLE_ERROR:
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

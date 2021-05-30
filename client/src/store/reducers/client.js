import {
  GET_CLIENTS,
  GET_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  CLIENT_ERROR,
} from "../actions/types";
const initialState = {
  clients: [],
  client: null,
  loading: true,
  error: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: payload.clients,
        pager: payload.pager,
        loading: false,
      };
    case GET_CLIENT:
      return {
        ...state,
        client: payload,
        loading: false,
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        client: payload,
        clients: state.clients,
      };
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== payload),
      };
    case CLIENT_ERROR:
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

import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "../actions";

const initialState = {
  friends: [],
  error: "",
  errorStatusCode: null,
  fetchingData: false,
  isLoggingIn: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: true,
        token: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        errorStatusCode: action.payload.status
      };
    case LOGOUT:
      return {
        ...state,
        token: ""
      };
    default:
      return state;
  }
};

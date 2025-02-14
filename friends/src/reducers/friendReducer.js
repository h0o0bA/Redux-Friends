import {
  ADD_FAILURE,
  ADD_SUCCESS,
  FRIENDS_FAILURE,
  FRIENDS_START,
  FRIENDS_SUCCESS
} from "../actions";

const initialState = {
  friends: [],
  isLoading: false,
  error: null
};

export const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIENDS_START:
      return {
        ...state,
        error: "",
        fetchingData: true
      };
    case FRIENDS_SUCCESS:
      return {
        ...state,
        error: "",
        fetchingData: false,
        friends: action.payload
      };
    case FRIENDS_FAILURE:
      return {
        ...state,
        errorStatusCode: action.payload.status
      };
    case ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        friends: action.payload
      };
    case ADD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

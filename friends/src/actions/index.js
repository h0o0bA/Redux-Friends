import axios from "axios";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const FRIENDS_START = "FRIENDS_START";
export const FRIENDS_SUCCESS = "FRIENDS_SUCCESS";
export const FRIENDS_FAILURE = "FRIENDS_FAILURE";

export const ADD_START = "ADD_START";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const ADD_FAILURE = "ADD_FAILURE";

const baseUrl = "http://localhost:5000";

export const handleLogin = user => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post(`${baseUrl}/api/login`, user)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err.response });
    });
};

export const handleGetFriends = () => dispatch => {
  dispatch({ type: FRIENDS_START });
  axios
    .get(`${baseUrl}/api/friends`, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      dispatch({ type: FRIENDS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      if (err.response.status === 403) {
        localStorage.removeItem("token");
      }
      dispatch({ type: FRIENDS_FAILURE, payload: err.response });
    });
};

export const handleAddFriend = (token, friend) => dispatch => {
  dispatch({ type: ADD_START });
  console.log(token);
  axios
    .post(`${baseUrl}/api/friends`, friend, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => dispatch({ type: ADD_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: ADD_FAILURE, payload: err }));
};

export const handleLogout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

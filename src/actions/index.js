import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  DASHBOARD_GET_DATA
} from "./types";

export const oauthGoogle = data => {
  return async dispatch => {
    console.log("we recieved", data);
    const res = await axios.post("/users/oauth/google", {
      access_token: data
    });
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const signUp = data => {
  return async dispatch => {
    try {
      console.log("[ActionCreator] signUp called");
      const res = await axios.post("/users/signup", data);
      console.log("[ActionCreator] signUp dispatched an action");

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use"
      });
      console.log("err", err);
    }
  };
};

export const signIn = data => {
  return async dispatch => {
    try {
      console.log("[ActionCreator] signIn called");
      const res = await axios.post("/users/signin", data);
      console.log("[ActionCreator] signIn dispatched an action");

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email and password combination is not valid"
      });
      console.log("err", err);
    }
  };
};

export const getSecret = () => {
  return async dispatch => {
    try {
      console.log("[ActionCreator] Trying to get BE secret");
      const res = await axios.get("/users/secret");
      console.log("res", res);

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret
      });
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ""
    });
  };
};

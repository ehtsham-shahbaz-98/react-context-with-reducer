import { createContext, useReducer, useEffect } from "react";
import authReducer from "./AuthReducer";

import cookies from "js-cookie";

import { getUserInfo } from "../../services/auth_apis";
import { getToken, logoutUser } from "../../services/auth_apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    loginUser: [],
    getToken: [],
    userInfo: [],
    isAuthenticated: false,
    load: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Disable Loading
  const disableLoading = () => dispatch({ type: "DISABLE_LOADING" });

  const getTokenDispatch = (token) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      isAuthState();
      dispatch({ type: "GET_TOKEN", payload: token });
    }
    // const {access_token} = token;
  };
  // Set Is Auth
  const isAuthState = () => dispatch({ type: "SET_AUTH" });

  const getUserLoggedIn = async () => {
    try {
      setLoading();
      const res = await getUserInfo();
      if (res.status === 200) {
        dispatch({ type: "SET_USER_INFO", payload: res.data });
        disableLoading();
      }
    } catch (err) {
      console.log("Error: ", err);
      disableLoading();
    }
  };

  const setLogoutUser = async () => {
    try {
      setLoading();
      const res = await logoutUser();
      if (res.status === 200) {
        cookies.remove(".AspNetCore.Antiforgery.iGiImT82Iso");
        cookies.remove(".AspNetCore.Identity.Application");
        cookies.remove(".AspNetCore.Session");
        cookies.remove("idsrv.session");
        localStorage.removeItem("accessToken");
        dispatch({ type: "LOGOUT_USER" });
        disableLoading();
      }
    } catch (err) {
      console.log("Error: ", err.message);
      disableLoading();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        load: state.load,
        loginUser: state.loginUser,
        getToken: state.getToken,
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo,
        setLoading,
        disableLoading,
        isAuthState,
        getTokenDispatch,
        setLogoutUser,
        getUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

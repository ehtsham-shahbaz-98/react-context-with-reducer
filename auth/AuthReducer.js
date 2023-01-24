const authReducer = (state, action) => {
  switch (action.type) {
    case "GET_TOKEN":
      return {
        ...state,
        getToken: action.payload,
        isAuthenticated: true,
      };
    case "GET_LOGIN_USER":
      return {
        ...state,
        loginUser: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        getToken: [],
        isAuthenticated: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        load: true,
      };
    case "SET_USER_INFO": 
      return {
        ...state,
        userInfo: action.payload,
      };
    case "SET_AUTH":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "DISABLE_LOADING":
      return {
        ...state,
        load: false,
      };
    default:
      return state;
  }
};

export default authReducer;

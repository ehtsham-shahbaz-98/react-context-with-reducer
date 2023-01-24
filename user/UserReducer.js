const userReducer = (state, action) => {
    switch (action.type) {
      case "GET_USERS":
        return {
          ...state,
          usersData: action.payload,
          load: false,
        };
      case "SET_LOADING":
        return {
          ...state,
          load: true,
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
  
  export default userReducer;
  
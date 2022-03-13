const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "AUTHORIZATION_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "AUTHORIZATION_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "AUTHORIZATION_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;

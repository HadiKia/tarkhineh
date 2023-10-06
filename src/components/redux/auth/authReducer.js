const initialState = {
    isLoggedIn: !!localStorage.getItem('phoneNumber'),
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOGIN_STATUS':
        return { ...state, isLoggedIn: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
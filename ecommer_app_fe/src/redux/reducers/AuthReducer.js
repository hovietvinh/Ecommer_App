const initialState = {
    access_token:"",
    account:{}
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case "LOGIN_ACCOUNT":
            return {
                ...state,
                access_token:action.access_token,
                account:action.data
            }
        default:
            return state;
    }
}

export default AuthReducer;

const initialState = {
    access_token:"",
    account:{},
    role:{}
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case "LOGIN_ACCOUNT":
            return {
                ...state,
                access_token:action.access_token,
                account:action.data,
                role:action.data.role
            }
        case "CHECK_AUTH":
            // console.log(action);
            return {
                ...state,
                account:action.data,
                role:action.data.role,
                access_token:action.access_token
            }
        default:
            return state;
    }
}

export default AuthReducer;

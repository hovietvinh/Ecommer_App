const initialState = {
    accounts:[]
};

const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_ACCOUNT":
            return {
                ...state,
                accounts: [...state.accounts, action.data],
              
            };
        
        case "GET_ACCOUNTS":
            return{
                ...state,
                accounts: action.data,
            }
        
        
        
        default:
            return state;
    }
}

export default AccountReducer;

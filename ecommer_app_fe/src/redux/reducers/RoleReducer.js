const initialState = {
    roles:[]
};

const RoleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_ROLE":
            return {
                ...state,
                roles: [...state.roles, action.data],
              
            };
        
        case "GET_ROLES":
            return{
                ...state,
                roles: action.data,
               
            }
        case "GET_DETAIL_ROLE":
            return {
                ...state,
                roles:action.data,
            }
        case "UPDATE_PERMISSIONS":
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default RoleReducer;

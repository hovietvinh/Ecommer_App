const initialState = [];

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return action.data
        default:
            return state;
    }
};

export default ProductReducer;
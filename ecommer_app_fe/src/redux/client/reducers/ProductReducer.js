const initialState = {
    products:[]
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                products:action.data
            }
        case "GET_PRODUCTS_BY_CATEGORY":
            return {
                ...state,
                products:action.data
            }
        case "GET_DETAIL_PRODUCT":
            return {
                ...state,
                products:action.data
            }
        default:
            return state;
    }
};

export default ProductReducer;
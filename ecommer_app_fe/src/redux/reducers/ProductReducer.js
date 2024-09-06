const initialState = [];

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return action.data
        case "GET_PRODUCTS_ADMIN":
            return action.data
        case "UPDATE_PRODUCT_STATUS_SUCCESS":
            return state.map(product =>
                product._id === action.payload.id
                    ? { ...product, status: action.payload.status }
                    : product
            );
        case "UPDATE_MULTI":
            return state.map(product =>
                action.payload.ids.includes(product._id)
                    ? { ...product, status: action.payload.type }
                    : product
            );
        case 'DELETE_PRODUCT':
            return state.filter(product => product._id !== action.payload);
        default:
            return state;
    }
};

export default ProductReducer;
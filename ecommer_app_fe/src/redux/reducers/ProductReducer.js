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
            return state.map(product => {
                if (action.payload.ids.includes(product._id)) {
                    switch (action.payload.type) {
                        case "active":
                            return { ...product, status: action.payload.type };
                        case "inactive":
                            return { ...product, status: action.payload.type };
                        
                        case "delete-all":
                            return { ...product, deleted: true, deletedAt: new Date() };
                        case "change-position":
                            return { ...product, position: action.payload.positions[ product._id] };

                        default:
                            return product;
                    }
                }
                return product;
            });
            
        case 'DELETE_PRODUCT':
            return state.filter(product => product._id !== action.payload);
        case "CREATE_PRODUCT":
            return [...state ,action.data ]
        case "GET_DETAIL_PRODUCT":
            return action.data
        case "UPDATE_PRODUCT":
            return state
        default:
            return state;
    }
};

export default ProductReducer;
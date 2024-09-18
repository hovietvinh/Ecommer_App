const initialState = {
    products:[],
    deleted:[]
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        // case "GET_PRODUCTS":
        //     return action.data
        case "GET_PRODUCTS_ADMIN":
            return {
                ...state,
                products:action.data
            }
        case "UPDATE_PRODUCT_STATUS_SUCCESS":
            return {
                ...state,
                products:state.products.map(product =>
                    product._id === action.payload.id
                        ? { ...product, status: action.payload.status }
                        : product
                )
            }
        // case "UPDATE_MULTI":
        //     return state.map(product => {
        //         if (action.payload.ids.includes(product._id)) {
        //             switch (action.payload.type) {
        //                 case "active":
        //                     return { ...product, status: action.payload.type };
        //                 case "inactive":
        //                     return { ...product, status: action.payload.type };
                        
        //                 case "delete-all":
        //                     return { ...product, deleted: true, deletedAt: new Date() };
        //                 case "change-position":
        //                     return { ...product, position: action.payload.positions[ product._id] };

        //                 default:
        //                     return product;
        //             }
        //         }
        //         return product;
        //     });
            
        case 'DELETE_PRODUCT':
           
            const deletedProduct = state.products.find(product => product._id === action.payload);

    
            return {
                ...state,
            
                products: state.products.filter(product => product._id !== action.payload),
          
                // deleted: deletedProduct ? [...state.deleted, deletedProduct] : state.deleted
            };
        case "CREATE_PRODUCT":
            return {
                ...state,
                products:[...state.products,action.data]
            }
        case "GET_DETAIL_PRODUCT":
            return {
                ...state,
                products:action.data
            }
        // case "UPDATE_PRODUCT":
        //     return state

        case "GET_PRODUCT_DELETED":
            return {
                ...state,
                deleted:action.data
            }
        case "RETURN_DELETED_PRODUCT":
            const returnProduct = state.deleted.find(product => product._id === action.payload);
            return {
                ...state,
                products:returnProduct ? [...state.products, returnProduct] : state.products,
                deleted: state.deleted.filter(product => product._id !== action.payload),
            }
    
        // case "DELETED_PERMANENTLY_PRODUCT":
            return state
        default:
            return state;
    }
};

export default ProductReducer;
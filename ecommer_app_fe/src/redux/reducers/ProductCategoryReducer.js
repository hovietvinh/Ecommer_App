const initialState = {
    productsCategory : [],
    tree:[],
    deleted:[]
};

const ProductCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_PRODUCT_CATEGORY":
            return {
                ...state,
                productsCategory: [...state.productsCategory, action.data],
              
            };
        case "GET_PRODUCTS_CATEGORY_ADMIN":
            return{
                ...state,
                productsCategory: action.data,
                tree:action.tree
            }
        case "GET_PRODUCT_CATEGORY_DELETED":
            return {
                ...state,
                deleted:action.data
            }
        case "GET_DETAIL_PRODUCT_CATEGORY":
            return {
                ...state,
                productsCategory:action.data,
                tree:action.tree
            }
        case "UPDATE_PRODUCT_CATEGORY":
            return state;
        case "DELETE_PRODUCT_CATEGORY":
            return {
                ...state,
                productsCategory: state.productsCategory.filter(productsCategory => productsCategory._id !== productsCategory.payload),
            }
        case "DELETED_PERMANENTLY_PRODUCT_CATEGORY":
            return {
                ...state,
                deleted: state.deleted.filter(productsCategory=>productsCategory._id !== action.payload)
            }
        case "RETURN_DELETED_PRODUCT_CATEGORY":
            const returnProductCategory = state.deleted.find(product => product._id === action.payload);
            return {
                ...state,
                productsCategory:returnProductCategory ? [...state.productsCategory, returnProductCategory] : state.productsCategory,
                deleted: state.deleted.filter(product => product._id !== action.payload),
            }
        default:
            return state;
    }
}

export default ProductCategoryReducer;

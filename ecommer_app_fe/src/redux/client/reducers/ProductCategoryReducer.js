const initialState = {
    productsCategory : [],
    tree:[],
    deleted:[]
};

const ProductCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRODUCT_CATEGORY_CLIENT":
            return {
                ...state,
                productsCategory:action.data,
                tree:action.tree
            }
        default:
            return state;
    }
}

export default ProductCategoryReducer;

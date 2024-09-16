import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import ProductReducer from './reducers/ProductReducer';
import ProductCategoryReducer from "./reducers/ProductCategoryReducer"
import RoleReducer from "./reducers/RoleReducer"
import AccountReducer from "./reducers/AccountReducer"
import AuthReducer from "./reducers/AuthReducer"


const rootReducer = combineReducers({
    ProductReducer,
    ProductCategoryReducer,
    RoleReducer,
    AccountReducer,
    AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

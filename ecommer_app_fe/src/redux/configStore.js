import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import ProductReducer from './reducers/ProductReducer';



const rootReducer = combineReducers({
    ProductReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

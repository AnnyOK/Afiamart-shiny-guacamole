import{createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {productListReducer,productDetailsReducer} from "./reducers/productReducer.js"
//import { PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAILED }  from "./constants/productConstant.js"

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
})

const initialState = {}
const middleware =[thunk]

const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store
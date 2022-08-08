import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewReducer,
    topRatedReducer
} from "./reducers/productReducer.js"
import { cartReducer } from "./reducers/cartReducer"
import { orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
     orderListMyReducer,
     orderListReducer,
     orderUpdateReducer 
    } from "./reducers/orderReducers"
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    
    
} from "./reducers/userReducers"
import { getFromStorage } from "./utils.js"


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview:productReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderUpdate: orderUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    topRated: topRatedReducer,
})


const initialState = {
    cart: {
        cartItems:getFromStorage('cartItems',[]),
         paymentMethod: getFromStorage('paymentMethod',{}),
        shippingAddress: getFromStorage('shippingAddress', {}),
    },
    userLogin: { 
        userInfo:getFromStorage('userInfo',null),
     }
}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store
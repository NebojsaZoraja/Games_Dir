import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { gameDetailsReducer, gameListReducer } from './reducers/gameReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    gameList: gameListReducer,
    gameDetails: gameDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    cart: cartReducer,
});

const userInfoFromStorage = sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : null

const cartItemFromStorage = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : {};

const initialState = {
    cart: { cartItem: cartItemFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
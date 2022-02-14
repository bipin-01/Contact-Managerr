import {
  contactCreateReducer,
  contactDeleteReducer,
  contactListReducer,
  contactUpdateReducer,
} from "./reducers/contactsReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers";


const reducer = combineReducers({
  contactList: contactListReducer,
  userLogin: userLoginReducer,
  contactCreate: contactCreateReducer,
  contactUpdate: contactUpdateReducer,
  contactDelete: contactDeleteReducer,
  userUpdate: userUpdateReducer,
  userRegister: userRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

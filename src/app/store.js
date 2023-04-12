import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from '../feature/chatSlice'
import userReducer from '../feature/userSlice'
import chatReducer from '../feature/chatRoomSlice'


const rootReducer = combineReducers({
user: userReducer,
auth: authReducer,
chat: chatReducer   
})

const store = configureStore({
    reducer: rootReducer
})

export default store
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from '../feature/chatSlice'
import userReducer from '../feature/userSlice'
import chatReducer from '../feature/chatRoomSlice'
import chatroomsReducer from '../feature/chatRooms'


const rootReducer = combineReducers({
user: userReducer,
auth: authReducer,
chat: chatReducer   ,
chatrooms: chatroomsReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store
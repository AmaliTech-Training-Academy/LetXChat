import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminReducer from "../feature/adminSlice";
import authReducer from "../feature/chatSlice";
import userReducer from "../feature/userSlice";
import chatroomsReducer from "../feature/chatRooms";
import audioReducer from '../feature/audioSlice'
import messagesReducer from "../feature/chatMessageSlice";
  

const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  auth: authReducer,
  userChatrooms: chatroomsReducer,
  audio: audioReducer,
  messages: messagesReducer
});


export const store = configureStore({
  reducer: rootReducer,
});

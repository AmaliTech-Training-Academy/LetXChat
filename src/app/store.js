import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminReducer from "../feature/adminSlice";
import authReducer from "../feature/chatSlice";
import userReducer from "../feature/userSlice";
import chatReducer from "../feature/chatMessageSlice";
import chatroomsReducer from "../feature/chatRooms";
import audioReducer from '../feature/audioSlice'

  

const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
  userChatrooms: chatroomsReducer,
  audio: audioReducer
});


export const store = configureStore({
  reducer: rootReducer,
});

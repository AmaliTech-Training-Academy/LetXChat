import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import adminReducer from "../feature/adminSlice";
import authReducer from "../feature/chatSlice";
import userReducer from "../feature/userSlice";
import chatReducer from "../feature/chatRoomSlice";
import chatroomsReducer from "../feature/chatRooms";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
  chatrooms: chatroomsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

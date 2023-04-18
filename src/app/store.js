import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import adminReducer from "../feature/adminSlice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    admin: adminReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer
})
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../feature/chatSlice'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store
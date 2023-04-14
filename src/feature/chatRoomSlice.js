import { createSlice } from "@reduxjs/toolkit";

const chatRoomSlice = createSlice({
    name: 'chat', 
    initialState: {
        messages: []
    },

    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    }
})

export const { addMessage } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
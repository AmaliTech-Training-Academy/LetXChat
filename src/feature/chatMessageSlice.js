import { createSlice } from "@reduxjs/toolkit";

const chatMessageSlice = createSlice({
  name: "messages",
  initialState: {
    pusherMessages: [],
    openChatDetails: false
  },

  reducers: {
    chatDetails: (state, {payload}) => {
      state.openChatDetails = payload
    },
    addMessage: (state, action) => {
      // state.messages.push(action.payload);
      return {
        ...state, 
        pusherMessages: [...state.pusherMessages, action.payload]
      }
    },

  },
});

export const { chatDetails, addMessage } = chatMessageSlice.actions;

export default chatMessageSlice.reducer;

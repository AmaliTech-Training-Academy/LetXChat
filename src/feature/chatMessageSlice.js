import { createSlice } from "@reduxjs/toolkit";

const chatMessageSlice = createSlice({
  name: "chat",
  initialState: {
    pusherMessages: [],
  },

  reducers: {
    addMessage: (state, action) => {
      // state.messages.push(action.payload);
      return {
        ...state, 
        pusherMessages: [...state.pusherMessages, action.payload]
      }
    },

  },
});

export const { addMessage } = chatMessageSlice.actions;

export default chatMessageSlice.reducer;

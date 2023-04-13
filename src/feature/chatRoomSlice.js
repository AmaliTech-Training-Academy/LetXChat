import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client';
import { CHATROOM_URL } from "../defaultValues/DefaultValues";


export const connectToChatroom = createAsyncThunk(
    'chatroom/connectToChatroom',
    async (chatroomId, { dispatch }) => {
      try {

        const socket = io(`${CHATROOM_URL}`);
  
        socket.on('connect', () => {
          console.log('Connected to chatroom');
          socket.emit('joinChatroom', chatroomId);
        });
  
        socket.on('newMessage', (message) => {
          dispatch(addMessage(message));
        });
  
        return socket;
      } catch (error) {
        console.error(error);
      }
    }
  );

const chatRoomSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    socket: null,
    loading: false,
    error: null,
    chatroomId: null,
  },

  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    setChatroomId: (state, action) => {
      state.chatroomId = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectToChatroom.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(connectToChatroom.fulfilled, (state, action) => {
      state.loading = false;
      state.socket = action.payload;
    });

    builder.addCase(connectToChatroom.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addMessage, setChatroomId, setLoading, setError } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;

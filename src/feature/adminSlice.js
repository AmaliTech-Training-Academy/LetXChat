import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    chatrooms: [],
    AddChatroomModalState: false,
    viewUsersModalState: false,
    editModal: false,
    deleteModalState: false,
    isLoading: true
}

const url = 'https://letxchat.takoraditraining.com/api/v1/chatrooms?page='

export const getChatrooms = createAsyncThunk('chatrooms/getChatrooms', 
    async () => {
        try {
            const response = axios(url)
            return await response
        } catch (error) {
            throw new Error
        }
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        showAddChatroomModal: (state) => {
            state.AddChatroomModalState = true
        },
        hideAddChatroomModal: (state) => {
            state.AddChatroomModalState = false
        },
        showViewUsersModal: (state) => {
            state.viewUsersModalState = true
        },
        hideViewUsersModal: (state) => {
            state.viewUsersModalState = false
        },
        showDeleteModal: (state) => {
            state.deleteModalState = true
        },
        hideDeleteModal: (state) => {
            state.deleteModalState = false
        },
        // toggleAddChatroom: (state) => {
        //     state.showAddChatroomModal = !state.showAddChatroomModal
        // },
        // toggleAddChatroom: (state) => {
        //     state.showAddChatroomModal = !state.showAddChatroomModal
        // },
        // toggleAddChatroom: (state) => {
        //     state.showAddChatroomModal = !state.showAddChatroomModal
        // },
    },
    extraReducers: {
        [getChatrooms.pending]: (state) => {
            state.isLoading = true
        },
        [getChatrooms.fulfilled]: (state, {payload}) => {
            state.chatrooms = payload.data
        },
        [getChatrooms.rejected]: (state) => {
            state.chatrooms = false
        }
    }
})

export const {showAddChatroomModal, hideAddChatroomModal, showDeleteModal, hideDeleteModal, showViewUsersModal, hideViewUsersModal} = adminSlice.actions

export default adminSlice.reducer
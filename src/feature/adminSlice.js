import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
    chatrooms: [],
    allUsers: [],
    chatroomMembers: [],
    singleChatroom: [],
    EditChatroomModalState: false,
    viewUsersModalState: false,
    editModal: false,
    deleteModalState: false,
    isLoading: true,
    loadingMembers: true,
    loadingUsers: true
}

const baseUrl = 'https://letxchat.takoraditraining.com/api/v1/'

const getHeaders = () => {
  const adminToken = Cookies.get("adminToken")
  return {
    Authorization: `Bearer ${adminToken}`
  }
}

export const getChatrooms = createAsyncThunk('chatrooms/getChatrooms', 
    async () => {
        const headers = getHeaders()
        try {
            const response = await axios(`${baseUrl}chatrooms?page=`, {headers})
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)

export const logout = createAsyncThunk('admin/logout', 
async () => {
    try {
        const response = await axios(url)
        return response
    } catch (error) {
      throw new Error(error)  
    }
})
export const getAllUsers = createAsyncThunk('admin/getAllUsers',
    async () => {
        const headers = getHeaders()
        try {
            const response = await axios(`${baseUrl}users/status`, {headers})
            return response
        } catch (error) {
           throw new Error(error) 
        }
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        showEditChatroomModal: (state) => {
            state.EditChatroomModalState = true
        },
        hideEditChatroomModal: (state) => {
            state.EditChatroomModalState = false
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
        getSingleChatroom: (state, { payload }) => {
            state.singleChatroom = payload
        },
        getMembers: (state, { payload }) => {
            state.chatroomMembers = payload
        },
        addUserToChatroom: (state, {payload}) => {
            state.allUsers.users = state.allUsers.users.filter(ele => ele.id !== payload)
        }
    },
    extraReducers: {
        [getChatrooms.pending]: (state) => {
            state.isLoading = true
        },
        [getChatrooms.fulfilled]: (state, {payload}) => {
            state.chatrooms = payload.data
            state.isLoading = false
        },
        [getChatrooms.rejected]: (state) => {
            state.isLoading = false
        },
        [getAllUsers.pending]: (state) => {
            state.loadingUsers = true
        },
        [getAllUsers.fulfilled]: (state, {payload}) => {
            state.allUsers = payload.data
        },
        [getAllUsers.rejected]: (state) => {
            state.loadingUsers = false
        }
    }
})

export const {showEditChatroomModal, hideEditChatroomModal, showDeleteModal, hideDeleteModal, showViewUsersModal, hideViewUsersModal, getSingleChatroom, getMembers, addUserToChatroom} = adminSlice.actions

export default adminSlice.reducer
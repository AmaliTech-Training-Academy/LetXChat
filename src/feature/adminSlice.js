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
    viewAllUsersModalState: false,
    editModal: false,
    deleteModalState: false,
    isLoading: true,
    loadingMembers: true,
    loadingUsers: true,
    refresh: false
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
            return JSON.stringify(response)
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
            return JSON.stringify(response)
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
        showAllUsersModal: (state) => {
            state.viewAllUsersModalState = true
        },
        hideAllUsersModal: (state) => {
            state.viewAllUsersModalState = false
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
        },
        setRefresh: (state, {payload}) => {
            state.refresh = payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getChatrooms.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getChatrooms.fulfilled, (state, {payload}) => {
            state.chatrooms = JSON.parse(payload).data.data
            state.isLoading = false
        })
        .addCase(getChatrooms.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(getAllUsers.pending, (state) => {
            state.loadingUsers = true
        })
        .addCase(getAllUsers.fulfilled, (state, {payload}) => {
            state.allUsers = JSON.parse(payload).data
            state.loadingUsers = false
        })
        .addCase(getAllUsers.rejected, (state) => {
            state.loadingUsers = false
        })
    }
})

export const {showEditChatroomModal, hideEditChatroomModal, showDeleteModal, hideDeleteModal, showViewUsersModal, hideViewUsersModal, getSingleChatroom, getMembers, addUserToChatroom, setRefresh, showAllUsersModal, hideAllUsersModal} = adminSlice.actions

export default adminSlice.reducer
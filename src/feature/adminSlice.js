import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const getChatrooms = createAsyncThunk('chatrooms/getChatrooms', 
    async () => {
        try {
            const response = axios(`${baseUrl}chatrooms?page=`)
            return await response
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

// export const getSingleChatroom = createAsyncThunk('admin/getMembers',
//     async (id) => {
//         try {
//             const response = await axios(`${baseUrl}chatrooms/${id}`)
//             return response
//         } catch (error) {
//            throw new Error(error) 
//         }
//     }
// )
export const getAllUsers = createAsyncThunk('admin/getAllUsers',
    async () => {
        try {
            const response = await axios(`${baseUrl}users/status`)
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
        }
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
        },
        // [getSingleChatroom.pending]: (state) => {
        //     state.loadingMembers = true
        // },
        // [getSingleChatroom.fulfilled]: (state, {payload}) => {
        //     state.singleChatroom = payload.data
        // },
        // [getSingleChatroom.rejected]: (state) => {
        //     state.loadingMembers = false
        // },
        [getAllUsers.pending]: (state) => {
            state.loadingUsers = true
        },
        [getAllUsers.fulfilled]: (state, {payload}) => {
            state.allUsers = payload.data.users
        },
        [getAllUsers.rejected]: (state) => {
            state.loadingUsers = false
        }
    }
})

export const {showEditChatroomModal, hideEditChatroomModal, showDeleteModal, hideDeleteModal, showViewUsersModal, hideViewUsersModal, getSingleChatroom, getMembers} = adminSlice.actions

export default adminSlice.reducer
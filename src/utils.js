import React from 'react'
import {useDispatch} from 'react-redux'

// export const utils = () => {
//   return (
//     <div>utils</div>
//   )
// }

export const viewMembers = () => {
const dispatch = useDispatch()
  dispatch(showViewUsersModal());
  dispatch(getSingleChatroom(item));
};
export const deleteChatroom = (e) => {
    const dispatch = useDispatch()
  dispatch(showDeleteModal());
  dispatch(getSingleChatroom(item));
};
export const editChatroom = () => {
    const dispatch = useDispatch()
  dispatch(showEditChatroomModal());
  dispatch(getSingleChatroom(item));
};

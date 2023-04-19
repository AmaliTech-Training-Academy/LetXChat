import React, { useEffect, useState } from "react";
import Cards from "../../components/admin/Cards";
import Chatrooms from "../../components/admin/Chatrooms";
import Pagination from "../../components/admin/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {getChatrooms, getAllUsers} from "../../feature/adminSlice"

const users = [
  {
    id: 1,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Active",
  },
  {
    id: 2,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Active",
  },
  {
    id: 3,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Active",
  },
  {
    id: 4,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Pending",
  },
  {
    id: 5,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Active",
  },
  {
    id: 6,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Pending",
  },
  {
    id: 7,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Pending",
  },
  {
    id: 8,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Active",
  },
  {
    id: 9,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Active",
  },
  {
    id: 10,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Pending",
  },
  {
    id: 11,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Active",
  },
  {
    id: 12,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Pending",
  },
  {
    id: 13,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Pending",
  },
  {
    id: 14,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Pending",
  },
  {
    id: 15,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Active",
  },
  {
    id: 16,
    name: "Jacob Smith",
    email: "Jacobs@amalitech.com",
    date_assigned: "04/03/2023",
    chatroom: "UI/UX Chapter",
    members: "12",
    status: "Pending",
  },
]

function Admin() {
  // const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerpage, setUsersPerpage] = useState(10);
  const {chatrooms} = useSelector(state => state.admin)
  const dispatch = useDispatch()

  //Get current page
  const indexOfLastUser = currentPage * usersPerpage;
  const indexOfFirstUser = indexOfLastUser - usersPerpage;
  const currentChatrooms = chatrooms.data?.slice(indexOfFirstUser, indexOfLastUser);

  // change currentPage
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getChatrooms())
    dispatch(getAllUsers())
    // setData(chatrooms.data);
    // console.log(chatrooms.data);
  }, [])

  return (
    <div className="md:mx-11">
          <Cards />
          <Chatrooms currentChatrooms={currentChatrooms}/>
          <Pagination
            usersPerPage={usersPerpage}
            totalUsers={chatrooms.data?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
    </div>
  );
}

export default Admin;

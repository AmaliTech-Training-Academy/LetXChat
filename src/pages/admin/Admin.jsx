import React, { useEffect, useState } from "react";
import Cards from "../../components/admin/Cards";
import Chatrooms from "../../components/admin/Chatrooms";
import Pagination from "../../components/admin/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {getChatrooms, getAllUsers} from "../../feature/adminSlice"
import AdminNavbar from "../../components/admin/AdminNavbar";

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
    <>
    <AdminNavbar />
    <div className="md:mx-11">
          <Cards />
          <Chatrooms currentChatrooms={currentChatrooms}/>
          {currentChatrooms?.length > 0 && <Pagination
            usersPerPage={usersPerpage}
            totalUsers={chatrooms.data?.length}
            paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />}
    </div>
    </>
  );
}

export default Admin;

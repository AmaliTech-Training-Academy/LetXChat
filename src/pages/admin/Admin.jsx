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
  const [usersPerpage] = useState(10);
  const [searchInput, setSearchInput] = useState('')
  // const [currentChatrooms, setCurrentChatrooms] = useState([])

  const {chatrooms} = useSelector(state => state.admin)
  const dispatch = useDispatch()

  const indexOfLastUser = currentPage * usersPerpage;
  const indexOfFirstUser = indexOfLastUser - usersPerpage;
  let currentChatrooms = chatrooms.data?.slice(indexOfFirstUser, indexOfLastUser)

  // change currentPage
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // useEffect(() => {
    // if(!searchInput) {
      // setCurrentChatrooms(chatrooms.data?.slice(indexOfFirstUser, indexOfLastUser))
    // }
    // else {
    //   setCurrentChatrooms(chatrooms.data.filter(ele => ele.name.toLowerCase().includes(searchInput.toLowerCase())))
    // }
  // }, [])

  useEffect(() => {
    dispatch(getChatrooms())
    dispatch(getAllUsers())
  }, [])

  return (
    <>
    <AdminNavbar setSearchInput={setSearchInput}/>
    <div className="md:mx-11">
          <Cards />
          <Chatrooms searchInput={searchInput} currentChatrooms={currentChatrooms}/>
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

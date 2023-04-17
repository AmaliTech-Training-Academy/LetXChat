import React, { useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Cards from "../../components/admin/Cards";
import Chatrooms from "../../components/admin/Chatrooms";
import Pagination from "../../components/admin/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerpage, setUsersPerpage] = useState(10);

  //Get current page
  const indexOfLastUser = currentPage * usersPerpage;
  const indexOfFirstUser = indexOfLastUser - usersPerpage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // change currentPage
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1640px]">
        <AdminNavbar />
        <div className="md:mx-11">
          <Cards />
          <Chatrooms currentUsers={currentUsers} />
          <Pagination
            usersPerPage={usersPerpage}
            totalUsers={users.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Admin;

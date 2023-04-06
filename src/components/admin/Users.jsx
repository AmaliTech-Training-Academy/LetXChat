import React, { useState } from "react";
import UserHeader from "./UserHeader";
import SingleUser from "./SingleUser";

const users = [
  {
    id: 1,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Pending'
  },
  {
    id: 5,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Pending'
  },
  {
    id: 7,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Pending'
  },
  {
    id: 8,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Active'
  },
  {
    id: 9,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Active'
  },
  {
    id: 10,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Pending'
  },
  {
    id: 11,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Active'
  },
  {
    id: 12,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Pending'
  },
  {
    id: 13,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Pending'
  },
  {
    id: 14,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Pending'
  },
  {
    id: 15,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Active'
  },
  {
    id: 16,
    name: 'Jacob Smith',
    email: 'Jacobs@amalitech.com',
    date_assigned: '04/03/2023',
    chatroom: 'UI/UX Chapter',
    members: '12',
    status: 'Pending'
  },
]

function Users() {
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerpage, setUsersPerpage] = useState(10)

  //Get

  return (
    <div className="w-full mt-11 p-5 shadow">
      {/* <table className="w-full border">
        <thead>
          <tr>
            <th className="text-2xl font-medium text-[#101828] text-start w-[20%]">Name</th>
            <th className="text-2xl font-medium text-[#101828] text-start w-[25%]">Email</th>
            <th className="text-2xl font-medium text-[#101828] w-[10%]">Date Assigned</th>
            <th className="text-2xl font-medium text-[#101828] w-[5%] text-start">Chatroom</th>
            <th className="text-2xl font-medium text-[#101828]">Members</th>
            <th className="text-2xl font-medium text-[#101828]">Status</th>
          </tr>
        </thead>
      </table> */}
      <UserHeader />
        {
          users.map(ele => {
            return (
              <SingleUser key={ele.id} item={ele}/>
            )
          })
        }
    </div>
  );
}

export default Users;

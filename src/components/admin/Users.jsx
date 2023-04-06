import React from "react";
import UserHeader from "./UserHeader";
import SingleUser from "./SingleUser";

function Users({currentUsers}) {

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
          currentUsers.map(ele => {
            return (
              <SingleUser key={ele.id} item={ele}/>
            )
          })
        }
    </div>
  );
}

export default Users;

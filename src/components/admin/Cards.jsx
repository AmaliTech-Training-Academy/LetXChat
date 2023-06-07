import React from "react";
import Card from "./Card";
import total_users from '../../assets/total_users.png'
import active_users from '../../assets/active_users.png'
import pending_users from '../../assets/pending_users.png'
import chatroom from '../../assets/chatroom.png'
import { useSelector } from "react-redux";

function Cards() {
  const {allUsers, chatrooms} = useSelector(state => state.admin) 
  return (
    <div className="w-full grid grid-cols-2 gap-x-3 md:gap-x-7 lg:grid-cols-4">
      <Card title="Total Users" users={allUsers?.total} image={total_users}/>
      <Card title="Active Users" users={allUsers?.active_users} image={active_users}/>
      <Card title="Pending Request" users={allUsers?.pending_request} image={pending_users}/>
      <Card title="ChatRooms" users={chatrooms?.length} image={chatroom}/>
    </div>
  );
}

export default Cards;
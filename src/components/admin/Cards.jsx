import React from "react";
import Card from "./Card";
import total_users from '../../assets/total_users.png'
import active_users from '../../assets/active_users.png'
import pending_users from '../../assets/pending_users.png'
import chat_room from '../../assets/chat_room.png'

function Cards() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4">
      <Card title="Total Users" users="1,094" image={total_users}/>
      <Card title="Active Users" users="321" image={active_users}/>
      <Card title="Pending Request" users="98" image={pending_users}/>
      <Card title="Pending Request" users="34" image={chat_room}/>
    </div>
  );
}

export default Cards;

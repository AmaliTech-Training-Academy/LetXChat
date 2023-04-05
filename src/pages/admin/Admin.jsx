import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Cards from "../../components/admin/Cards";
import Users from "../../components/admin/Users";

function Admin() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1640px]">
        <AdminNavbar />
        <div className="md:mx-11">
          <Cards />
          <Users />
        </div>
      </div>
    </div>
  );
}

export default Admin;

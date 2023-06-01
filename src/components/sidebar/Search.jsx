import React, { useState } from "react";
import search from "../../assets/Search.svg";

function Search({ settings }) {
  const [setSearchInput] = useState("");

  return (
    <div
      className={`${
        !settings ? "mt-6 rounded-xl" : "mt-0 rounded-lg"
      } w-[90%] h-10 bg-white mx-auto flex items-center`}
    >
      {!settings && (
        <div className="w-[25px] h-[25px] ml-2">
          <img src={search} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <input
        type="text"
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={`${settings ? "@username" : "Search..."}`}
        className="h-full w-full bg-transparent px-3"
      />
    </div>
  );
}

export default Search;

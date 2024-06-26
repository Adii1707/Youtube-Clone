import React from "react";
import "./style.css"

export const SearchBar = ({ handleKeyDown }) => {
  return (
    <div className="flex">
      <input
        type="text"
        name="query"
        id="price"
        className="block w-full rounded-full border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
        placeholder="Search"
        onKeyDown={handleKeyDown}
      />
      
        <svg id="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          focusable="false"
        className="bg-gray-100 "

          style={{
            pointerEvents: "none",
            display: "inherit",
            width: "8%",
            height: "6%",
            padding: "8px",
            
          }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11ZM16.2961 16.9961C14.8853 18.2431 13.031 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19 13.0274 18.2458 14.8786 17.0028 16.2885L20.5583 19.8441L20.9119 20.1976L20.2048 20.9047L19.8512 20.5512L16.2961 16.9961Z"
          ></path>
        </svg>
      </div>
  
  );
};

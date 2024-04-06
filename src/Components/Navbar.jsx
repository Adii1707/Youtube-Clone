import React from "react";
import "./style.css";
import { Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "./SearchBar";

export const Navbar = ({ handleKeyDown, ToggleSidebar, setQuery }) => {
  let category = [
    "Music",
    "Fitness",
    "Entertainment",
    "Movies",
    "Web Series",
    "Songs",
    "Cricket",
    "Football",
    "Honey Singh",
    "Comedy",
    "News",
    "Games",
  ];

  const HandleClick = (title) => {
    setQuery(title);
    //  console.log(title);
  };

  return (
    <div className="">
      <div className="Navbar flex justify-between mx-auto px-10 ">
        <div className="flex flex-shrink-0 mx-4 items-center gap-3">
          {/* <img
            onClick={ToggleSidebar}
            className="h-8 w-auto"
            src="./menu.jpg"
            alt="Menu"
          /> */}
          
          <svg
             onClick={ToggleSidebar}
             id='menubar'
             className="ml-[-45px]"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            style={{pointerEvents: '', width: '50%', height: "50%"}}
          >
            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
          </svg>

          <div className="flex item-center  gap-1">
            <img className="h-8 w-auto" src="./favicon.png" alt="Youtube" />
            <span className="font-bold text-xl">YouTube</span>
          </div>
        </div>
        <div className="searchBar py-2 w-[600px]">
          <SearchBar handleKeyDown={handleKeyDown} />
        </div>

        <div className=" absolute  h-12 my-[13px] mx-3 inset-y-0 right-0 flex items-center pr-2  sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
            type="button"
            className="relative  rounded-full bg-gray-50 p-1 text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <BellIcon className="bellicon h-7 w-7 " aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative mx-3 ">
            <div>
              <Menu.Button className="relative flex rounded-full bg-gray-100 mr-[-20px] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-9 w-9 rounded-full"
                  src="./aditya.jpg"
                  alt="profile"
                />
              </Menu.Button>
            </div>
          </Menu>
        </div>
        {/* ------------------- */}
        {/* </div>  */}
      </div>

      {/* Buttons Starts From Here */}

      <div className="catbtn w-full  flex justify-center gap-5 ">
        {category.map((title) => {
          return (
            <button
              value={title}
              key={title}
              onClick={(e) => HandleClick(e.target.value)}
              className="shadow-sm bg-gray-100 px-4   my-1 rounded text-sm text-color-gray-300 font-semibold"
            >
              {title}
            </button>
          );
        })}
      </div>

      {/* Card Section Start Here */}
    </div>
  );
};

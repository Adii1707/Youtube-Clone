import React, { useState } from "react";
import "./style.css";
import { Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Container } from "./Container";

export const Navbar = () => {
  let [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  };

  return (
    <div>
      <div className="shadow-sm flex justify-between mx-auto px-10 ">
        {/* <div className="flex flex-shrink-0 items-center">
          <img className="h-8 w-auto" src="./menu.jpg" alt="Menu" />
        </div> */}
        <div className="flex flex-shrink-0 items-center gap-4">
          <img className="h-8 w-auto" src="./menu.jpg" alt="Menu" />

          <div className="flex item-center  gap-1">
            <img className="h-8 w-auto" src="./favicon.png" alt="Youtube" />
            <span className="font-bold text-xl">YouTube</span>
          </div>
        </div>
        <div className="py-2 w-[600px]">
          <input
            type="text"
            name="query"
            id="price"
            className="block w-full rounded-full border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
            placeholder="Search"
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* <div className="w-[200px] flex justify-between py-4"> */}
        {/* <div>Notification</div>
          <div>Profile</div> */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 mx-3 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
            type="button"
            className="relative rounded-full bg-gray-50 p-1 text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {/* <span className="absolute -inset-1.5" /> */}
            {/* <span className="sr-only">View notifications</span> */}
            <BellIcon className="h-7 w-7" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative mx-5">
            <div>
              <Menu.Button className="relative flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
        {/* </div> */}
      </div>

      {/* Buttons Starts From Here */}

      <div className="max-w-full  flex justify-center gap-5 ">
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Music
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Fitness
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Entertainment
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Movies
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Web Series
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Songs
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Cricket
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Football
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Honey Singh
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Comedy
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          News
        </button>
        <button className="shadow-sm bg-gray-100 px-4 py-1 my-3 rounded text-sm text-color-gray-300 font-semibold">
          Games
        </button>
      </div>

      {/* Card Section Start Here */}
     
      <Container query={query} />
    </div>
  );
};

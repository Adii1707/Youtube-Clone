import React, { useState } from 'react'
import {Navbar} from "../Components/Navbar";
import { Container } from '../Components/Container';

export const Home = () => {

    let [query, setQuery] = useState("");
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
      isOpen === true ? setIsopen(false) : setIsopen(true);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  }

  return (
    <>
      <Navbar ToggleSidebar={ToggleSidebar} setQuery={setQuery}  handleKeyDown={handleKeyDown} />
      <Container isOpen={isOpen} query={query} />
    </>
  )
}

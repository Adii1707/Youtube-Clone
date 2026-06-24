import React, { useState } from 'react';
import { Navbar } from "../Components/Navbar";
import { Container } from '../Components/Container';

export const Home = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => setIsopen((prev) => !prev);

  return (
    <>
      <Navbar ToggleSidebar={ToggleSidebar} setQuery={setQuery} />
      <Container isOpen={isOpen} query={query} />
    </>
  );
};

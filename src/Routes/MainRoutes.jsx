import React from 'react';
import {Home} from "../Pages/Home";
import { Route, Routes } from 'react-router-dom';
import { SingleVideo } from '../Pages/SingleVideo';

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<SingleVideo />} />

    </Routes>
  )
}

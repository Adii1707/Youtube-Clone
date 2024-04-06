import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "./style.css";
import axios from "axios";
import { Sidebar } from "./Sidebar";

let main = async (query) => {
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${
    query ? query : "trending"
  }&key=AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU`;
  let res = await axios(url);
  return res.data.items;
};

export const Container = ({ query, isOpen }) => {
  let [data, setData] = useState([]);

  useEffect(() => {
    try {
      main(query).then((items) => {
        setData(items);
      });
    } catch (error) {
      console.log(error);
    }
  }, [query]);

  return (
    <div id="container" className="flex w-full">
      <div className={`sidebarm ${isOpen == true ? "active" : ""}`}>
        <Sidebar isOpen={isOpen} />
      </div>
      <div id="card" className={`carddiv ${isOpen == true ? "active" : ""}`}>
        {data
          ? data.map((item, index) => <Card key={index} data={item} />)
          : null}
      </div>
    </div>
  );
};

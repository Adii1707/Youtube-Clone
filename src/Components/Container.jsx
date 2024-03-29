import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "./style.css";
import axios from "axios";

let main = async (query) => {
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${
    query ? query : "trending"
  }&key=AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU`;
  let res = await axios(url);
  return res.data.items;
};

export const Container = ({ query }) => {
  let [data, setData] = useState([]);

  {
    /* useEffect(() => {
    try {
      main(query).then((items) => {
        setData(items);
      });
    } catch (error) {
      console.log(error);
    }
  }, [query]); */
  }

  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter") {
  //       setQuery(e.target.value);
  //     }
  //   };

  // console.log(data);

  return (
    <div id="container" className="flex w-full">
      <div id="sidebar" className="w-[30%]"></div>
      <div id="card">
        {data
          ? data.map((item, index) => <Card key={index} data={item} />)
          : null}
      </div>
    </div>
  );
};

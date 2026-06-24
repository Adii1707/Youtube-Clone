import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "./style.css";
import axios from "axios";
import { Sidebar } from "./Sidebar";

const API_KEY = "AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU";

export let main = async (query) => {
  const url = query
    ? `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=32&regionCode=IN&q=${encodeURIComponent(
        query
      )}&key=${API_KEY}`
    : `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=32&key=${API_KEY}`;

  const res = await axios(url);
  return res.data.items;
};

export const Container = ({ query, isOpen }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    main(query)
      .then((items) => {
        setIsLoading(false);
        setData(items || []);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [query]);

  return (
    <div id="container" className="flex w-full">
      <div className={`sidebarm ${isOpen ? "active" : ""}`}>
        <Sidebar isOpen={isOpen} />
      </div>

      {isLoading ? (
        /* Skeleton grid */
        <div id="card" className={`carddiv ${isOpen ? "active" : ""}`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="cardm animate-pulse">
              <div className="thumbnail bg-gray-200 rounded-xl" />
              <div className="h-4 bg-gray-200 rounded mt-2 w-4/5" />
              <div className="h-3 bg-gray-200 rounded mt-1 w-2/5" />
            </div>
          ))}
        </div>
      ) : (
        <div id="card" className={`carddiv ${isOpen ? "active" : ""}`}>
          {data.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

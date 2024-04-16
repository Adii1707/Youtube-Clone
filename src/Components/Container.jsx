import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "./style.css";
import axios from "axios";
import { Sidebar } from "./Sidebar";

// https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&maxResults=20&q=shorts&key=AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU

export let main = async (query) => {
  
  // let channel_http = "https://www.googleapis.com/youtube/v3/channels?part=snippet&maxResults=30&regionCode=IN&chart=mostPopular&key=AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU";

  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=32&regionCode=IN&chart=mostPopular&q=${
    query
}&key=AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU`;
  let res = await axios(url);
  return res.data.items;
};

export const Container = ({ query, isOpen }) => {
  let [data, setData] = useState([]);
  let [IsLoadding, setIsLoading] = useState(false);
  useEffect(() => {
    try {
      setIsLoading(true);
      main(query).then((items) => {
        setIsLoading(false);
        setData(items);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }, [query]);


  return (
    <div id="container" className="flex w-full">
      <div className={`sidebarm ${isOpen == true ? "active" : ""}`}>
        <Sidebar isOpen={isOpen} />
      </div>
      {IsLoadding ? (
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-200 h-10 w-10"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-slate-200 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="card" className={`carddiv ${isOpen == true ? "active" : ""}`}>
          {data
            ? data.map((item, index) => <Card  key={index} data={item} />)
            : null}
        </div>
      )}
    </div>
  );
};

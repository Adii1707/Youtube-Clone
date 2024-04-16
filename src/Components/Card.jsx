import React from "react";
import { useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  let navigate = useNavigate();

  const HandleClick = () => {
    navigate(`/video/${data.id.videoId}`);
  };

  return (
    <>
      {data.snippet.title.toLowerCase().search(`${"shorts" || "#shorts"}`) ===
      -1 ? (
        <div
          onClick={HandleClick}
          className="cardm  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <img
            className="thumbnail"
            src={data.snippet.thumbnails.high.url}
            alt="img"
          />
          {/* <iframe
        title={data.id.videoId}
        className="rounded-lg shadow-md"
        href={`${data.snippet.thumbnails.high.url}`}
        src={`https://www.youtube.com/embed/${data.id.videoId}`}
        allow="fullscreen"
      ></iframe> */}
          <p
            class="title"
            className="text-gray-800 text-md font-semibold mb-2 "
          >
            {data.snippet.title}
          </p>
          <p className="text-gray-600">{data.snippet.channelTitle}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export let main = async (id) => {
  
    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU`;
    let res = await axios(url);
    return res.data.items;
  };


export const SingleVideo = () => {
   let [data, setData] = useState({}); 
  const { id } = useParams();

  useEffect(()=> {
    try {
        main(id).then((items) => {
            // setIsLoading(false);
            setData(items);
          });

    } catch (error) {
        console.log(error)
    }
  }, [id]);

//   console.log(data[0]);

  return (
    <div>
      <iframe
        title={id}
        className="m-auto w-[50%] h-[600px] rounded-lg shadow-md"
        src={`https://www.youtube.com/embed/${id}`}
        allow="fullscreen"
      ></iframe>
      <div>
        <h4>
            {data.length>0 ? data[0].snippet.title: ""}
        </h4>
        <p>
            {data.length>0 ? data[0].snippet.description : ""}
        </p>
      </div>
    </div>
  );
};

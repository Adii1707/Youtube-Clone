import React from 'react'

export const Card = ({data}) => {

// console.log("card data"+data.id);


  return (
    <div className= "cardm" >
        {/*  iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.allow = "fullscreen" */}
        <iframe title={data.id.videoId} className="rounded-lg shadow-md" href={`${data.snippet.thumbnails.high.url}`} src={`https://www.youtube.com/embed/${data.id.videoId}`} allow='fullscreen'></iframe>
        <p class='title' className="text-gray-800 text-md font-semibold mb-2 ">{data.snippet.title}</p>
        <p className="text-gray-600">{data.snippet.channelTitle}</p>
        {/* <p className="text-gray-600">{data.snippet.publishTime}</p> */}
        {/* <p className="text-gray-600">{data.snippet.channelTitle}</p> */}
        
      </div>
  
  )
}

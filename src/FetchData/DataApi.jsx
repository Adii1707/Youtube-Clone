import React from 'react';


// const api_key = "AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU";



 let main = async (query) =>{


let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query? query: "trending"}&key=AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU`;


    let res = await fetch(url);
    let data = await res.json();
   
    return data.items;
    // append(data.items)
}

export const DataApi = () => {

main()




  return (
    <div>DataApi</div>
  )
}

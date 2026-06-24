import { useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  const navigate = useNavigate();

  // Search API returns id.videoId; Trending API returns id as a plain string
  const videoId = typeof data.id === "string" ? data.id : data.id?.videoId;

  if (!videoId) return null;

  const title = data.snippet?.title || "";
  const isShort =
    title.toLowerCase().includes("shorts") ||
    title.toLowerCase().includes("#shorts");

  if (isShort) return null;

  return (
    <div
      onClick={() => navigate(`/video/${videoId}`)}
      className="cardm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
    >
      <img
        className="thumbnail"
        src={data.snippet.thumbnails?.high?.url || data.snippet.thumbnails?.medium?.url}
        alt={title}
      />
      <p className="text-gray-800 text-md font-semibold mb-1 mt-1 line-clamp-2 leading-snug">
        {title}
      </p>
      <p className="text-gray-500 text-sm">{data.snippet.channelTitle}</p>
    </div>
  );
};

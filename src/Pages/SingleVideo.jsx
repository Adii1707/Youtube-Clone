import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Components/style.css";

const API_KEY = "AIzaSyDa0xyuOmlaq7-xNEY-8HTlpbOzleQRqRU";

export let main = async (id) => {
  let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`;
  let res = await axios(url);
  return res.data.items;
};

let fetchRelated = async (query) => {
  let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&regionCode=IN&q=${encodeURIComponent(query)}&key=${API_KEY}`;
  let res = await axios(url);
  return res.data.items;
};

const formatCount = (num) => {
  if (!num) return "";
  const n = parseInt(num);
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const RelatedVideoCard = ({ item }) => {
  const navigate = useNavigate();

  if (!item?.id?.videoId) return null;

  return (
    <div
      onClick={() => navigate(`/video/${item.id.videoId}`)}
      className="flex gap-2 cursor-pointer hover:bg-gray-100 rounded-xl p-1 mb-1 transition-colors"
    >
      <div className="relative flex-shrink-0">
        <img
          src={item.snippet.thumbnails.medium.url}
          alt={item.snippet.title}
          className="w-40 h-[90px] object-cover rounded-xl"
        />
      </div>
      <div className="flex-1 overflow-hidden pr-1">
        <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
          {item.snippet.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">{item.snippet.channelTitle}</p>
      </div>
    </div>
  );
};

const ChannelAvatar = ({ name }) => {
  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500",
    "bg-yellow-500", "bg-pink-500", "bg-indigo-500",
  ];
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
  return (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
      {name?.charAt(0).toUpperCase()}
    </div>
  );
};

export const SingleVideo = () => {
  const [videoData, setVideoData] = useState(null);
  const [related, setRelated] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setVideoData(null);
    setRelated([]);
    setShowFullDesc(false);
    setLiked(false);
    setDisliked(false);

    main(id)
      .then((items) => {
        if (items && items.length > 0) {
          setVideoData(items[0]);
          const searchQuery = items[0].snippet.channelTitle;
          fetchRelated(searchQuery).then((relatedItems) => {
            setRelated(relatedItems || []);
          });
        }
      })
      .catch(console.error);
  }, [id]);

  const snippet = videoData?.snippet;
  const stats = videoData?.statistics;

  return (
    <div className="bg-white min-h-screen">
      {/* Top Navbar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            style={{ width: "28px", height: "28px" }}
          >
            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" />
          </svg>
          <img
            className="h-6 w-auto"
            src="../img/logo.PNG"
            alt="YouTube"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      </div>

      {/* Page Body */}
      <div className="flex gap-6 px-6 pt-4 pb-10 max-w-screen-2xl mx-auto">
        {/* ── Left Column: Player + Details ── */}
        <div className="flex-1 min-w-0">
          {/* Player */}
          <div className="w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              title={id}
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Title */}
          {snippet ? (
            <>
              <h1 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">
                {snippet.title}
              </h1>

              {/* Channel row + action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                {/* Channel info + Subscribe */}
                <div className="flex items-center gap-3">
                  <ChannelAvatar name={snippet.channelTitle} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {snippet.channelTitle}
                    </p>
                  </div>
                  <button className="ml-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Like / Dislike */}
                  <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                    <button
                      onClick={() => { setLiked(!liked); setDisliked(false); }}
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-r border-gray-300 hover:bg-gray-200 transition-colors ${liked ? "text-blue-600" : "text-gray-800"}`}
                    >
                      <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      {stats?.likeCount ? formatCount(stats.likeCount) : "Like"}
                    </button>
                    <button
                      onClick={() => { setDisliked(!disliked); setLiked(false); }}
                      className={`px-4 py-2 text-sm font-semibold hover:bg-gray-200 transition-colors ${disliked ? "text-blue-600" : "text-gray-800"}`}
                    >
                      <svg className="w-5 h-5" fill={disliked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Share */}
                  <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-4 py-2 rounded-full transition-colors text-gray-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>

                  {/* Save */}
                  <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-4 py-2 rounded-full transition-colors text-gray-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-100 rounded-xl mt-4 p-4 cursor-pointer" onClick={() => !showFullDesc && setShowFullDesc(true)}>
                <div className="flex gap-3 text-sm font-semibold text-gray-800 mb-2">
                  {stats?.viewCount && <span>{formatCount(stats.viewCount)} views</span>}
                  <span>{formatDate(snippet.publishedAt)}</span>
                </div>
                <p className={`text-sm text-gray-700 whitespace-pre-wrap ${showFullDesc ? "" : "line-clamp-3"}`}>
                  {snippet.description || "No description available."}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowFullDesc(!showFullDesc); }}
                  className="text-sm font-semibold text-gray-900 mt-2 hover:text-gray-600"
                >
                  {showFullDesc ? "Show less" : "...more"}
                </button>
              </div>
            </>
          ) : (
            /* Skeleton while loading */
            <div className="mt-3 animate-pulse space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-8 bg-gray-200 rounded-full w-24 ml-2" />
              </div>
              <div className="h-20 bg-gray-200 rounded-xl" />
            </div>
          )}
        </div>

        {/* ── Right Column: Related Videos ── */}
        <div className="w-96 flex-shrink-0">
          {related.length === 0 ? (
            /* Skeleton */
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-2 animate-pulse">
                  <div className="w-40 h-[90px] bg-gray-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-200 rounded w-2/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Up next</h3>
              {related.map((item, index) => (
                <RelatedVideoCard key={index} item={item} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

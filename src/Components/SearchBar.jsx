import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const fetchSuggestions = (query) =>
  new Promise((resolve) => {
    const cbName = `__ytSuggest_${Date.now()}`;
    const script = document.createElement("script");

    window[cbName] = (data) => {
      resolve(data[1]?.map((item) => item[0]) || []);
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    script.onerror = () => {
      resolve([]);
      delete window[cbName];
    };

    script.src = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURIComponent(
      query
    )}&callback=${cbName}`;
    document.head.appendChild(script);
  });

export const SearchBar = ({ setQuery }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (input.trim().length < 2) {
      setSuggestions([]);
      setShowDrop(false);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const results = await fetchSuggestions(input);
      setSuggestions(results.slice(0, 8));
      setShowDrop(results.length > 0);
      setActiveIdx(-1);
    }, 280);
    return () => clearTimeout(debounceRef.current);
  }, [input]);

  useEffect(() => {
    const close = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setShowDrop(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const triggerSearch = (value) => {
    const q = (value ?? input).trim();
    if (!q) return;
    setInput(q);
    setQuery(q);
    setShowDrop(false);
    setActiveIdx(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (activeIdx >= 0 && suggestions[activeIdx]) {
        triggerSearch(suggestions[activeIdx]);
      } else {
        triggerSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setShowDrop(false);
    }
  };

  const roundBottom = !showDrop || suggestions.length === 0;

  return (
    <div ref={containerRef} className="relative flex w-full">
      {/* Input */}
      <input
        type="text"
        id="price"
        autoComplete="off"
        placeholder="Search"
        value={input}
        onChange={(e) => { setInput(e.target.value); }}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setShowDrop(true)}
        className="block w-full border-0 py-2 pl-5 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6 outline-none"
        style={{
          borderTopLeftRadius: "24px",
          borderBottomLeftRadius: roundBottom ? "24px" : "0",
          transition: "border-radius 0.1s",
        }}
      />

      {/* Search button */}
      <button
        onClick={() => triggerSearch()}
        className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors border border-l-0 border-gray-300"
        style={{
          minWidth: "52px",
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "50%",
        }}
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{ width: "20px", height: "20px" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11ZM16.2961 16.9961C14.8853 18.2431 13.031 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19 13.0274 18.2458 14.8786 17.0028 16.2885L20.5583 19.8441L20.9119 20.1976L20.2048 20.9047L19.8512 20.5512L16.2961 16.9961Z"
          />
        </svg>
      </button>

      {/* Suggestions dropdown */}
      {showDrop && suggestions.length > 0 && (
        <ul
          className="absolute bg-white border border-gray-200 shadow-xl z-50 overflow-hidden"
          style={{
            top: "100%",
            left: 0,
            right: "52px",
            borderTop: "none",
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => triggerSearch(s)}
              onMouseEnter={() => setActiveIdx(i)}
              className={`flex items-center gap-3 px-5 py-2.5 cursor-pointer text-sm text-gray-800 ${
                i === activeIdx ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              {/* Search icon */}
              <svg
                className="w-4 h-4 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

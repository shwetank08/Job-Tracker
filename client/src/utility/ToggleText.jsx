import { useState } from "react";

const ToggleText = ({ text, maxlength = 150 }) => {
  const [expand, setExpand] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxlength;
  const displayText = expand ? text : text.slice(0, maxlength);

  return (
    <p className="text-sm text-gray-700 leading-relaxed">
      {displayText}
      {shouldTruncate && (
        <button
          onClick={() => setExpand(!expand)}
          className="ml-2 text-indigo-600 font-medium hover:underline focus:outline-none"
        >
          {expand ? "Read less" : "Read more"}
        </button>
      )}
    </p>
  );
};

export default ToggleText;

import { useState } from "react";

const ToggleText = ({text, maxlength = 150}) => {
  const [expand, setExpand] = useState(false);
  if(!text){return null;}
  const shouldTrucate = text.length > maxlength;
  const displayText = expand? text: text.slice(0,maxlength);
  return (
    <p className="text-sm text-gray-600 text-wrap">
    {displayText}
    {shouldTrucate && (
        <button onClick={()=>setExpand(!expand)}>
            {expand?"See Less": "See More"}
        </button>
    )}
    </p>
  )
};

export default ToggleText;

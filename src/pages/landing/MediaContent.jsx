import React, { useState } from "react";
import "./MobilityStretch.css"

const MediaContent = ({ exercise }) => {
  const [loading, setLoading] = useState(true); // Track loading state
  console.log(exercise)

  return (
    <div className="media-container">
      {loading && <div style={{
        fontSize: '16px',
        color: '#555',
        textAlign: 'center',
        margin: '20px'
      }}>Loading...</div>} {/* Loader */}
      {exercise.content_type === "video" ? (
        <video
          className="video-placeholder-mobility"
          controls
          src={`https://personalpeak360.biddabuzz.com/api/v1/content/stream/${exercise.id}`}
          alt={exercise.short_video_or_image}
          onCanPlay={() => setLoading(false)} // Video is ready
          onError={() => setLoading(false)} // Hide loader on error
        />
      ) : (
        <img
          className="video-placeholder-mobility"
          src={`https://personalpeak360.biddabuzz.com/api/v1/content/stream/${exercise.id}`}
          alt={exercise.title}
          onLoad={() => setLoading(false)} // Image is loaded
          onError={() => setLoading(false)} // Hide loader on error
        />
      )}
    </div>
  );
};

export default MediaContent;

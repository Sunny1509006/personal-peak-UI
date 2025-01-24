import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import "./MobilityAdd.css";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";

const MobilityAdd = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState(null); // Track the currently playing video

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await Axios.get("/content/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle video play
  const handlePlayVideo = async (itemId) => {
    try {
      const response = await Axios.get(`/content/stream/${itemId}`, {
        responseType: "blob",
      });
      const videoUrl = URL.createObjectURL(response.data); // Create Blob URL for the video
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, streamingUrl: videoUrl } : item
        )
      );
      setPlayingVideoId(itemId); // Set the currently playing video ID
    } catch (error) {
      console.error("Error fetching streaming video:", error);
      alert("Failed to play the video. Please try again.");
    }
  };

  // Handle delete
  const handleDelete = async (itemId) => {
    try {
      await Axios.delete(`/content/items/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  // Render content for each card
  const renderContent = (item) => {
    if (item.content_type === "video") {
      // If it's a video, show the Play button and conditionally render the video
      console.log(item)
      return (
        <div className="video-container">
          {item.streamingUrl && playingVideoId === item.id ? (
            <video
              className="media-content"
              controls
              autoPlay
              src={`https://personalpeak360.biddabuzz.com/api/v1/content/stream/${item.id}`}
            />
          ) : (
            <button
              className="play-button"
              onClick={() => handlePlayVideo(item.id)}
            >
              Play
            </button>
          )}
        </div>
      );
    } else if (item.content_type === "image") {
      // If it's an image, display it
      console.log(item)
      return (
        <img
          className="media-content"
          src={`https://personalpeak360.biddabuzz.com/api/v1/content/stream/${item.id}`}
          alt={item.title}
        />
      );
    } else {
      // Default case for unsupported content types
      return <p>Unsupported content type</p>;
    }
  };

  return (
    <Layout>
      <div className="mobility-add-page">
        {/* Header */}
        <div className="page-header">
          <h1>Mobility Add</h1>
          <Link to="/mobility-add-new" className="add-button">
            Mobility Add
          </Link>
        </div>

        {/* List View */}
        <div className="list-view">
          {loading ? (
            <p>Loading items...</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="card">
                <div className="card-header">
                  <h3>{item.title}</h3>
                </div>
                <div className="card-content">
                  {renderContent(item)}
                  <p>Type: {item.type}</p>
                  <p>Query: {item.query}</p>
                  <div className="card-actions">
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MobilityAdd;

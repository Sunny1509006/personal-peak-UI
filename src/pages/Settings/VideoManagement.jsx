import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import Layout from "../../layout/Layout";
import "./VideoManagement.css";

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({ text: "", youtube_url: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    videoId: null,
  });
  const [editVideo, setEditVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await Axios.get("/content/yt-videos/");
      if (response.data) {
        setVideos(response.data);
        console.log("Fetched videos:", response.data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    try {
      if (editVideo) {
        // Update video
        await Axios.put(`/content/yt-videos/${editVideo.id}`, formData);
        setSuccessMessage("Video updated successfully!");
      } else {
        // Add new video
        await Axios.post("/content/yt-videos/", formData);
        setSuccessMessage("Video added successfully!");
      }
      fetchVideos(); // Refresh video list
      setIsModalOpen(false);
      setEditVideo(null);
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (video) => {
    setFormData({ text: video.text, youtube_url: video.youtube_url });
    setEditVideo(video);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(`/content/yt-videos/${deleteConfirm.videoId}`);
      setSuccessMessage("Video deleted successfully!");
      setDeleteConfirm({ show: false, videoId: null });
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="video-management">
        <h2>Video Management</h2>
        {isLoading && <div className="loader">Submitting...</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="video-list">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.id} className="video-card-dashboard">
                <iframe
                  src={video.youtube_url}
                  title={video.text}
                  className="video-frame"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="video-text">{video.text}</p>
                <button
                  onClick={() => handleEdit(video)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirm({ show: true, videoId: video.id })
                  }
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No videos available.</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditVideo(null);
          }}
          className="add-video-button"
        >
          Add New Video
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editVideo ? "Edit Video" : "Add a New Video"}</h2>
              <form onSubmit={handleSubmit} className="video-form">
                <label>
                  Text:
                  <input
                    type="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  YouTube URL:
                  <input
                    type="url"
                    name="youtube_url"
                    value={formData.youtube_url}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <div className="form-actions">
                  <button type="submit" disabled={isLoading}>
                    {isLoading
                      ? "Submitting..."
                      : editVideo
                      ? "Update"
                      : "Submit"}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {deleteConfirm.show && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Are you sure you want to delete this video?</h2>
              <div className="form-actions">
                <button
                  onClick={handleDelete}
                  className="delete-confirm-button"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirm({ show: false, videoId: null })
                  }
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VideoManagement;

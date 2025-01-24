import React, { useState } from "react";
import Axios from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import "./MobilityAddForm.css"; // Add CSS for the form
import Layout from "../../layout/Layout";

const MobilityAddForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    query: "",
    short_video_or_image: null,
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, short_video_or_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("type", formData.type);
    form.append("query", formData.query);
    form.append("short_video_or_image", formData.short_video_or_image);

    setIsLoading(true); // Start the loader
    setSuccessMessage(""); // Clear any previous success message

    try {
      await Axios.post("/content/items", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Item added successfully!"); // Show success message
      setTimeout(() => navigate("/mobility-add"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    } finally {
      setIsLoading(false); // Stop the loader
    }
  };

  return (
    <Layout>
      <div className="mobility-add-form">
        <h2>Add New Mobility Item</h2>

        {isLoading && <div className="loader">Submitting...</div>} {/* Loader */}

        {successMessage && (
          <div className="success-message">{successMessage}</div> // Success message
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Video or Image:
            <input
              type="file"
              name="short_video_or_image"
              accept="video/*,image/*"
              onChange={handleFileChange}
              required
            />
          </label>
          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/mobility-add")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default MobilityAddForm;

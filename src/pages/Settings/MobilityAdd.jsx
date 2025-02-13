import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import "./MobilityAdd.css";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";

const MobilityAdd = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Track if the update form is open
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited
  const [selectedFile, setSelectedFile] = useState(null); // Track uploaded file
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [itemToDelete, setItemToDelete] = useState(null); // Track item to delete

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

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      await Axios.delete(`/content/items/${itemToDelete}`);
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemToDelete)
      );
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    } finally {
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (itemId) => {
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  // Handle update
  const handleUpdate = async (updatedItem) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedItem.title);
      formData.append("type", updatedItem.type);
      formData.append("query", updatedItem.query);
      formData.append("content_type", updatedItem.content_type);
      if (selectedFile) {
        formData.append("short_video_or_image", selectedFile);
      }

      await Axios.put(`/content/items/${updatedItem.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? { ...updatedItem } : item
        )
      );
      alert("Item updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  // Open the update form
  const openUpdateForm = (item) => {
    setIsEditing(true);
    setEditingItem({ ...item });
    setSelectedFile(null);
  };

  // Render content for each card
  const renderContent = (item) => {
    if (item.content_type === "video") {
      return (
        <div className="video-container">
          <video
            className="media-content-mobility"
            controls
            loop
            src={`https://personalpeak360.biddabuzz.com/api/v1/content/stream/${item.id}`}
          />
        </div>
      );
    } else if (item.content_type === "image") {
      return (
        <div className="video-container">
          <img
            className="media-content-mobility"
            src={`https://personalpeak360.biddabuzz.com/api/v1/content/stream/${item.id}`}
            alt={item.title}
          />
        </div>
      );
    } else {
      return <p>Unsupported content type</p>;
    }
  };

  return (
    <Layout>
      <div className="container mobility-add-page">
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
                  <p>Description: {item.query}</p>
                  <div
                    className="card-actions"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      className="delete-button"
                      onClick={() => openDeleteModal(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="update-button"
                      onClick={() => openUpdateForm(item)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Update Form Modal */}
      {isEditing && editingItem && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{ width: "500px", display: "flex", textAlign: "left" }}
          >
            <h2>Update Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingItem);
              }}
            >
              <label>Title</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, title: e.target.value })
                }
              />
              <label>Type</label>
              <input
                type="text"
                value={editingItem.type}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, type: e.target.value })
                }
              />
              <label>Description</label>
              <input
                type="text"
                value={editingItem.query}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, query: e.target.value })
                }
              />
              <label>Content Type</label>
              <select
                value={editingItem.content_type}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    content_type: e.target.value,
                  })
                }
                style={{ marginLeft: "10px" }}
              >
                <option value="placeholder">Placeholder</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
              <br />
              <br />
              <label>Upload Video/Image</label>
              <br />
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept={
                  editingItem.content_type === "video" ? "video/*" : "image/*"
                }
              />
              <button type="submit" className="submit-button">
                Save
              </button>
              <button
                type="button"
                className="cancel-button"
                style={{ marginLeft: "10px" }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleDeleteConfirm}>
                Confirm
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MobilityAdd;

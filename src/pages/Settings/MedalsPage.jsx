import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import "./MedalsPage.css";
import Layout from "../../layout/Layout";

const MedalsPage = () => {
  const [medals, setMedals] = useState([]);
  const [formData, setFormData] = useState({ text: "", image: null, type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    medalId: null,
  });
  const [editMedal, setEditMedal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedals();
  }, []);

  const fetchMedals = async () => {
    try {
      const response = await Axios.get("/rewards/medal");
      setMedals(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching medals:", error);
      setMedals([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("text", formData.text);
    submitData.append("image", formData.image);
    submitData.append("type", formData.type);

    setIsLoading(true);
    setSuccessMessage("");

    try {
      if (editMedal) {
        await Axios.put(`/rewards/medal/${editMedal.id}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Updated successfully!");
      } else {
        await Axios.post("/rewards/medal", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Medal added successfully!");
      }
      fetchMedals();
      setIsModalOpen(false);
      setEditMedal(null);
    } catch (error) {
      console.error("Error saving medal:", error);
      alert("Failed to save medal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (medal) => {
    setFormData({ text: medal.text, type: medal.type, image: null });
    setEditMedal(medal);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(`/rewards/medal/${deleteConfirm.medalId}`);
      setDeleteConfirm({ show: false, medalId: null });
      setSuccessMessage("Medal deleted successfully!");
      fetchMedals();
    } catch (error) {
      console.error("Error deleting medal:", error);
      alert("Failed to delete medal. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="medals-page">
        <h2>Medal Management</h2>
        {isLoading && <div className="loader">Submitting...</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="medals-grid">
          {medals.length > 0 ? (
            medals.map((medal) => (
              <div key={medal.id} className="medal-card">
                <img
                  src={`https://personalpeak360.biddabuzz.com/api/v1/rewards/medal/${medal.id}`}
                  alt={medal.text}
                  className="medal-image"
                />
                <p className="medal-text">{medal.text}</p>
                <p className="medal-type">Type: {medal.type}</p>
                <button
                  onClick={() => handleEdit(medal)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirm({ show: true, medalId: medal.id })
                  }
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No medals available.</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditMedal(null);
          }}
          className="add-medal-button"
        >
          Add New Medal
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editMedal ? "Edit Medal" : "Add a New Medal"}</h2>
              <form onSubmit={handleSubmit} className="medal-form">
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
                  Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <div className="form-actions">
                  <button type="submit" disabled={isLoading}>
                    {isLoading
                      ? "Submitting..."
                      : editMedal
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
              <h2>Are you sure you want to delete this medal?</h2>
              <div className="form-actions">
                <button
                  onClick={handleDelete}
                  className="delete-confirm-button"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirm({ show: false, medalId: null })
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

export default MedalsPage;

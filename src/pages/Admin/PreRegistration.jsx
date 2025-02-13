import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import "./PreRegistration.css"; // Add your custom CSS styles
import Layout from "../../layout/Layout";

const PreRegistration = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [viewDetails, setViewDetails] = useState(null); // State for storing user details

  useEffect(() => {
    const rootElement = document.getElementById("root");
    rootElement.classList.add("dashboard");

    return () => {
      rootElement.classList.remove("dashboard");
    };
  }, []);

  const fetchData = async (query = "") => {
    setLoading(true);
    setError("");

    try {
      const endpoint = query ? "/users/users/search" : "/users/users";
      const response = await Axios.get(endpoint, {
        params: {
          skip: page * rowsPerPage,
          limit: rowsPerPage,
          query: query, // Send search query if available
        },
      });

      setData(response.data.users);
      setTotal(response.data.total);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [page, rowsPerPage, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(total / rowsPerPage)) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setPage(0); // Reset to the first page when searching
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId); // Open confirmation popup with user ID
  };

  const confirmDelete = async () => {
    if (deleteUserId) {
      try {
        await Axios.delete(`/users/users/${deleteUserId}`);
        setData((prevData) =>
          prevData.filter((user) => user._id !== deleteUserId)
        );
        setDeleteUserId(null); // Close the popup
      } catch (err) {
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const cancelDelete = () => {
    setDeleteUserId(null); // Close the popup without deleting
  };

  const handleViewDetails = (user) => {
    setViewDetails(user); // Set the user details in state
  };

  const closeDetailsPopup = () => {
    setViewDetails(null); // Close the popup
  };

  return (
    <Layout>
      <div
        className="container1"
        style={{ backgroundColor: "white", color: "#212529" }}
      >
        {/* Header Section */}
        <div className="header">
          <h4>Overview of pre-registrations</h4>
          <h6>White label instance: 'Personal-Peak-360'</h6>
        </div>
        <hr />

        {/* Controls Section */}
        <div className="controls">
          <div className="entries">
            <label>
              Show
              <select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="entries-select"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entries per page
            </label>
          </div>
          <div className="search">
            <label>
              Search:
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                className="search-input"
              />
            </label>
          </div>
        </div>

        {/* Table or List Section */}
        <div className="table-container">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              {/* Desktop: Table View */}
              <table className="user-table">
                <thead>
                  <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>e-mail</th>
                    <th>Phone number</th>
                    <th>Date</th>
                    <th>Activation code</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => (
                    <tr key={user._id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number || "N/A"}</td>
                      <td>
                        {new Date(user.created_at).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td>{user.activation_code || "Not specified"}</td>
                      <td>
                        <div style={{ display: "flex" }}>
                          <button
                            className="btn-view"
                            onClick={() => handleViewDetails(user)}
                          >
                            View Details
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteClick(user._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile: List View */}
              <div className="mobile-view">
                {data.map((user) => (
                  <div className="user-item" key={user._id}>
                    <h5>
                      {user.first_name} {user.last_name}
                    </h5>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </p>
                    <p>
                      <strong>Phone number:</strong>{" "}
                      {user.phone_number || "N/A"}
                    </p>
                    <p>
                      <strong>Registered on:</strong>{" "}
                      {new Date(user.created_at).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    <p>
                      <strong>Activation code:</strong>{" "}
                      {user.activation_code || "Not specified"}
                    </p>
                    <div className="actions">
                      <button
                        className="btn-view"
                        onClick={() => handleViewDetails(user)}
                      >
                        View Details
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination Section */}
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            Prev
          </button>
          <span>
            Page {page + 1} of {Math.ceil(total / rowsPerPage)}
          </span>
          <button
            className="page-btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= Math.ceil(total / rowsPerPage) - 1}
          >
            Next
          </button>
        </div>
      </div>

      {/* View Details Popup */}
      {viewDetails && (
        <div className="details-popup">
          <div className="popup-header">
            <h5>Pre-registration details | #{viewDetails._id.slice(-4)}</h5>
            <button
              type="button"
              className="close-btn"
              aria-label="Close"
              onClick={closeDetailsPopup}
            >
              &times;
            </button>
          </div>
          <div className="popup-content">
            <p>
              <b>Full Name:</b> {viewDetails.first_name} {viewDetails.last_name}
            </p>
            <p>
              <b>Email:</b>{" "}
              <a href={`mailto:${viewDetails.email}`}>{viewDetails.email}</a>
            </p>
            <p>
              <b>Phone number:</b>{" "}
              <a href={`tel:${viewDetails.phone_number}`}>
                {viewDetails.phone_number || "N/A"}
              </a>
            </p>
            <p>
              <b>Address:</b> {viewDetails.address || "Not specified"}
            </p>
            <p>
              <b>Interests:</b> {viewDetails.interests || "Not specified"}
            </p>
            <p>
              <b>Registered on:</b>{" "}
              {new Date(viewDetails.created_at).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
            <p>
              <b>Activation code:</b>{" "}
              {viewDetails.activation_code || "Not specified"}
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deleteUserId && (
        <div className="delete-popup">
          <div className="popup-content">
            <p>Do you want to delete this user?</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button className="btn-danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PreRegistration;

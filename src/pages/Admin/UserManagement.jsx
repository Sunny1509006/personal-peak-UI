import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import "./PreRegistration.css"; // Add your custom CSS styles
import Layout from "../../layout/Layout";
import CreateUser from "./CreateUser";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);

  const handleCreateUser = (formData) => {
    console.log("User data submitted:", formData);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await Axios.get("/users", {
        params: {
          skip: page * rowsPerPage,
          limit: rowsPerPage,
          query: searchQuery,
        },
      });
      setUsers(response.data.users);
      setTotal(response.data.total);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(total / rowsPerPage)) {
      setPage(newPage);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
  };

  const confirmDelete = async () => {
    if (deleteUserId) {
      try {
        await Axios.delete(`/users/${deleteUserId}`);
        setUsers(users.filter((user) => user.id !== deleteUserId));
        setDeleteUserId(null);
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
  };

  const handleViewDetails = (user) => {
    setViewDetails(user);
  };

  const closeDetailsPopup = () => {
    setViewDetails(null);
  };

  return (
    <Layout>
      <div className="user-management-container">
        <div className="header">
          <h3>Overview of Users</h3>
          <div>
      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Create Users</button>
      {isModalOpen && (
        <CreateUser
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateUser}
        />
      )}
    </div>
        </div>

        <div className="controls">
          <div>
            <label>
              Show
              <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entries per page
            </label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Profile Picture</th>
                  <th>Role</th>
                  <th>Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>
                      <img
                        src={user.profile_picture || "/default-avatar.png"}
                        alt="Profile"
                        className="profile-picture"
                      />
                    </td>
                    <td>{user.role}</td>
                    <td>{user.level}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleViewDetails(user)}
                      >
                        View / Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            Prev
          </button>
          <span>
            Page {page + 1} of {Math.ceil(total / rowsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= Math.ceil(total / rowsPerPage) - 1}
          >
            Next
          </button>
        </div>

        {deleteUserId && (
          <div className="popup">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={confirmDelete} className="btn btn-danger">
              Yes
            </button>
            <button onClick={cancelDelete} className="btn btn-secondary">
              No
            </button>
          </div>
        )}

        {viewDetails && (
          <div className="popup">
            <h4>User Details</h4>
            <p>Name: {viewDetails.name}</p>
            <p>Email: {viewDetails.email}</p>
            <button onClick={closeDetailsPopup} className="btn btn-secondary">
              Close
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserManagement;

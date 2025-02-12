import React, { useState, useEffect } from "react";
import Axios from "../../Axios/Axios";
import "./UserManagement.css"; // Add your custom CSS styles
import Layout from "../../layout/Layout";
import CreateUser from "./CreateUser";

const UserManagement = () => {
  const BASE_URL = "https://personalpeak360.biddabuzz.com/api/v1";
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

  const handleCreateUserSuccess = () => {
    console.log("User created successfully, fetching updated users...");
    fetchData();  // Refresh user list
  };

  const handleCreateUser = (formData) => {
    console.log("User data submitted:", formData);
    setIsModalOpen(false);
    // Fetch updated user list after successful user creation
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
  
    try {
      const userId = localStorage.getItem("id"); 
      if (!userId) {
        console.error("No id found in local storage");
        return;
      }
  
      const response = await Axios.get("/users/user-users", {
        params: {
          user_id: userId
        },
      });
  
      let filteredUsers = response.data;
  
      // Apply search filter
      if (searchQuery) {
        filteredUsers = filteredUsers.filter(user =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.user_type.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      // Paginate results
      const startIndex = page * rowsPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  
      console.log("Filtered & Paginated Users:", paginatedUsers);
  
      setUsers(paginatedUsers);
      setTotal(filteredUsers.length); // Update total to reflect filtered users
  
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
        <div className="user-management-header">
          <h3>Overview of Users</h3>
          <div>
      <button onClick={() => setIsModalOpen(true)} className="user-management-btn btn-primary">Create Users</button>
      {isModalOpen && (
        <CreateUser
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateUser}
          onUserCreated={handleCreateUserSuccess} // Pass fetchData trigger
        />
      )}
    </div>
        </div>

        <div className="user-management-controls">
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

        <div className="user-management-table-container">
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
                    <td>{user.first_name+" "+user.last_name}</td>
                    <td>
                      <img
                       src={user.avatar ? `${BASE_URL}/users/view-image/${user.avatar.replace("/uploads/", "")}` : "/default-avatar.png"} 
                        alt="Profile"
                        className="user-management-profile-picture"
                      />
                    </td>
                    <td>{user.user_type}</td>
                    <td>{user.level}</td>
                    <td>
                      <button
                        className="user-management-btn btn-info"
                        onClick={() => handleViewDetails(user)}
                      >
                        View / Edit
                      </button>
                      <button
                        className="user-management-btn btn-danger"
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

        <div className="user-management-pagination">
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
          <div className="user-management-popup">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={confirmDelete} className="user-management-btn user-management-btn-danger">
              Yes
            </button>
            <button onClick={cancelDelete} className="user-management-btn btn-secondary">
              No
            </button>
          </div>
        )}

        {viewDetails && (
          <div className="user-management-popup">
            <h4>User Details</h4>
            <p>Name: {viewDetails.name}</p>
            <p>Email: {viewDetails.email}</p>
            <button onClick={closeDetailsPopup} className="user-management-btn btn-secondary">
              Close
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserManagement;

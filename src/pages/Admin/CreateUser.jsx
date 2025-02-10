import React, { useState } from "react";
import "./CreateUser.css";
import Axios from "../../Axios/Axios";

const CreateUser = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1); // Manage steps
  const id = localStorage.getItem("id")
  const [formData, setFormData] = useState({
    user_id: id,
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    avatar: null,
    role: "",
    whiteLabelOption: "",
    selectedWhiteLabel: "",
    whiteLabelName: "",
    subdomain: "",
    primaryColor: "",
    secondaryColor: "",
    tertiaryColor: "",
    logoLong: null,
    logoShort: null,
    logoIcon: null,
    favicon: null,
  });


  const [showAlert, setShowAlert] = useState(true); // Control the visibility of the alert box

  const roleMapping = {
    "Super-Super-Admin": "super-super-admin",
    "Lower-Super-Admin": "lower-super-admin",
    "Super-Admin → White-Label": "super-admin (white-label)",
    "Lower-Admin → White-Label": "lower-admin (white-label)",
    "User (Basic)": "user (basic)",
    "User (Standard)": "user (standard)",
    "User (Premium)": "user (premium)",
    "User (Basic) → Trial version": "user-trial (basic)", 
    "User (Standard) → Trial version": "user-trial (standard)", 
    "User (Premium) → Trial version": "user-trial (premium)"
  };
  // List of roles grouped by category
  const roles = [
    { category: "Allgemein", options: ["Super-Super-Admin", "Lower-Super-Admin"] },
    { category: "WhiteLabel", options: ["Super-Admin → White-Label", "Lower-Admin → White-Label"] },
    { category: "Nutzer", options: ["User (Basic)", "User (Standard)", "User (Premium)"] },
    { category: "Testversion", options: ["User (Basic) → Trial version", "User (Standard) → Trial version", "User (Premium) → Trial version"] },
  ];

  // White label options
  const whiteLabelOptions = [
    "(First of all) No white label",
    "Existing white label",
    "Create new WhiteLabel",
  ];

  // Mock list of white label instances
  const existingWhiteLabels = [
    "Personal Peak 360 (personalpeak360.de)",
    "Global Peak (globalpeak.com)",
    "Business Suite (businesssuite.org)",
  ];



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleNextStep = () => {
    if (step === 2 && !formData.role.includes("White-Label")) {
      handleSubmit(); // Directly create user if no white label role
    } else if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent default form submission
  
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const userType = roleMapping[formData.role] || "";
    let whiteLabelInstance = null;
    let projectName = null;
  
    const formDataToSend = new FormData();
    
    // Append required fields
    formDataToSend.append("user_id", formData.user_id)
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("user_name", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("user_type", userType);
  
    // Append avatar if available
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }
  
    // Handle white-label logic
    if (userType === "super-admin (white-label)" || userType === "lower-admin (white-label)") {
      if (formData.whiteLabelOption === "Create new WhiteLabel") {
        whiteLabelInstance = "new";
        projectName = formData.whiteLabelName;
  
        formDataToSend.append("white_label_instance", whiteLabelInstance);
        formDataToSend.append("project_name", projectName);
        formDataToSend.append("white_label_details[project_name]", formData.whiteLabelName);
        formDataToSend.append("white_label_details[subdomain]", formData.subdomain);
        formDataToSend.append("white_label_details[primary_color]", formData.primaryColor || "#000000");
        formDataToSend.append("white_label_details[secondary_color]", formData.secondaryColor || "#000000");
        formDataToSend.append("white_label_details[tertiary_color]", formData.tertiaryColor || "#000000");
  
        if (formData.logoLong) formDataToSend.append("white_label_details[long_version_logo]", formData.logoLong);
        if (formData.logoShort) formDataToSend.append("white_label_details[short_version_logo]", formData.logoShort);
        if (formData.logoIcon) formDataToSend.append("white_label_details[icon_version]", formData.logoIcon);
        if (formData.favicon) formDataToSend.append("white_label_details[favicon]", formData.favicon);
      } else if (formData.whiteLabelOption === "Existing white label") {
        whiteLabelInstance = "existing";
        formDataToSend.append("white_label_instance", whiteLabelInstance);
      }
    }
  
    console.log("Submitting FormData:", Object.fromEntries(formDataToSend.entries()));
  
    try {
      const response = await Axios.post("/users/user-create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("User created successfully!");
      console.log("Response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error creating user:", error.response ? error.response.data : error);
      alert("Failed to create user. Please check the required fields.");
    }
  };
  

  const handleCloseAlert = () => {
    setShowAlert(false); // Hide the alert box
  };

  return (
    <div className="modal-overlay-create-user">
      <div className="modal-content-create-user">
        <div className="modal-header-create-user">
          <h2>Create Users</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="create-user-form">
          {/* Progress Bar */}
          <div className="progress-bar-user">
            <div className={`progress-step-user ${step === 1 ? "active" : ""}`}>
              1. User details (*)
            </div>
            <div className={`progress-step-user ${step === 2 ? "active" : ""}`}>
              2. Grant rights (*)
            </div>
            <div className={`progress-step-user ${step === 3 ? "active" : ""}`}>
              3. White label
            </div>
          </div>

          {/* Step 1: User Details */}
          {step === 1 && (
            <>
              <div className="form-group">
                <label>
                  First name (*)
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Last name (*)
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Username (*)
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Temporary password (*)
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Avatar
                  <input type="file" name="avatar" onChange={handleFileChange} />
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="submit-button" onClick={handleNextStep}>
                  Further
                </button>
              </div>
            </>
          )}

          {/* Step 2: Grant Rights */}
          {step === 2 && (
            <>
              <div className="form-group">
                <label>
                  Role (*)
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((group, index) => (
                      <optgroup key={index} label={group.category}>
                        {group.options.map((role, i) => (
                          <option key={i} value={role}>
                            {role}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="back-button" onClick={handlePrevStep}>
                  Back
                </button>
                <button
                  type="button"
                  className="submit-button"
                  onClick={handleNextStep}
                >
                  {formData.role.includes("White-Label") ? "Further" : "Create User"}
                </button>
              </div>
            </>
          )}

          {/* Step 3: White Label */}
          {step === 3 && (
            <>
              <div className="form-group">
                <label>
                  Should the user receive a white label instance?
                  <select
                    name="whiteLabelOption"
                    value={formData.whiteLabelOption}
                    onChange={handleInputChange}
                    required
                  >
                    {whiteLabelOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {formData.whiteLabelOption === "Existing white label" && showAlert && (
                <div className="alert-box">
                  <p>
                    This selection only allows the user to manage and customize the white
                    label. To change the appearance of the instance, you must log in using
                    the specified domain!
                  </p>
                  <button className="close-alert" onClick={handleCloseAlert}>&times;</button>
                </div>
              )}
              {formData.whiteLabelOption === "Existing white label" && (
                <div className="form-group">
                  <label>
                    Select WhiteLabel (*)
                    <select
                      name="selectedWhiteLabel"
                      value={formData.selectedWhiteLabel}
                      onChange={handleInputChange}
                      required
                    >
                      {existingWhiteLabels.map((label, index) => (
                        <option key={index} value={label}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
              {/* Show options for "Create new WhiteLabel" */}
              {formData.whiteLabelOption === "Create new WhiteLabel" && showAlert && (
                <div className="alert-box">
                  <p>
                  This selection only allows the user to manage and customize the white label.
                  To change the appearance of the instance, you must log in using the specified domain!
                  </p>
                  <button className="close-alert" onClick={handleCloseAlert}>&times;</button>
                </div>
              )}
              {formData.whiteLabelOption === "Create new WhiteLabel" && (
                <>
                  <div className="form-group">
                    <label>
                      White label or project name (*)
                      <input
                        type="text"
                        name="whiteLabelName"
                        value={formData.whiteLabelName}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group subdomain-group">
                    <label>
                        Subdomain (*)
                        <div className="subdomain-input-wrapper">
                        <input
                            type="text"
                            name="subdomain"
                            value={formData.subdomain}
                            onChange={handleInputChange}
                            placeholder="subdomain"
                            required
                            className="subdomain-input"
                        />
                        <span className="subdomain-suffix">.personalpeak360.de</span>
                        </div>
                    </label>
                    </div>
                    <div className="info-box">
                    <p><strong>Primary color:</strong> This could be used for the main actions and eye-catching elements, such as:</p>
                    <ul>
                        <li>Main buttons (e.g. "Save", "Submit")</li>
                        <li>Important links (e.g. in the navigation)</li>
                        <li>Headers and accent areas</li>
                    </ul>

                    <p><strong>Secondary color:</strong> This is suitable for supporting actions and less noticeable elements, such as:</p>
                    <ul>
                        <li>Secondary buttons (e.g. "Cancel", "Back")</li>
                        <li>Passive Representing Links</li>
                        <li>Backgrounds of sections or boxes</li>
                    </ul>

                    <p><strong>Tertiary color:</strong> This can be used as an accent color or for additional details, such as:</p>
                    <ul>
                        <li>Hover effects on buttons and links</li>
                        <li>Borders and underlines</li>
                        <li>Icons or small decorative elements</li>
                    </ul>
                    </div>

                  <div className="form-group">
                    <label>
                      1st color (primary) (*)
                      <input
                        type="color"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      2nd color (secondary) (*)
                      <input
                        type="color"
                        name="secondaryColor"
                        value={formData.secondaryColor}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      3rd color (tertiary) (*)
                      <input
                        type="color"
                        name="tertiaryColor"
                        value={formData.tertiaryColor}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Logo (long version)
                      <input
                        type="file"
                        name="logoLong"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Logo (short version)
                      <input
                        type="file"
                        name="logoShort"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Logo (icon version)
                      <input
                        type="file"
                        name="logoIcon"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      Favicon
                      <input
                        type="file"
                        name="favicon"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </>
              )}
              <div className="form-actions">
                <button type="button" className="back-button" onClick={handlePrevStep}>
                  Back
                </button>
                <button type="submit" className="submit-button">
                  Create Users & White Label
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;

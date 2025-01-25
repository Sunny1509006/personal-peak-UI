import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccessContext } from "../../App";
import "./MobilityStretchPower.css";

const MobilityStretchPower = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testCode, setTestCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const validCode = "SamuelThomas25"; // Adjust the valid code here
  const navigate = useNavigate();
  const { setHasAccess } = useContext(AccessContext); // Get access control functions

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTestCode("");
    setErrorMessage("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckCode = () => {
    if (testCode.trim() === validCode) {
      setHasAccess(true); // Grant access
      navigate("/mobility-stretch-power"); // Redirect to the protected route
    } else {
      setErrorMessage("Falscher Code, bitte erneut versuchen!");
    }
  };

  return (
    <div>
      <button className="big-button" onClick={handleOpenModal}>
        Starte jetzt den MobilityStretchPower-Test
        <span>(Teste deine Beweglichkeit & Kraft)</span>
      </button>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === "modal-overlay") {
              handleCloseModal();
            }
          }}
        >
          <div className="modal-content">
            <span className="close-modal" onClick={handleCloseModal}>
              ×
            </span>
            <h2>Testcode eingeben</h2>
            <p>Bitte gib hier deinen Testcode ein, um zum Test zu gelangen:</p>
            <input
              type="text"
              value={testCode}
              onChange={(e) => setTestCode(e.target.value)}
              placeholder="z.B. SamuelThomas25"
            />
            <button className="check-code-btn" onClick={handleCheckCode}>
              Los geht's
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilityStretchPower;

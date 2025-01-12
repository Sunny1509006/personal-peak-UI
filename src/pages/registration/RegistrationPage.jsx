import { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import useLoginSubmit from "../../hooks/useLoginSubmit";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // Changed initial value to 0
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    street: "",
    zipcode: "",
    city: "",
    email: "",
    phone: "",
    password: "",
    contactPermission: false,
    interests: [],
    activationCode: "",
  });

  const { register, handleSubmit, onRegisterSubmit, onActivationCode } =
    useLoginSubmit(setStep);

  const [validationErrors, setValidationErrors] = useState({
    fields: false,
    contactPermission: false,
  });

  const openPopup = (step) => setStep(step);

  const closePopup = () => setStep(0);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validateStep1 = () => {
    const requiredFields = [
      "firstname",
      "lastname",
      "street",
      "zipcode",
      "city",
      "email",
      "phone",
    ];
    const allFilled = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    if (!allFilled) {
      setValidationErrors((prev) => ({ ...prev, fields: true }));
      return;
    }

    setValidationErrors((prev) => ({ ...prev, fields: false }));

    if (!formData.contactPermission) {
      setValidationErrors((prev) => ({ ...prev, contactPermission: true }));
      return;
    }

    setValidationErrors((prev) => ({ ...prev, contactPermission: false }));
    setStep(2);
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleFinalSubmit = () => {
    const finalData = {
      ...formData,
      username: formData.email, // Adding username field required by the API
    };
    onRegisterSubmit(finalData);
  };

  const handleActivationCodeSubmit = () => {
    onActivationCode({
      activationCode: formData.activationCode,
      email: formData.email,
    });
  };

  return (
    <div className="container">
      <h1>Pre-Launch Vorteile sichern!</h1>
      <button className="register-button" onClick={() => openPopup(1)}>
        Jetzt registrieren
      </button>

      {step > 0 && (
        <>
          <div
            className={`overlay ${step > 0 ? "active" : ""}`}
            onClick={closePopup}
          ></div>
          <div className={`popup ${step > 0 ? "active" : ""}`}>
            <button className="close" onClick={closePopup}>
              &times;
            </button>

            {step === 1 && (
              <div id="step1" className="step">
                <h2>Schritt 1 von 3: Persönliche Daten</h2>
                <form>
                  {[
                    "firstname",
                    "lastname",
                    "street",
                    "zipcode",
                    "city",
                    "email",
                    "phone",
                  ].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      {...register(field, { required: true })}
                      placeholder={
                        field === "firstname"
                          ? "Vorname"
                          : field === "lastname"
                          ? "Nachname"
                          : field === "street"
                          ? "Straße und Hausnummer"
                          : field === "zipcode"
                          ? "PLZ"
                          : field === "city"
                          ? "Ort"
                          : field === "email"
                          ? "E-Mail"
                          : field === "phone"
                          ? "Telefonnummer"
                          : "Passwort"
                          ? "Passwort"
                          : ""
                      }
                      value={formData[field]}
                      onChange={handleInputChange}
                      required
                    />
                  ))}
                  <label>
                    <input
                      style={{
                        width: "100%",
                      }}
                      type="checkbox"
                      id="contactPermission"
                      checked={formData.contactPermission}
                      onChange={handleInputChange}
                    />
                    Ich erlaube eine Kontaktaufnahme durch PP360!
                  </label>
                  <br />
                  {validationErrors.contactPermission && (
                    <span className="error">
                      Bitte erlauben Sie die Kontaktaufnahme, um fortzufahren.
                    </span>
                  )}
                  {validationErrors.fields && (
                    <span className="error">
                      Bitte füllen Sie alle Felder aus.
                    </span>
                  )}
                  <div style={{ textAlign: "right" }}>
                    <button type="button" onClick={validateStep1}>
                      Weiter
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div id="step2" className="step">
                <h2>Schritt 2 von 3: Interessen auswählen</h2>
                <p>Wählen Sie Ihre Interessen aus:</p>
                <div className="interests">
                  {[
                    "Schmerzfreiheit",
                    "Gewichtsverlust",
                    "Muskelaufbau",
                    "Bessere Schlafqualität",
                    "Mehr Energie",
                    "Stressbewältigung",
                  ].map((interest) => (
                    <div
                      key={interest}
                      className={`interest ${
                        formData.interests.includes(interest) ? "selected" : ""
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "right" }}>
                  <button type="button" onClick={() => setStep(1)}>
                    Zurück
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // console.log("activationCode", formData.activationCode);
                      setStep(3);
                    }}
                  >
                    Weiter
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div id="step3" className="step">
                <h2>Schritt 3 von 3: Aktivierungscode</h2>
                <p>
                  Falls Sie einen Aktivierungscode haben, tragen Sie ihn hier
                  ein:
                </p>
                <input
                  type="text"
                  id="password"
                  placeholder="Aktivierungscode"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <div style={{ textAlign: "right" }}>
                  <button type="button" onClick={() => setStep(2)}>
                    Zurück
                  </button>
                  <button
                    onClick={handleSubmit(handleFinalSubmit)}
                    // type="submit"
                  >
                    Jetzt registrieren
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrationPage;

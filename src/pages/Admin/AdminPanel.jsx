import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import "./AdminPanel.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { fetchTranslations, fetchTranslationIfMissing } from "../../utils/fetchTranslations";
import Layout from "../../layout/Layout";

const isAccessible = (roles) => {
  const userRoles = JSON.parse(localStorage.getItem("user_type")) || [];
  // If `roles` is a string, convert it to an array for consistency
  if (typeof roles === "string") roles = [roles];

  // Check if any of the user roles match the required roles
  return roles.some((role) => userRoles.includes(role));
};


const AdminPanel = () => {

  const component_name = "admin-panel";
  
   // Get language from localStorage OR default to "de"
    const [languageCode, setLanguageCode] = useState(() => {
     return localStorage.getItem("appLanguage") || "de";
   });
   
   // Load translations from sessionStorage for this specific component
   const [translations, setTranslations] = useState(() => {
     const savedTranslations = JSON.parse(sessionStorage.getItem(`translations_${component_name}_${languageCode}`));
     return savedTranslations || {};
   });
   
   const [textsToTranslate, setTextsToTranslate] = useState(new Set());
   const [isTranslationLoaded, setIsTranslationLoaded] = useState(
     sessionStorage.getItem(`translations_${component_name}_${languageCode}`) !== null
   );
   
   useEffect(() => {
     const fetchComponentTranslations = async () => {
       if (!isTranslationLoaded) {
         setIsTranslationLoaded(false);
         const fetchedTranslations = await fetchTranslations(component_name, languageCode);
         setTranslations(fetchedTranslations);
         sessionStorage.setItem(`translations_${component_name}_${languageCode}`, JSON.stringify(fetchedTranslations));
         setIsTranslationLoaded(true);
       }
     };
     fetchComponentTranslations();
   }, [languageCode]);
   
   useEffect(() => {
     const handleStorageChange = () => {
       const storedLanguage = localStorage.getItem("appLanguage") || "de";
       if (storedLanguage !== languageCode) {
         setLanguageCode(storedLanguage);
         setTranslations({}); // Reset translations when language changes
         setIsTranslationLoaded(false);
       }
     };
     window.addEventListener("storage", handleStorageChange);
     return () => window.removeEventListener("storage", handleStorageChange);
   }, [languageCode]);
   
   const checkAndFetchTranslation = (text) => {
     if (!isTranslationLoaded) return "Loading...";
   
     if (!translations[text] && !textsToTranslate.has(text)) {
       setTextsToTranslate((prev) => new Set(prev).add(text));
       fetchTranslationIfMissing(component_name, text).then((translatedText) => {
         setTranslations((prev) => {
           const updatedTranslations = { ...prev, [text]: translatedText };
           sessionStorage.setItem(`translations_${component_name}_${languageCode}`, JSON.stringify(updatedTranslations));
           return updatedTranslations;
         });
       });
     }
     return translations[text] || text;
   };

  // Dashboard Tiles with Links
  const tiles = [
    {
      icon: "bi-file-earmark-text",
      title: "Pre Registrations",
      description: "Manage user registrations for version 2.0.",
      link: "/pre-registration", // ✅ Add route path
      roles: ["super-super-admin", "lower-super-admin", "super-admin (white-label)", "lower-admin (white-label)"]
    },
    {
      icon: "bi-people",
      title: "Users",
      description: "Manage users and assign roles.",
      link: "/users",
      roles: ["super-super-admin", "lower-super-admin", "super-admin (white-label)", "lower-admin (white-label)"]
    },
    {
      icon: "bi-bar-chart",
      title: "Analysis",
      description: "View and analyze user data.",
      link: "/analysis",
      roles: ["super-super-admin", "lower-super-admin", "super-admin (white-label)", "lower-admin (white-label)"]
    },
    {
      icon: "bi-cash-stack",
      title: "Accounting",
      description: "Manage memberships and invoices.",
      link: "/accounting",
      roles: ["super-super-admin", "lower-super-admin", "super-admin (white-label)", "lower-admin (white-label)"]
    },
    {
      icon: "bi-gear",
      title: "(WhiteLabel) Settings",
      description: "Customize white-label instances.",
      link: "/settings",
      roles: ["super-super-admin", "lower-super-admin", "super-admin (white-label)", "lower-admin (white-label)"]
    },
    {
      icon: "bi-file-earmark",
      title: "Plans",
      description: "Create and manage training plans.",
      link: "/plans",
      roles: ["super-super-admin", "lower-super-admin", "super-admin (white-label)", "lower-admin (white-label)"]
    },
    {
      icon: "bi-kanban",
      title: "Kanban Board",
      description: "Plan and manage projects.",
      link: "/kanban-board",
      roles: ["super-super-admin", "lower-super-admin", "super-admin (white-label)", "lower-admin (white-label)"]
    },
    {
      icon: "bi-cart",
      title: "E-Commerce",
      description: "Buy to get access.",
      link: "/ecommerce",
      roles: ["super-super-admin", "lower-super-admin", "super-admin (white-label)", "lower-admin (white-label)"]
    },
  ];

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {tiles.map((tile, index) => (
            <div key={index} className={`col-md-4 mb-3 ${isAccessible(tile.roles) ? "" : "transparent-item-admin-panel"}`}>
              {/* ✅ Wrap card in Link to make it clickable */}
              {isAccessible(tile.roles) ? (
                <Link to={tile.link} className="card-tile text-decoration-none">
                  <i className={`bi ${tile.icon}`}></i>
                  <h5>{checkAndFetchTranslation(tile.title)}</h5>
                  <p>{checkAndFetchTranslation(tile.description)}</p>
                </Link>
              ) : (
                <div className="card-tile">
                  <i className={`bi ${tile.icon}`}></i>
                  <h5>{checkAndFetchTranslation(tile.title)}</h5>
                  <p>{checkAndFetchTranslation(tile.description)}</p>
                  <i className="bx bx-lock lock-icon" style={{position: "absolute", right: "30px", top: "10px"}}></i>
                </div>
              )}  
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;

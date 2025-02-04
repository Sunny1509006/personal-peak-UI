// // src/context/languageContext.js
// import { createContext, useContext, useState, useEffect } from "react";
// import Axios from "../Axios/Axios";

// // Create Context
// export const TranslationContext = createContext();

// // API Functions using Axios
// const fetchTranslations = async (componentName, languageCode) => {
//   try {
//     const response = await Axios.get(`/translations/translations`, {
//       params: {
//         component_name: componentName,
//         lang: languageCode,
//       },
//     });
//     return response.data || {};
//   } catch (error) {
//     console.error("Error fetching translations:", error);
//     return {}; // Return empty object if an error occurs
//   }
// };

// const storeTranslation = async (componentName, text) => {
//   try {
//     const response = await Axios.post("/translations/translate", {
//       component_name: componentName,
//       text: text,
//     });
//     return response.status === 200;
//   } catch (error) {
//     console.error("Error storing translation:", error);
//     return false;
//   }
// };

// // Translation Provider
// export const TranslationProvider = ({ children }) => {
//   const storedLanguage = localStorage.getItem("appLanguage") || "en";
//   const [language, setLanguage] = useState(storedLanguage);
//   const [translations, setTranslations] = useState({});
//   const [missingTranslations, setMissingTranslations] = useState(new Set());

//   // Fetch translations when language changes
//   useEffect(() => {
//     const loadTranslations = async () => {
//       const componentName = "dashboard"; // Modify dynamically per component
//       const fetchedTranslations = await fetchTranslations(componentName, language);
//       setTranslations(fetchedTranslations);
//       setMissingTranslations(new Set()); // Reset missing translations tracker
//     };
//     loadTranslations();
//   }, [language]);

//   useEffect(() => {
//     // Detect language changes from `localStorage`
//     const handleStorageChange = () => {
//       const newLanguage = localStorage.getItem("appLanguage") || "en";
//       if (newLanguage !== language) {
//         setLanguage(newLanguage);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, [language]);

//   // **Updated t() function**
//   const t = (text, componentName = "dashboard") => {
//     // If translation exists, return it
//     if (translations[text]) return translations[text];

//     // If translation is missing and already attempted, return original text
//     if (missingTranslations.has(text)) return text;

//     // Mark this text as missing to prevent infinite calls
//     setMissingTranslations((prev) => new Set(prev).add(text));

//     // Call storeTranslation API
//     storeTranslation(componentName, text).then((success) => {
//       if (success) {
//         // Re-fetch translations only once after storing
//         fetchTranslations(componentName, language).then((updatedTranslations) => {
//           setTranslations(updatedTranslations);
//         });
//       }
//     });

//     return text; // Fallback to original text until translation is available
//   };

//   return (
//     <TranslationContext.Provider value={{ t, language }}>
//       {children}
//     </TranslationContext.Provider>
//   );
// };

// // Custom Hook for translations
// export const useTranslation = () => {
//   return useContext(TranslationContext);
// };


// src/context/languageContext.js
import { createContext, useContext, useState, useEffect } from "react";
import Axios from "../Axios/Axios";

// Create Context
export const TranslationContext = createContext();

// API Function using Axios
const fetchTranslations = async (componentName, languageCode) => {
  try {
    const response = await Axios.get(`/translations/translations`, {
      params: {
        component_name: componentName,
        lang: languageCode,
      },
    });
    return response.data || {};
  } catch (error) {
    console.error(`Error fetching translations for ${componentName}:`, error);
    return {}; // Return empty object if an error occurs
  }
};

// Translation Provider
export const TranslationProvider = ({ children }) => {
  const storedLanguage = localStorage.getItem("appLanguage") || "en";
  const [language, setLanguage] = useState(storedLanguage);
  const [translations, setTranslations] = useState({}); // Stores translations for multiple components
  const [loadedComponents, setLoadedComponents] = useState(new Set()); // Tracks loaded components

  // Fetch translations for multiple components dynamically
  const loadTranslations = async (componentName) => {
    const fetchedTranslations = await fetchTranslations(componentName, language);
    setTranslations((prev) => ({
      ...prev,
      [componentName]: fetchedTranslations, // Store translations per component
    }));
    setLoadedComponents((prev) => new Set(prev).add(componentName)); // Mark component as loaded
  };

  useEffect(() => {
    // Fetch translations for commonly used components on app load
    ["dashboard", "sidebar"].forEach((component) => loadTranslations(component));
  }, [language]); // ✅ Re-fetch translations whenever language changes

  useEffect(() => {
    // Detect language changes from `localStorage`
    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem("appLanguage") || "en";
      if (newLanguage !== language) {
        setLanguage(newLanguage);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [language]);

  // **Updated t() function**
  const t = (text, componentName) => {
    if (!loadedComponents.has(componentName)) {
      loadTranslations(componentName); // Ensure component translations are loaded
      return text; // Return original text until translations are available
    }

    return translations[componentName]?.[text] || text; // Return translation if available, else return original text
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom Hook for translations
export const useTranslation = () => {
  return useContext(TranslationContext);
};


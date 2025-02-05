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
  // 🔹 Always get stored language or default to 'de'
  const storedLanguage = localStorage.getItem("appLanguage") || "de";
  const [language, setLanguage] = useState(storedLanguage);
  const [translations, setTranslations] = useState({}); // Stores translations for multiple components
  const [loadedComponents, setLoadedComponents] = useState(new Set()); // Tracks loaded components

  // ✅ Ensure selected language is always saved in localStorage
  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

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
    // Detect language changes from localStorage across multiple tabs
    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem("appLanguage") || "de";
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

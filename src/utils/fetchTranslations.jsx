import Axios from "../Axios/Axios";

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

const fetchTranslationIfMissing = async (componentName, text) => {
    try {
      const response = await Axios.post(`/translations/translate`, {
        component_name: componentName,
        text: text,
      });
  
      if (!response.data || !Array.isArray(response.data.translations)) {
        return text; // Return original text if response is not valid
      }
  
      const languageCode = (localStorage.getItem("appLanguage") || "de").toUpperCase();
  
      const translationEntry = response.data.translations.find(entry => entry.lang === languageCode);

      console.log("translation entry", translationEntry)
  
      return translationEntry ? translationEntry.translation : text;
    } catch (error) {
      console.error(`Error fetching translation for '${text}' in ${componentName}:`, error);
      return text; // Return "failed" if API call fails
    }
  };
  

export { fetchTranslations, fetchTranslationIfMissing };






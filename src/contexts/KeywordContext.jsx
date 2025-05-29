import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const KeywordContext = createContext();

export const KeywordProvider = ({ children }) => {
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await axios.post('http://3.36.74.61:8080/article/keywords', {}, {
          headers: {}
        });
        
        if (response.data && response.data['핵심 키워드']) {
          const keywordsArray = Object.entries(response.data['핵심 키워드']).map(([keyword, count]) => ({
            keyword,
            count
          }));
          setKeywords(keywordsArray);
        } else {
          console.error('Invalid response format:', response.data);
          setKeywords([]);
        }
      } catch (error) {
        console.error('Error fetching keywords:', error.response || error);
        setError(error);
        setKeywords([]);
      }
    };

    fetchKeywords();
  }, []);

  return (
    <KeywordContext.Provider value={{ keywords, error }}>
      {children}
    </KeywordContext.Provider>
  );
};

export const useKeywords = () => {
  const context = useContext(KeywordContext);
  if (context === undefined) {
    throw new Error('useKeywords must be used within a KeywordProvider');
  }
  return context;
}; 
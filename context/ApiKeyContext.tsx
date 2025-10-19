import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

const API_KEY_STORAGE_ITEM = 'gemini-api-key';

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(() => {
    try {
      return localStorage.getItem(API_KEY_STORAGE_ITEM);
    } catch (error) {
      console.warn('Could not read API key from localStorage', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (apiKey) {
        localStorage.setItem(API_KEY_STORAGE_ITEM, apiKey);
      } else {
        localStorage.removeItem(API_KEY_STORAGE_ITEM);
      }
    } catch (error) {
      console.warn('Could not save API key to localStorage', error);
    }
  }, [apiKey]);

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};

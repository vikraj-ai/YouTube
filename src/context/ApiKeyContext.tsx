import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiKeyContextType {
  apiKeys: string[];
  currentKeyIndex: number;
  addApiKey: (key: string) => void;
  removeApiKey: (index: number) => void;
  hasRequiredKeys: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeys] = useState<string[]>([]);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

  const addApiKey = (key: string) => {
    setApiKeys(prev => [...prev, key]);
  };

  const removeApiKey = (index: number) => {
    setApiKeys(prev => prev.filter((_, i) => i !== index));
  };

  const hasRequiredKeys = apiKeys.length >= 5;

  useEffect(() => {
    const storedKeys = localStorage.getItem('youtubeApiKeys');
    if (storedKeys) {
      setApiKeys(JSON.parse(storedKeys));
    }
  }, []);

  useEffect(() => {
    if (apiKeys.length > 0) {
      localStorage.setItem('youtubeApiKeys', JSON.stringify(apiKeys));
    }
  }, [apiKeys]);

  return (
    <ApiKeyContext.Provider value={{ 
      apiKeys, 
      currentKeyIndex, 
      addApiKey, 
      removeApiKey,
      hasRequiredKeys 
    }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKeys = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKeys must be used within an ApiKeyProvider');
  }
  return context;
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Video } from '../types';

interface VideoContextType {
  watchHistory: Video[];
  watchLater: Video[];
  viewportMode: 'desktop' | 'mobile';
  addToHistory: (video: Video) => void;
  addToWatchLater: (video: Video) => void;
  removeFromWatchLater: (videoId: string) => void;
  isInWatchLater: (videoId: string) => boolean;
  setViewportMode: (mode: 'desktop' | 'mobile') => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchHistory, setWatchHistory] = useState<Video[]>([]);
  const [watchLater, setWatchLater] = useState<Video[]>([]);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const storedHistory = localStorage.getItem('watchHistory');
    const storedWatchLater = localStorage.getItem('watchLater');
    
    if (storedHistory) setWatchHistory(JSON.parse(storedHistory));
    if (storedWatchLater) setWatchLater(JSON.parse(storedWatchLater));
  }, []);

  const addToHistory = (video: Video) => {
    setWatchHistory(prev => {
      const filtered = prev.filter(v => v.id !== video.id);
      const updated = [video, ...filtered].slice(0, 50);
      localStorage.setItem('watchHistory', JSON.stringify(updated));
      return updated;
    });
  };

  const addToWatchLater = (video: Video) => {
    setWatchLater(prev => {
      if (prev.some(v => v.id === video.id)) return prev;
      const updated = [video, ...prev];
      localStorage.setItem('watchLater', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWatchLater = (videoId: string) => {
    setWatchLater(prev => {
      const updated = prev.filter(v => v.id !== videoId);
      localStorage.setItem('watchLater', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWatchLater = (videoId: string) => {
    return watchLater.some(v => v.id === videoId);
  };

  return (
    <VideoContext.Provider value={{
      watchHistory,
      watchLater,
      viewportMode,
      addToHistory,
      addToWatchLater,
      removeFromWatchLater,
      isInWatchLater,
      setViewportMode
    }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
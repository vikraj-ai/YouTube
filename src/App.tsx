import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, Trophy, Code2, Palette, Music2, FlaskConical } from 'lucide-react';
import Header from './components/Header';
import Categories from './components/Categories';
import VideoGrid from './components/VideoGrid';
import Sidebar from './components/Sidebar';
import ApiKeySetup from './components/ApiKeySetup';
import { ApiKeyProvider, useApiKeys } from './context/ApiKeyContext';
import { VideoProvider, useVideo } from './context/VideoContext';
import { searchVideos } from './services/youtube';
import { Video, Category } from './types';

const categories: Category[] = [
  { icon: <Compass size={20} />, name: 'Explore' },
  { icon: <Code2 size={20} />, name: 'Programming', query: 'programming tutorials' },
  { icon: <BookOpen size={20} />, name: 'Literature', query: 'literature lessons' },
  { icon: <FlaskConical size={20} />, name: 'Science', query: 'science education' },
  { icon: <Palette size={20} />, name: 'Arts', query: 'arts tutorials' },
  { icon: <Music2 size={20} />, name: 'Music', query: 'music lessons' },
  { icon: <Trophy size={20} />, name: 'Mathematics', query: 'mathematics tutorials' },
];

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('Explore');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { apiKeys, currentKeyIndex } = useApiKeys();
  const { viewportMode } = useVideo();

  const fetchVideos = async (query?: string) => {
    if (!apiKeys.length) return;
    
    try {
      setLoading(true);
      setError(null);
      const category = categories.find(c => c.name === selectedCategory);
      const searchQuery = query || category?.query || '';
      const { videos: fetchedVideos } = await searchVideos(apiKeys[currentKeyIndex], searchQuery);
      setVideos(fetchedVideos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load videos. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKeys.length) {
      fetchVideos();
    }
  }, [selectedCategory, apiKeys, currentKeyIndex]);

  const handleSearch = (query: string) => {
    fetchVideos(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div 
      className={`min-h-screen bg-gray-50 ${
        viewportMode === 'mobile' ? 'max-w-[480px] mx-auto border-x border-gray-200 shadow-lg' : ''
      }`}
    >
      <Header onSearch={handleSearch} onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      
      <main className={`pt-32 px-4 pb-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : ''}`}>
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </main>
      <ApiKeySetup />
    </div>
  );
}

function App() {
  return (
    <ApiKeyProvider>
      <VideoProvider>
        <AppContent />
      </VideoProvider>
    </ApiKeyProvider>
  );
}

export default App;
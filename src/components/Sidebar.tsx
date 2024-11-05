import React, { useState } from 'react';
import { Home, Compass, History, PlaySquare, Clock, ThumbsUp, Settings, HelpCircle, Key, Smartphone, Monitor } from 'lucide-react';
import ApiKeysModal from './ApiKeysModal';
import VideoHistoryModal from './VideoHistoryModal';
import WatchLaterModal from './WatchLaterModal';
import { useVideo } from '../context/VideoContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isApiKeysModalOpen, setIsApiKeysModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isWatchLaterModalOpen, setIsWatchLaterModalOpen] = useState(false);
  const { watchHistory, watchLater, viewportMode, setViewportMode } = useVideo();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home' },
    { icon: <Compass size={20} />, label: 'Explore' },
    { 
      icon: <History size={20} />, 
      label: 'History',
      count: watchHistory.length,
      onClick: () => setIsHistoryModalOpen(true)
    },
    { icon: <PlaySquare size={20} />, label: 'Your Videos' },
    { 
      icon: <Clock size={20} />, 
      label: 'Watch Later',
      count: watchLater.length,
      onClick: () => setIsWatchLaterModalOpen(true)
    },
    { icon: <ThumbsUp size={20} />, label: 'Liked Videos' },
  ];

  const settingsItems = [
    { 
      icon: <Key size={20} />, 
      label: 'API Keys',
      onClick: () => setIsApiKeysModalOpen(true)
    },
    { 
      icon: viewportMode === 'desktop' ? <Smartphone size={20} /> : <Monitor size={20} />,
      label: `${viewportMode === 'desktop' ? 'Mobile' : 'Desktop'} View`,
      onClick: () => setViewportMode(viewportMode === 'desktop' ? 'mobile' : 'desktop')
    },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help' },
  ];

  return (
    <>
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="py-2">
          <div className="pb-2 mb-2 border-b border-gray-200">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-100 transition-colors text-gray-700"
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2">
            {settingsItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition-colors text-gray-700"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ApiKeysModal 
        isOpen={isApiKeysModalOpen} 
        onClose={() => setIsApiKeysModalOpen(false)} 
      />
      <VideoHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
      <WatchLaterModal
        isOpen={isWatchLaterModalOpen}
        onClose={() => setIsWatchLaterModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
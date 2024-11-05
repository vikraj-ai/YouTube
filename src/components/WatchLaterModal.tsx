import React from 'react';
import { X } from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import VideoCard from './VideoCard';

interface WatchLaterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WatchLaterModal: React.FC<WatchLaterModalProps> = ({ isOpen, onClose }) => {
  const { watchLater } = useVideo();
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="bg-white rounded-lg max-w-6xl mx-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Watch Later</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-4">
            {watchLater.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No videos saved for later</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {watchLater.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchLaterModal;
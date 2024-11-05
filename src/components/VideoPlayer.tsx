import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  channel: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title, channel, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold truncate">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-gray-600">{channel}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
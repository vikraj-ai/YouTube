import React from 'react';
import { Video } from '../types';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';
import { useVideo } from '../context/VideoContext';

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = React.useState<Video | null>(null);
  const { addToHistory } = useVideo();

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    addToHistory(video);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => handleVideoSelect(video)}
          />
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayer
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          channel={selectedVideo.channel}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
};

export default VideoGrid;
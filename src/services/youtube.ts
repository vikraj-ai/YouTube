import axios from 'axios';
import { YOUTUBE_API_BASE_URL } from '../config/youtube';
import { Video } from '../types';

interface SearchResponse {
  videos: Video[];
  nextPageToken?: string;
  totalResults: number;
}

export const searchVideos = async (
  apiKey: string,
  query: string = '',
  pageToken: string = ''
): Promise<SearchResponse> => {
  if (!apiKey) {
    throw new Error('No API key provided. Please add a YouTube API key to continue.');
  }

  try {
    const response = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: query ? query : 'educational content',
        type: 'video',
        key: apiKey,
        pageToken: pageToken || undefined,
        videoCategoryId: '27', // Education category
      },
    });

    const videoIds = response.data.items.map((item: any) => item.id.videoId).join(',');
    const statsResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        part: 'statistics',
        id: videoIds,
        key: apiKey,
      },
    });

    const channelIds = response.data.items.map((item: any) => item.snippet.channelId).join(',');
    const channelsResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/channels`, {
      params: {
        part: 'snippet',
        id: channelIds,
        key: apiKey,
      },
    });

    const videos = response.data.items.map((item: any, index: number) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      views: formatViews(statsResponse.data.items[index]?.statistics.viewCount),
      timestamp: formatDate(item.snippet.publishedAt),
      avatar: channelsResponse.data.items.find(
        (channel: any) => channel.id === item.snippet.channelId
      )?.snippet.thumbnails.default.url,
    }));

    return {
      videos,
      nextPageToken: response.data.nextPageToken,
      totalResults: response.data.pageInfo.totalResults,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};

const formatViews = (viewCount: string) => {
  const views = parseInt(viewCount);
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  return 'Today';
};
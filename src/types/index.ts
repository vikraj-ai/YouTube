export interface Video {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
  channelId: string;
  views: string;
  timestamp: string;
  avatar: string;
}

export interface Category {
  icon: JSX.Element;
  name: string;
  query?: string;
}
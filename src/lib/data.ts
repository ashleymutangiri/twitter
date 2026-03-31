export type User = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
};

export type TweetType = {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  isLiked?: boolean;
  isRetweeted?: boolean;
  media?: string;
};

export const currentUser: User = {
  id: "user-1",
  name: "Ashley",
  handle: "ashleyfarai",
  avatar: "https://i.postimg.cc/VND0zkRb/377873730-122093319458050464-4074925056099338703-n.jpg",
  verified: true,
};

export const initialTweets: TweetType[] = [
  {
    id: "tweet-1",
    author: {
      id: "user-2",
      name: "Sipho",
      handle: "Sipho_SA",
      avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&h=150&fit=crop&crop=faces",
      verified: true,
    },
    content: "Yoh guys, it still baffles me how Elon Musk was born right here in Mzansi, but nobody even recognizes him as the richest man in South Africa. Make it make sense! 🇿🇦🤔",
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    likes: 14200,
    retweets: 3200,
    replies: 892,
    views: 1500000,
  },
  {
    id: "tweet-2",
    author: {
      id: "user-3",
      name: "Frontend Daily",
      handle: "frontend_daily",
      avatar: "https://i.pravatar.cc/150?u=frontend",
    },
    content: "CSS tip of the day: Use grid for complex layouts, flexbox for 1D layouts. Don't overcomplicate things! 🎨",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 856,
    retweets: 124,
    replies: 32,
    views: 45000,
  },
  {
    id: "tweet-3",
    author: {
      id: "user-4",
      name: "Tech Memes",
      handle: "tech_memes",
      avatar: "https://i.pravatar.cc/150?u=memes",
    },
    content: "Me: I'll just fix this one small bug before bed.\n\n*3 AM later*\n\nMe: Why is the entire database deleted?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    likes: 45000,
    retweets: 12000,
    replies: 1500,
    views: 3200000,
    media: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80",
  },
  {
    id: "tweet-4",
    author: {
      id: "user-5",
      name: "Design Systems",
      handle: "design_systems",
      avatar: "https://i.pravatar.cc/150?u=design",
      verified: true,
    },
    content: "A good design system is like a good joke. If you have to explain it, it's not that good.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    likes: 3400,
    retweets: 560,
    replies: 89,
    views: 120000,
  }
];

export const trendingTopics = [
  { category: "Technology · Trending", title: "React 19", posts: "125K" },
  { category: "Sports · Trending", title: "Champions League", posts: "85.4K" },
  { category: "Trending in South Africa", title: "Madlanga Commission", posts: "45.2K" },
  { category: "Entertainment · Trending", title: "Dune Part 3", posts: "32.1K" },
  { category: "Business · Trending", title: "Stock Market", posts: "12.5K" },
];

export const whoToFollow = [
  { name: "Vercel", handle: "vercel", avatar: "https://i.pravatar.cc/150?u=vercel", verified: true },
  { name: "React", handle: "reactjs", avatar: "https://i.pravatar.cc/150?u=react", verified: true },
  { name: "Tailwind CSS", handle: "tailwindcss", avatar: "https://i.pravatar.cc/150?u=tailwind", verified: true },
];

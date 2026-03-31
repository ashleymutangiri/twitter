import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Explore from "./components/Explore";
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Bookmarks from "./components/Bookmarks";
import RightSidebar from "./components/RightSidebar";
import BottomNav from "./components/BottomNav";
import MobileComposer from "./components/MobileComposer";
import ReplyModal from "./components/ReplyModal";
import { initialTweets, TweetType, currentUser } from "./lib/data";

export default function App() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<TweetType | null>(null);
  const [tweets, setTweets] = useState<TweetType[]>(initialTweets);

  const handlePost = (content: string, image?: string) => {
    const newTweet: TweetType = {
      id: `tweet-${Date.now()}`,
      author: currentUser,
      content,
      media: image,
      createdAt: new Date(),
      likes: 0,
      retweets: 0,
      replies: 0,
      views: 0,
    };
    setTweets([newTweet, ...tweets]);
  };

  const handleReply = (content: string, image?: string) => {
    if (!replyingTo) return;
    const newTweet: TweetType = {
      id: `tweet-${Date.now()}`,
      author: currentUser,
      content,
      media: image,
      createdAt: new Date(),
      likes: 0,
      retweets: 0,
      replies: 0,
      views: 0,
    };
    // Increment replies count on the original tweet
    setTweets(prev => prev.map(t => 
      t.id === replyingTo.id ? { ...t, replies: t.replies + 1 } : t
    ));
    setTweets(prev => [newTweet, ...prev]);
  };

  const handleShowMore = () => {
    const demoTweets = Array.from({ length: 35 }).map((_, i) => ({
      id: `demo-tweet-${Date.now()}-${i}`,
      author: {
        id: `demo-user-${i}`,
        name: `Demo User ${i}`,
        handle: `demo_user_${i}`,
        avatar: `https://i.pravatar.cc/150?u=demo${i}`,
      },
      content: `This is demo tweet #${i + 1} generated from clicking "Show 35 posts". It's a great day to build a Twitter clone! 🚀`,
      createdAt: new Date(Date.now() - 1000 * 60 * i),
      likes: Math.floor(Math.random() * 1000),
      retweets: Math.floor(Math.random() * 100),
      replies: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 10000),
    }));
    setTweets(prev => [...demoTweets, ...prev]);
  };

  const handleDeleteTweet = (id: string) => {
    setTweets(prev => prev.filter(tweet => tweet.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="flex justify-center min-h-screen bg-twitter-bg text-twitter-text pb-[53px] sm:pb-0">
        <div className="flex w-full max-w-[1265px]">
          <div className="hidden sm:flex justify-end w-[68px] sm:w-[88px] xl:w-[275px]">
            <Sidebar onOpenComposer={() => setIsComposerOpen(true)} />
          </div>
          <div className="flex flex-1 justify-between max-w-[990px]">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={
                <Feed 
                  tweets={tweets} 
                  onPost={handlePost} 
                  onDeleteTweet={handleDeleteTweet} 
                  onOpenComposer={() => setIsComposerOpen(true)} 
                  onShowMore={handleShowMore}
                  onReply={(tweet) => setReplyingTo(tweet)}
                />
              } />
              <Route path="/explore" element={<Explore />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile tweets={tweets} onReply={(tweet) => setReplyingTo(tweet)} onDeleteTweet={handleDeleteTweet} />} />
              <Route path="/bookmarks" element={<Bookmarks tweets={tweets} onReply={(tweet) => setReplyingTo(tweet)} onDeleteTweet={handleDeleteTweet} />} />
            </Routes>
            <RightSidebar />
          </div>
        </div>
        <BottomNav />
        {/* Global composer modal */}
        <MobileComposer 
          isOpen={isComposerOpen} 
          onClose={() => setIsComposerOpen(false)} 
          onPost={(content, image) => {
            handlePost(content, image);
            setIsComposerOpen(false);
          }} 
        />
        <ReplyModal
          isOpen={!!replyingTo}
          onClose={() => setReplyingTo(null)}
          onReply={(content, image) => {
            handleReply(content, image);
            setReplyingTo(null);
          }}
          replyingTo={replyingTo}
        />
      </div>
    </BrowserRouter>
  );
}

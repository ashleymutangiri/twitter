import { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { currentUser, TweetType } from "../lib/data";
import Tweet from "./Tweet";

export default function Profile({ 
  tweets, 
  onReply, 
  onDeleteTweet 
}: { 
  tweets: TweetType[]; 
  onReply?: (tweet: TweetType) => void; 
  onDeleteTweet?: (id: string) => void; 
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "highlights" | "articles" | "media" | "likes">("posts");

  const userTweets = tweets.filter(t => t.author.handle === currentUser.handle);

  return (
    <main className="flex-grow w-full sm:max-w-[600px] border-x border-twitter-border min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-twitter-bg/80 backdrop-blur-md border-b border-twitter-border flex items-center gap-6 px-4 py-1">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-twitter-hover transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-bold text-xl flex items-center gap-1">
            {currentUser.name}
            {currentUser.verified && (
              <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-5 h-5 fill-[#F9C828] flex-shrink-0">
                <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.84 3.42-.06.31-.09.63-.09.95 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25C9.184 22.585 10.49 23.5 12 23.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.32-.03-.64-.09-.95 1.1-.674 1.84-1.96 1.84-3.42zM10.54 17.55l-3.26-3.26 1.41-1.42 1.85 1.86 6.01-6.02 1.41 1.41-7.42 7.43z"></path></g>
              </svg>
            )}
          </h2>
          <p className="text-twitter-text-muted text-[13px]">{userTweets.length} posts</p>
        </div>
      </div>

      {/* Banner */}
      <div className="h-32 sm:h-48 bg-twitter-hover relative">
        <img 
          src="https://picsum.photos/seed/banner/600/200" 
          alt="Banner" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 relative">
        <div className="flex justify-between items-start">
          <div className="relative -mt-12 sm:-mt-16 mb-3">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-twitter-bg bg-twitter-hover overflow-hidden">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button className="mt-3 px-4 py-1.5 font-bold border border-twitter-border rounded-full hover:bg-twitter-hover transition-colors">
            Edit profile
          </button>
        </div>

        <div>
          <h1 className="font-bold text-xl flex items-center gap-1">
            {currentUser.name}
            {currentUser.verified && (
              <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-5 h-5 fill-[#F9C828] flex-shrink-0">
                <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.84 3.42-.06.31-.09.63-.09.95 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25C9.184 22.585 10.49 23.5 12 23.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.32-.03-.64-.09-.95 1.1-.674 1.84-1.96 1.84-3.42zM10.54 17.55l-3.26-3.26 1.41-1.42 1.85 1.86 6.01-6.02 1.41 1.41-7.42 7.43z"></path></g>
              </svg>
            )}
          </h1>
          <p className="text-twitter-text-muted text-[15px]">@{currentUser.handle}</p>
        </div>

        <div className="mt-3 text-[15px]">
          <p>Building the future of social media. 🚀</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-twitter-text-muted text-[15px]">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Harare, Zimbabwe</span>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon className="w-4 h-4" />
            <a href="#" className="text-twitter-blue hover:underline">example.com</a>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Joined March 2026</span>
          </div>
        </div>

        <div className="flex gap-4 mt-3 text-[15px]">
          <div className="hover:underline cursor-pointer">
            <span className="font-bold text-twitter-text">1,234</span> <span className="text-twitter-text-muted">Following</span>
          </div>
          <div className="hover:underline cursor-pointer">
            <span className="font-bold text-twitter-text">5,678</span> <span className="text-twitter-text-muted">Followers</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full overflow-x-auto hide-scrollbar border-b border-twitter-border">
        {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map((tab) => {
          const tabKey = tab.toLowerCase() as any;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tabKey)}
              className="flex-1 min-w-fit px-4 hover:bg-twitter-hover transition-colors relative flex justify-center pt-4 pb-3"
            >
              <span className={`font-bold text-[15px] whitespace-nowrap ${activeTab === tabKey ? "text-twitter-text" : "text-twitter-text-muted"}`}>
                {tab}
              </span>
              {activeTab === tabKey && (
                <div className="absolute bottom-0 h-1 w-14 bg-twitter-blue rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tweets */}
      <div className="pb-20 sm:pb-0">
        {activeTab === "posts" && userTweets.length > 0 ? (
          userTweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} onReply={onReply} onDelete={onDeleteTweet} />
          ))
        ) : (
          <div className="p-8 text-center text-twitter-text-muted">
            <p className="text-xl font-bold text-twitter-text mb-2">No {activeTab}</p>
          </div>
        )}
      </div>
    </main>
  );
}

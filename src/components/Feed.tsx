import { useState } from "react";
import Composer from "./Composer";
import Tweet from "./Tweet";
import { TweetType, currentUser } from "../lib/data";

export default function Feed({ 
  tweets, 
  onPost, 
  onDeleteTweet,
  onOpenComposer,
  onShowMore,
  onReply
}: { 
  tweets: TweetType[];
  onPost: (content: string, image?: string) => void;
  onDeleteTweet: (id: string) => void;
  onOpenComposer: () => void;
  onShowMore?: () => void;
  onReply?: (tweet: TweetType) => void;
}) {
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you");

  return (
    <main className="flex-grow w-full sm:max-w-[600px] border-x border-twitter-border min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-twitter-bg/80 backdrop-blur-md border-b border-twitter-border flex flex-col">
        {/* Mobile Top Bar */}
        <div className="flex sm:hidden items-center justify-between px-4 py-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
            <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
          </svg>
          <div className="w-8 h-8" /> {/* Spacer for centering */}
        </div>

        <div className="flex w-full">
          <button
            onClick={() => setActiveTab("for-you")}
            className="flex-1 hover:bg-twitter-hover transition-colors relative flex justify-center pt-4 pb-3"
          >
            <span className={`font-bold text-[15px] ${activeTab === "for-you" ? "text-twitter-text" : "text-twitter-text-muted"}`}>
              For you
            </span>
            {activeTab === "for-you" && (
              <div className="absolute bottom-0 h-1 w-14 bg-twitter-blue rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className="flex-1 hover:bg-twitter-hover transition-colors relative flex justify-center pt-4 pb-3"
          >
            <span className={`font-bold text-[15px] ${activeTab === "following" ? "text-twitter-text" : "text-twitter-text-muted"}`}>
              Following
            </span>
            {activeTab === "following" && (
              <div className="absolute bottom-0 h-1 w-20 bg-twitter-blue rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Composer */}
      <div className="hidden sm:block">
        <Composer onPost={onPost} />
      </div>

      {/* Show New Tweets (Mock) */}
      <div 
        onClick={() => {
          if (onShowMore) {
            onShowMore();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className="border-b border-twitter-border py-3 text-center text-twitter-blue text-[15px] hover:bg-twitter-hover transition-colors cursor-pointer"
      >
        Show 35 posts
      </div>

      {/* Tweets */}
      <div className="pb-20 sm:pb-0">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} onDelete={onDeleteTweet} onReply={onReply} />
        ))}
      </div>

      {/* Mobile FAB */}
      <button 
        onClick={onOpenComposer}
        className="sm:hidden fixed bottom-20 right-4 bg-twitter-blue text-white p-4 rounded-full shadow-lg hover:bg-twitter-blue-hover transition-colors z-50"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
          <g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g>
        </svg>
      </button>
    </main>
  );
}

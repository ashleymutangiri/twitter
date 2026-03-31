import { Settings, MoreHorizontal } from "lucide-react";
import { currentUser, TweetType } from "../lib/data";
import Tweet from "./Tweet";

export default function Bookmarks({ 
  tweets, 
  onReply, 
  onDeleteTweet 
}: { 
  tweets: TweetType[]; 
  onReply?: (tweet: TweetType) => void; 
  onDeleteTweet?: (id: string) => void; 
}) {
  // Mock bookmarks (just take the first two tweets)
  const bookmarkedTweets = tweets.slice(0, 2);

  return (
    <main className="flex-grow w-full sm:max-w-[600px] border-x border-twitter-border min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-twitter-bg/80 backdrop-blur-md border-b border-twitter-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="font-bold text-xl">Bookmarks</h2>
            <p className="text-twitter-text-muted text-[13px]">{currentUser.handle}</p>
          </div>
          <button className="p-2 rounded-full hover:bg-twitter-hover transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tweets */}
      <div className="pb-20 sm:pb-0">
        {bookmarkedTweets.length > 0 ? (
          bookmarkedTweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} onReply={onReply} onDelete={onDeleteTweet} />
          ))
        ) : (
          <div className="p-8 text-center text-twitter-text-muted">
            <p className="text-xl font-bold text-twitter-text mb-2">Save Tweets for later</p>
            <p>Don't let the good ones fly away! Bookmark Tweets to easily find them again in the future.</p>
          </div>
        )}
      </div>
    </main>
  );
}

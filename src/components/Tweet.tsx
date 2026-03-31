import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { formatDistanceToNowStrict } from "date-fns";
import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal, Trash2, Pin } from "lucide-react";
import { Link } from "react-router-dom";
import { TweetType, currentUser } from "../lib/data";
import { cn } from "../lib/utils";

export default function Tweet({ tweet: initialTweet, onDelete, onReply }: { tweet: TweetType, onDelete?: (id: string) => void, onReply?: (tweet: TweetType) => void }) {
  const [tweet, setTweet] = useState(initialTweet);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTweet(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTweet(prev => ({
      ...prev,
      isRetweeted: !prev.isRetweeted,
      retweets: prev.isRetweeted ? prev.retweets - 1 : prev.retweets + 1
    }));
  };

  return (
    <article className="px-4 pt-3 pb-2 border-b border-twitter-border hover:bg-twitter-hover transition-colors cursor-pointer flex gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0 pt-1">
        <Link to="/profile" onClick={(e) => e.stopPropagation()}>
          <img
            src={tweet.author.avatar}
            alt={tweet.author.name}
            className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[15px] truncate">
            <Link to="/profile" onClick={(e) => e.stopPropagation()} className="font-bold hover:underline truncate">{tweet.author.name}</Link>
            {tweet.author.verified && (
              <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-4 h-4 fill-[#F9C828] flex-shrink-0">
                <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.84 3.42-.06.31-.09.63-.09.95 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25C9.184 22.585 10.49 23.5 12 23.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.32-.03-.64-.09-.95 1.1-.674 1.84-1.96 1.84-3.42zM10.54 17.55l-3.26-3.26 1.41-1.42 1.85 1.86 6.01-6.02 1.41 1.41-7.42 7.43z"></path></g>
              </svg>
            )}
            <Link to="/profile" onClick={(e) => e.stopPropagation()} className="text-twitter-text-muted truncate hover:underline">@{tweet.author.handle}</Link>
            <span className="text-twitter-text-muted px-1">·</span>
            <span className="text-twitter-text-muted hover:underline flex-shrink-0">
              {formatDistanceToNowStrict(tweet.createdAt)}
            </span>
          </div>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-twitter-text-muted hover:text-twitter-blue hover:bg-twitter-blue/10 p-2 rounded-full transition-colors -mr-2"
            >
              <MoreHorizontal className="w-[18px] h-[18px]" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-twitter-bg border border-twitter-border rounded-xl shadow-lg z-50 py-1">
                {tweet.author.handle === currentUser.handle ? (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(false);
                        if (onDelete) onDelete(tweet.id);
                      }}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-twitter-hover transition-colors flex items-center gap-3 font-bold text-[15px]"
                    >
                      <Trash2 className="w-[18px] h-[18px]" />
                      Delete
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-twitter-text hover:bg-twitter-hover transition-colors flex items-center gap-3 font-bold text-[15px]"
                    >
                      <Pin className="w-[18px] h-[18px]" />
                      Pin to your profile
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-twitter-text hover:bg-twitter-hover transition-colors flex items-center gap-3 font-bold text-[15px]"
                  >
                    Not interested in this post
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="text-[15px] leading-normal whitespace-pre-wrap mt-0.5">
          {tweet.content}
        </div>

        {/* Media */}
        {tweet.media && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-twitter-border">
            <img src={tweet.media} alt="Tweet media" className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 text-twitter-text-muted max-w-[425px]">
          <ActionIcon 
            icon={MessageCircle} 
            count={formatCount(tweet.replies)} 
            hoverColor="hover:text-twitter-blue" 
            hoverBg="group-hover:bg-twitter-blue/10" 
            onClick={(e) => {
              e.stopPropagation();
              if (onReply) onReply(tweet);
            }}
          />
          <ActionIcon icon={Repeat2} count={formatCount(tweet.retweets)} hoverColor="hover:text-green-500" hoverBg="group-hover:bg-green-500/10" active={tweet.isRetweeted} activeColor="text-green-500" onClick={handleRetweet} />
          <ActionIcon icon={Heart} count={formatCount(tweet.likes)} hoverColor="hover:text-pink-600" hoverBg="group-hover:bg-pink-600/10" active={tweet.isLiked} activeColor="text-pink-600" onClick={handleLike} />
          <ActionIcon icon={BarChart2} count={formatCount(tweet.views)} hoverColor="hover:text-twitter-blue" hoverBg="group-hover:bg-twitter-blue/10" />
          
          <div className="flex items-center gap-1">
            <button className="group flex items-center gap-1 p-2 -m-2 transition-colors hover:text-twitter-blue" onClick={(e) => e.stopPropagation()}>
              <div className="p-2 rounded-full group-hover:bg-twitter-blue/10 transition-colors">
                <BookmarkIcon className="w-[18px] h-[18px]" />
              </div>
            </button>
            <button className="group flex items-center gap-1 p-2 -m-2 transition-colors hover:text-twitter-blue" onClick={(e) => e.stopPropagation()}>
              <div className="p-2 rounded-full group-hover:bg-twitter-blue/10 transition-colors">
                <Share className="w-[18px] h-[18px]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionIcon({ 
  icon: Icon, 
  count, 
  hoverColor, 
  hoverBg,
  active,
  activeColor,
  onClick
}: { 
  icon: any, 
  count: string, 
  hoverColor: string, 
  hoverBg: string,
  active?: boolean,
  activeColor?: string,
  onClick?: (e: React.MouseEvent) => void
}) {
  return (
    <button 
      className={cn("group flex items-center gap-1 transition-colors", hoverColor, active && activeColor)}
      onClick={onClick || ((e) => e.stopPropagation())}
    >
      <div className={cn("p-2 rounded-full transition-colors -m-2", hoverBg)}>
        <motion.div
          initial={false}
          animate={{ scale: active ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className={cn("w-[18px] h-[18px]", active && "fill-current")} />
        </motion.div>
      </div>
      <span className="text-[13px] px-1">{count}</span>
    </button>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("fill-current", className)}>
      <g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g>
    </svg>
  );
}

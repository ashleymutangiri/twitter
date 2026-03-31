import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Composer from "./Composer";
import { TweetType } from "../lib/data";
import { formatDistanceToNowStrict } from "date-fns";

export default function ReplyModal({ 
  isOpen, 
  onClose,
  onReply,
  replyingTo
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onReply: (content: string, image?: string) => void;
  replyingTo: TweetType | null;
}) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !replyingTo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center sm:bg-black/40 sm:backdrop-blur-sm sm:p-4">
      <div className="w-full h-full sm:h-auto sm:max-h-[80vh] sm:w-[600px] sm:rounded-2xl bg-twitter-bg flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-twitter-border sm:border-none">
          <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-twitter-hover transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex gap-4">
            <button className="text-twitter-blue font-bold text-[15px]">Drafts</button>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto px-4 pt-2">
          {/* Original Tweet Context */}
          <div className="flex gap-3 relative">
            <div className="flex flex-col items-center">
              <img
                src={replyingTo.author.avatar}
                alt={replyingTo.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-[2px] h-full bg-twitter-border mt-2" />
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-1 text-[15px]">
                <span className="font-bold">{replyingTo.author.name}</span>
                <span className="text-twitter-text-muted">@{replyingTo.author.handle}</span>
                <span className="text-twitter-text-muted px-1">·</span>
                <span className="text-twitter-text-muted">
                  {formatDistanceToNowStrict(replyingTo.createdAt)}
                </span>
              </div>
              <p className="text-[15px] mt-1">{replyingTo.content}</p>
              <p className="text-twitter-text-muted text-[15px] mt-4">
                Replying to <span className="text-twitter-blue">@{replyingTo.author.handle}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-twitter-border sm:border-none">
          <Composer autoFocus buttonText="Reply" onPost={(content, image) => {
            onReply(content, image);
            onClose();
          }} />
        </div>
      </div>
    </div>
  );
}

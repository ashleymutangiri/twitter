import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Composer from "./Composer";

export default function MobileComposer({ 
  isOpen, 
  onClose,
  onPost
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onPost: (content: string, image?: string) => void;
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

  if (!isOpen) return null;

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
        <div className="flex-grow overflow-y-auto">
          <Composer autoFocus onPost={(content, image) => {
            onPost(content, image);
            onClose();
          }} />
        </div>
      </div>
    </div>
  );
}

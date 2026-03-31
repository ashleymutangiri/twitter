import React, { useState, useRef, useEffect } from "react";
import { Image, FileVideo, BarChart2, Smile, Calendar, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser } from "../lib/data";
import { cn } from "../lib/utils";

export default function Composer({ onPost, autoFocus, buttonText = "Post" }: { onPost: (content: string, image?: string) => void, autoFocus?: boolean, buttonText?: string }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = () => {
    if ((!content.trim() && !image) || content.length > 280) return;
    onPost(content, image || undefined);
    setContent("");
    setImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className="border-b border-twitter-border px-4 pt-3 pb-2 flex gap-4">
      <div className="flex-shrink-0 pt-1">
        <Link to="/profile">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>
      <div className="flex-grow flex flex-col pt-1">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What is happening?!"
          className="w-full bg-transparent text-xl outline-none resize-none min-h-[52px] placeholder-twitter-text-muted py-2"
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />

        {image && (
          <div className="relative mt-2 mb-4 rounded-2xl overflow-hidden border border-twitter-border">
            <button 
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black/60 transition-colors rounded-full text-white z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={image} alt="Upload preview" className="w-full h-auto max-h-[400px] object-cover" />
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-twitter-border/50">
          <div className="flex items-center gap-0.5 -ml-2">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full hover:bg-twitter-blue/10 transition-colors group text-twitter-blue"
            >
              <Image className="w-5 h-5" />
            </button>
            <IconButton icon={FileVideo} />
            <IconButton icon={BarChart2} className="hidden sm:flex" />
            <IconButton icon={Smile} />
            <IconButton icon={Calendar} className="hidden sm:flex" />
            <IconButton icon={MapPin} disabled />
          </div>
          
          <div className="flex items-center gap-3">
            {(content.length > 0 || image) && (
              <>
                <div className="flex items-center justify-center relative w-6 h-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 24 24">
                    <circle
                      className="text-twitter-border stroke-current"
                      strokeWidth="2"
                      cx="12"
                      cy="12"
                      r="10"
                      fill="transparent"
                    />
                    <circle
                      className={cn(
                        "stroke-current transition-all duration-200",
                        content.length > 280 ? "text-red-500" : content.length > 260 ? "text-yellow-500" : "text-twitter-blue"
                      )}
                      strokeWidth="2"
                      strokeDasharray={2 * Math.PI * 10}
                      strokeDashoffset={2 * Math.PI * 10 * (1 - Math.min(content.length / 280, 1))}
                      strokeLinecap="round"
                      cx="12"
                      cy="12"
                      r="10"
                      fill="transparent"
                    />
                  </svg>
                </div>
                <div className="w-[1px] h-6 bg-twitter-border" />
              </>
            )}
            <button 
              onClick={handleSubmit}
              disabled={(!content.trim() && !image) || content.length > 280}
              className="bg-twitter-blue hover:bg-twitter-blue-hover text-white font-bold py-1.5 px-4 rounded-full transition-colors text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconButton({ icon: Icon, className, disabled }: { icon: any, className?: string, disabled?: boolean }) {
  return (
    <button 
      className={`p-2 rounded-full hover:bg-twitter-blue/10 transition-colors group ${className} ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}`}
      disabled={disabled}
    >
      <Icon className="w-5 h-5 text-twitter-blue" />
    </button>
  );
}

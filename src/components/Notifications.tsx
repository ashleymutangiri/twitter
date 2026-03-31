import { useState } from "react";
import { Settings, User, Heart, Repeat2 } from "lucide-react";
import { currentUser } from "../lib/data";

const mockNotifications = [
  {
    id: 1,
    type: "like",
    user: { name: "Jane Doe", avatar: "https://picsum.photos/seed/jane/48/48" },
    text: "liked your post",
    content: "Just setting up my twttr clone!",
    time: "2h",
  },
  {
    id: 2,
    type: "retweet",
    user: { name: "John Smith", avatar: "https://picsum.photos/seed/john/48/48" },
    text: "reposted your post",
    content: "This is a really cool project.",
    time: "5h",
  },
  {
    id: 3,
    type: "follow",
    user: { name: "Alice", avatar: "https://picsum.photos/seed/alice/48/48" },
    text: "followed you",
    content: "",
    time: "1d",
  },
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<"all" | "verified" | "mentions">("all");

  return (
    <main className="flex-grow w-full sm:max-w-[600px] border-x border-twitter-border min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-twitter-bg/80 backdrop-blur-md border-b border-twitter-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover cursor-pointer sm:hidden"
            />
            <h2 className="font-bold text-xl">Notifications</h2>
          </div>
          <button className="p-2 rounded-full hover:bg-twitter-hover transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="flex w-full">
          <button
            onClick={() => setActiveTab("all")}
            className="flex-1 hover:bg-twitter-hover transition-colors relative flex justify-center pt-4 pb-3"
          >
            <span className={`font-bold text-[15px] ${activeTab === "all" ? "text-twitter-text" : "text-twitter-text-muted"}`}>
              All
            </span>
            {activeTab === "all" && (
              <div className="absolute bottom-0 h-1 w-14 bg-twitter-blue rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("verified")}
            className="flex-1 hover:bg-twitter-hover transition-colors relative flex justify-center pt-4 pb-3"
          >
            <span className={`font-bold text-[15px] ${activeTab === "verified" ? "text-twitter-text" : "text-twitter-text-muted"}`}>
              Verified
            </span>
            {activeTab === "verified" && (
              <div className="absolute bottom-0 h-1 w-16 bg-twitter-blue rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("mentions")}
            className="flex-1 hover:bg-twitter-hover transition-colors relative flex justify-center pt-4 pb-3"
          >
            <span className={`font-bold text-[15px] ${activeTab === "mentions" ? "text-twitter-text" : "text-twitter-text-muted"}`}>
              Mentions
            </span>
            {activeTab === "mentions" && (
              <div className="absolute bottom-0 h-1 w-20 bg-twitter-blue rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="pb-20 sm:pb-0">
        {mockNotifications.map((notif) => (
          <div key={notif.id} className="flex gap-3 px-4 py-3 border-b border-twitter-border hover:bg-twitter-hover transition-colors cursor-pointer">
            <div className="flex-shrink-0 w-12 flex justify-end">
              {notif.type === "like" && <Heart className="w-7 h-7 text-twitter-red fill-current" />}
              {notif.type === "retweet" && <Repeat2 className="w-7 h-7 text-twitter-green" />}
              {notif.type === "follow" && <User className="w-7 h-7 text-twitter-blue fill-current" />}
            </div>
            <div className="flex-grow">
              <img src={notif.user.avatar} alt={notif.user.name} className="w-8 h-8 rounded-full object-cover mb-2" />
              <p className="text-[15px]">
                <span className="font-bold">{notif.user.name}</span> {notif.text}
              </p>
              {notif.content && (
                <p className="text-twitter-text-muted text-[15px] mt-1">{notif.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

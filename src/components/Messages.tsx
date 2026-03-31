import { Settings, MailPlus, Search } from "lucide-react";
import { currentUser } from "../lib/data";

const mockMessages = [
  {
    id: 1,
    user: { name: "Jane Doe", handle: "@janedoe", avatar: "https://picsum.photos/seed/jane/48/48" },
    text: "Hey! How is the clone going?",
    time: "2h",
    unread: true,
  },
  {
    id: 2,
    user: { name: "John Smith", handle: "@johnsmith", avatar: "https://picsum.photos/seed/john/48/48" },
    text: "Looks amazing so far.",
    time: "1d",
    unread: false,
  },
];

export default function Messages() {
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
            <h2 className="font-bold text-xl">Messages</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-twitter-hover transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-twitter-hover transition-colors">
              <MailPlus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-twitter-border">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-twitter-text-muted group-focus-within:text-twitter-blue transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search Direct Messages"
              className="w-full bg-twitter-hover text-twitter-text rounded-full py-2 pl-12 pr-4 focus:outline-none focus:bg-twitter-bg focus:ring-1 focus:ring-twitter-blue transition-all"
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="pb-20 sm:pb-0">
        {mockMessages.map((msg) => (
          <div key={msg.id} className="flex gap-3 px-4 py-4 hover:bg-twitter-hover transition-colors cursor-pointer">
            <img src={msg.user.avatar} alt={msg.user.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 truncate">
                  <span className="font-bold text-[15px] truncate">{msg.user.name}</span>
                  <span className="text-twitter-text-muted text-[15px] truncate">{msg.user.handle}</span>
                </div>
                <span className="text-twitter-text-muted text-[15px] whitespace-nowrap ml-2">{msg.time}</span>
              </div>
              <p className={`text-[15px] truncate ${msg.unread ? "font-bold text-twitter-text" : "text-twitter-text-muted"}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

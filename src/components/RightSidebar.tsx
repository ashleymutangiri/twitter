import { Search, MoreHorizontal } from "lucide-react";
import { trendingTopics, whoToFollow } from "../lib/data";

export default function RightSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[290px] xl:w-[350px] pl-8 py-2 h-screen sticky top-0 overflow-y-auto no-scrollbar">
      {/* Search */}
      <div className="sticky top-0 bg-twitter-bg pb-2 z-10 pt-1">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-twitter-text-muted group-focus-within:text-twitter-blue transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 bg-twitter-bg-tertiary border-transparent rounded-full text-twitter-text placeholder-twitter-text-muted focus:bg-twitter-bg focus:border-twitter-blue focus:ring-1 focus:ring-twitter-blue sm:text-[15px] transition-colors outline-none"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Subscribe to Premium */}
      <div className="bg-twitter-bg-secondary rounded-2xl p-4 mt-3 mb-4">
        <h2 className="font-extrabold text-xl mb-2">Subscribe to Premium</h2>
        <p className="text-[15px] leading-5 mb-3 font-medium">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <button className="bg-twitter-blue hover:bg-twitter-blue-hover text-white font-bold py-2 px-4 rounded-full transition-colors text-[15px]">
          Subscribe
        </button>
      </div>

      {/* Trends */}
      <div className="bg-twitter-bg-secondary rounded-2xl pt-3 pb-1 mb-4">
        <h2 className="font-extrabold text-xl px-4 mb-3">What's happening</h2>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="px-4 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer flex justify-between">
            <div className="flex flex-col">
              <span className="text-[13px] text-twitter-text-muted">{topic.category}</span>
              <span className="font-bold text-[15px] mt-0.5">{topic.title}</span>
              <span className="text-[13px] text-twitter-text-muted mt-0.5">{topic.posts} posts</span>
            </div>
            <MoreHorizontal className="w-5 h-5 text-twitter-text-muted hover:text-twitter-blue transition-colors rounded-full hover:bg-twitter-blue/10 p-1 box-content" />
          </div>
        ))}
        <div className="px-4 py-4 hover:bg-white/[0.03] transition-colors cursor-pointer rounded-b-2xl">
          <span className="text-twitter-blue text-[15px]">Show more</span>
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-twitter-bg-secondary rounded-2xl pt-3 pb-1 mb-4">
        <h2 className="font-extrabold text-xl px-4 mb-3">Who to follow</h2>
        {whoToFollow.map((user, index) => (
          <div key={index} className="px-4 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[15px] hover:underline truncate max-w-[100px] xl:max-w-[140px]">{user.name}</span>
                  {user.verified && (
                    <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-4 h-4 fill-twitter-blue">
                      <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.84 3.42-.06.31-.09.63-.09.95 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25C9.184 22.585 10.49 23.5 12 23.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.32-.03-.64-.09-.95 1.1-.674 1.84-1.96 1.84-3.42zM10.54 17.55l-3.26-3.26 1.41-1.42 1.85 1.86 6.01-6.02 1.41 1.41-7.42 7.43z"></path></g>
                    </svg>
                  )}
                </div>
                <span className="text-[15px] text-twitter-text-muted truncate max-w-[100px] xl:max-w-[140px]">@{user.handle}</span>
              </div>
            </div>
            <button className="bg-twitter-text hover:opacity-90 text-twitter-bg font-bold py-1.5 px-4 rounded-full transition-colors text-[14px]">
              Follow
            </button>
          </div>
        ))}
        <div className="px-4 py-4 hover:bg-white/[0.03] transition-colors cursor-pointer rounded-b-2xl">
          <span className="text-twitter-blue text-[15px]">Show more</span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-4 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-twitter-text-muted mb-20">
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Ads info</a>
        <a href="#" className="hover:underline flex items-center gap-1">More <MoreHorizontal className="w-3 h-3" /></a>
        <span>© 2026 X Corp.</span>
      </div>
    </aside>
  );
}

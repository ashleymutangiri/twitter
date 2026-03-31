import { Search, Settings } from "lucide-react";
import { trendingTopics } from "../lib/data";

export default function Explore() {
  return (
    <main className="flex-grow w-full sm:max-w-[600px] border-x border-twitter-border min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-twitter-bg/80 backdrop-blur-md border-b border-twitter-border">
        <div className="flex items-center gap-4 px-4 py-3">
          <div className="flex-grow relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-twitter-text-muted group-focus-within:text-twitter-blue transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-twitter-hover text-twitter-text rounded-full py-2 pl-12 pr-4 focus:outline-none focus:bg-twitter-bg focus:ring-1 focus:ring-twitter-blue transition-all"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-twitter-hover transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="flex w-full overflow-x-auto hide-scrollbar">
          {["For you", "Trending", "News", "Sports", "Entertainment"].map((tab, i) => (
            <button
              key={tab}
              className="flex-1 min-w-fit px-4 hover:bg-twitter-hover transition-colors relative flex justify-center pt-4 pb-3"
            >
              <span className={`font-bold text-[15px] whitespace-nowrap ${i === 0 ? "text-twitter-text" : "text-twitter-text-muted"}`}>
                {tab}
              </span>
              {i === 0 && (
                <div className="absolute bottom-0 h-1 w-14 bg-twitter-blue rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Image / Top Trend */}
      <div className="relative h-48 bg-twitter-hover cursor-pointer">
        <img 
          src="https://picsum.photos/seed/explore/600/300" 
          alt="Trending" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-sm font-medium">Space • LIVE</p>
          <h2 className="text-white text-2xl font-bold mt-1">Mars Rover sends new images</h2>
        </div>
      </div>

      {/* Trends List */}
      <div className="pb-20 sm:pb-0">
        <h3 className="font-bold text-xl px-4 py-3 border-b border-twitter-border">Trends for you</h3>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="px-4 py-3 hover:bg-twitter-hover transition-colors cursor-pointer flex justify-between items-start">
            <div>
              <p className="text-twitter-text-muted text-[13px]">{topic.category}</p>
              <p className="font-bold text-[15px] mt-0.5">{topic.title}</p>
              <p className="text-twitter-text-muted text-[13px] mt-0.5">{topic.posts} posts</p>
            </div>
            <button className="p-2 -mr-2 rounded-full hover:bg-twitter-blue/10 text-twitter-text-muted hover:text-twitter-blue transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                <g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

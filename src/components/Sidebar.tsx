import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Feather, Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import { currentUser } from "../lib/data";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Mail, label: "Messages", path: "/messages" },
  { icon: Bookmark, label: "Bookmarks", path: "/bookmarks" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function Sidebar({ onOpenComposer }: { onOpenComposer?: () => void }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--color-twitter-bg', '#000000');
      document.documentElement.style.setProperty('--color-twitter-text', '#e7e9ea');
      document.documentElement.style.setProperty('--color-twitter-border', '#2f3336');
      document.documentElement.style.setProperty('--color-twitter-hover', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--color-twitter-text-muted', '#71767b');
      document.documentElement.style.setProperty('--color-twitter-bg-secondary', '#16181c');
      document.documentElement.style.setProperty('--color-twitter-bg-tertiary', '#202327');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--color-twitter-bg', '#ffffff');
      document.documentElement.style.setProperty('--color-twitter-text', '#0f1419');
      document.documentElement.style.setProperty('--color-twitter-border', '#eff3f4');
      document.documentElement.style.setProperty('--color-twitter-hover', 'rgba(15, 20, 25, 0.1)');
      document.documentElement.style.setProperty('--color-twitter-text-muted', '#536471');
      document.documentElement.style.setProperty('--color-twitter-bg-secondary', '#f7f9f9');
      document.documentElement.style.setProperty('--color-twitter-bg-tertiary', '#eff3f4');
    }
  }, [isDark]);

  return (
    <header className="flex flex-col justify-between h-screen sticky top-0 w-[68px] xl:w-[275px] pt-2 pb-4 px-2 xl:px-4">
      <div className="flex flex-col items-center xl:items-start w-full">
        {/* Logo */}
        <div className="p-3 w-fit rounded-full hover:bg-twitter-hover transition-colors cursor-pointer mb-2">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7 fill-current">
            <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
          </svg>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col w-full gap-1 xl:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center justify-center xl:justify-start w-fit p-3 xl:px-4 xl:py-3 rounded-full hover:bg-twitter-hover transition-colors cursor-pointer group",
                isActive ? "font-bold" : "font-normal"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn("w-7 h-7", isActive ? "stroke-[2.5px]" : "stroke-2")}
                    fill={isActive ? "currentColor" : "none"}
                  />
                  <span
                    className={cn(
                      "hidden xl:block ml-5 text-xl",
                      isActive ? "font-bold" : "font-normal"
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
          
          {/* Theme Toggle */}
          <div
            onClick={() => setIsDark(!isDark)}
            className="flex items-center justify-center xl:justify-start w-fit p-3 xl:px-4 xl:py-3 rounded-full hover:bg-twitter-hover transition-colors cursor-pointer group"
          >
            {isDark ? (
              <Sun className="w-7 h-7 stroke-2" />
            ) : (
              <Moon className="w-7 h-7 stroke-2" />
            )}
            <span className="hidden xl:block ml-5 text-xl font-normal">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </div>
        </nav>

        {/* Post Button */}
        <button 
          onClick={onOpenComposer}
          className="mt-4 bg-twitter-blue hover:bg-twitter-blue-hover text-white font-bold rounded-full w-12 h-12 xl:w-[90%] xl:h-14 flex items-center justify-center transition-colors shadow-sm"
        >
          <Feather className="w-6 h-6 xl:hidden" />
          <span className="hidden xl:block text-[17px]">Post</span>
        </button>
      </div>

      {/* User Profile */}
      <Link to="/profile" className="flex items-center justify-center xl:justify-between p-3 rounded-full hover:bg-twitter-hover transition-colors cursor-pointer w-full mt-auto">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden xl:flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[15px] leading-5 truncate max-w-[120px]">{currentUser.name}</span>
              {currentUser.verified && (
                <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-4 h-4 fill-[#F9C828] flex-shrink-0">
                  <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.84 3.42-.06.31-.09.63-.09.95 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25C9.184 22.585 10.49 23.5 12 23.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.32-.03-.64-.09-.95 1.1-.674 1.84-1.96 1.84-3.42zM10.54 17.55l-3.26-3.26 1.41-1.42 1.85 1.86 6.01-6.02 1.41 1.41-7.42 7.43z"></path></g>
                </svg>
              )}
            </div>
            <span className="text-twitter-text-muted text-[15px] leading-5 truncate max-w-[140px]">@{currentUser.handle}</span>
          </div>
        </div>
        <MoreHorizontal className="hidden xl:block w-5 h-5" />
      </Link>
    </header>
  );
}

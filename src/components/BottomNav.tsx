import { NavLink } from "react-router-dom";
import { Home, Search, Bell, Mail } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Mail, label: "Messages", path: "/messages" },
];

export default function BottomNav() {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-twitter-bg border-t border-twitter-border flex justify-around items-center h-[53px] z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className="p-2 flex items-center justify-center transition-colors"
        >
          {({ isActive }) => (
            <item.icon
              className={cn("w-6 h-6", isActive ? "stroke-[2.5px] text-twitter-text" : "stroke-2 text-twitter-text-muted")}
              fill={isActive ? "currentColor" : "none"}
            />
          )}
        </NavLink>
      ))}
    </nav>
  );
}

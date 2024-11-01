import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const links = [
  { name: "Exchange", link: "/", image: "/images/explore.png" },
  { name: "Missions", link: "/missions", image: "/images/mine.png" },
  { name: "Friends", link: "/friends", image: "/images/navbar_friends.png" },
  { name: "Earn", link: "/earn", image: "/images/earn.png" },
  { name: "Airdrop", link: "/wallet", image: "/images/toncoin.png" },
];

export default function AppBar() {
  const { pathname } = useLocation();
  return (
    <div className="fixed left-0 z-10 w-full py-0 bottom-0">
      <div className="flex items-center w-full p-2 max-w-lg mx-auto bg-black/20" style={{ backgroundColor: '#1E0037' }}>
        {links.map((link, key) => (
          <Link
            key={key}
            to={link.link}
            className={cn(
              "relative flex items-center rounded-xl flex-col justify-center font-bold text-xs px-2.5 py-1.5 gap-1 select-none flex-1 text-white/30",
              pathname === link.link && " text-white"
            )}
          >
            {link.image && (
              <img
                src={link.image}
                alt={link.name}
                className={cn(
                  "w-7 h-7 object-contain filter grayscale",
                  pathname === link.link && "filter-none"
                )}
              />
            )}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

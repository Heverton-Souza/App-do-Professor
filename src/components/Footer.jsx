import { Link, useLocation } from "react-router-dom";
import { Home, Search , MessageSquareDot , CalendarDays, User } from "lucide-react";

export default function Footer() {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path ? "text-gray-500" : "text-gray-400";

  return (
    <footer className="fixed bottom-0 left-0 w-full h-[6vh] bg-white border-t shadow-md flex justify-around items-center z-20">
      <Link to="/" className={`flex flex-col items-center ${isActive("/")}`}>
        <Home size={24} />
      </Link>
      <Link to="/search" className={`flex flex-col items-center ${isActive("/search")}`}>
        <Search  size={24} />
      </Link>
      <Link to="/chat" className={`flex flex-col items-center ${isActive("/chat")}`}>
        <MessageSquareDot  size={24} />
      </Link>
      <Link to="/agenda" className={`flex flex-col items-center ${isActive("/agenda")}`}>
        <CalendarDays  size={24} />
      </Link>
      <Link to="/perfil" className={`flex flex-col items-center ${isActive("/perfil")}`}>
        <User   size={24} />
      </Link>
    </footer>
  );
}

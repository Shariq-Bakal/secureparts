import { useSelector } from "react-redux";
import { Bell, UserCircle, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      
      {/* Left side - Logo / Title */}
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
       {user.role==="customer"&&(<span>Customer Panel</span>)}
       {user.role==="admin"&&(<span>Admin Panel</span>)}
       {user.role ==="vendor"&&(<span>Vendor Panel</span>)}
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <a href="/" className="hover:text-gray-900 transition">Home</a>
        <a href="/about" className="hover:text-gray-900 transition">About</a>
        <a href="/contact" className="hover:text-gray-900 transition">Contact</a>
      </div>

      {/* Right side - User + Notifications */}
      <div className="flex items-center space-x-6">

        {/* Notification Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* User info */}
        <div className="flex items-center space-x-3">
          <UserCircle className="w-8 h-8 text-gray-600" />
          <div className="flex flex-col">
            
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <a href="/" className="block px-6 py-3 hover:bg-gray-50">Home</a>
          <a href="/about" className="block px-6 py-3 hover:bg-gray-50">About Us</a>
          <a href="/contact" className="block px-6 py-3 hover:bg-gray-50">contact us</a>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
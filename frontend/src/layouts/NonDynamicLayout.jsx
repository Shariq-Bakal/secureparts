import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

const NonDynamicLayout = ({ children }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if user is logged in (you can replace this with your actual auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = { name: "John Doe" }; // Replace with actual user data from your auth state

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Header / Navbar */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-yellow-300 hover:text-yellow-200 transition">
              QuickQuotz
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-white font-medium">
              <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
              <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
              <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
              
              {/* Auth Section */}
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 bg-yellow-500 text-blue-900 hover:bg-yellow-400 px-4 py-2 rounded-lg transition duration-200 font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-blue-500 flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-yellow-300 transition py-2"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-yellow-300 transition py-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-yellow-300 transition py-2"
              >
                Contact
              </Link>
              
              {/* Mobile Auth Section */}
              {isLoggedIn ? (
                <div className="flex flex-col gap-3 pt-2 border-t border-blue-500">
                  <div className="flex items-center gap-2 py-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-yellow-500 text-blue-900 hover:bg-yellow-400 px-4 py-2 rounded-lg transition font-semibold mt-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm md:text-base">
          <p>© {new Date().getFullYear()} QuickQuotz. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3 text-xs text-blue-300">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NonDynamicLayout;
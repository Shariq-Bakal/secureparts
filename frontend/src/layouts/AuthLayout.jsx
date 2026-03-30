import { Link, useLocation } from "react-router-dom";
import { Package, ArrowLeft, Shield, Lock, User, Building2 } from "lucide-react";
import { useState } from "react";

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const [role, setRole] = useState("customer");
  
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isForgotPassword = location.pathname === "/forgot-password";
  
  const getTitle = () => {
    if (isLogin) return "Welcome Back";
    if (isRegister) return "Create Account";
    if (isForgotPassword) return "Reset Password";
    return "Authentication";
  };
  
  const getSubtitle = () => {
    if (isLogin) return "Sign in to continue to QuickQuotz";
    if (isRegister) return "Join thousands of businesses finding spare parts";
    if (isForgotPassword) return "Enter your email to receive reset instructions";
    return "Please authenticate to continue";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background - using Tailwind animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold transition-transform hover:scale-105">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Quick<span className="text-yellow-500 bg-none">Quotz</span>
            </span>
          </Link>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-6">{getTitle()}</h2>
          <p className="text-gray-500 mt-2 text-sm">{getSubtitle()}</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-3">
          {isLogin && (
            <>
              <Link 
                to="/forgot-password" 
                className="block text-sm text-blue-600 hover:text-blue-700 transition"
              >
                Forgot password?
              </Link>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition">
                  Create account
                </Link>
              </p>
            </>
          )}
          
          {isRegister && (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition">
                Sign in
              </Link>
            </p>
          )}

          {isForgotPassword && (
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition">
                Sign in
              </Link>
            </p>
          )}

          <Link 
            to="/" 
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
            <Shield className="w-3 h-3" />
            <span>Secure & Encrypted</span>
            <Lock className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>

      {/* Add custom CSS for animation delays using Tailwind */}
      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        .animate-pulse {
          animation: pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;
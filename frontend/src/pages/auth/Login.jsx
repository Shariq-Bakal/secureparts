import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useDispatch, useSelector } from "react-redux"; // Add useSelector
import { login } from "../../features/auth/authSlice.js";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user from Redux state
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const result = await dispatch(
        login({ email, password })
      ).unwrap();
      
      console.log("Login successful:", result);
      
      // Check user role and navigate accordingly
      const userRole = result.user?.role || user?.role;
      
      if (userRole === "admin") {
        navigate("/dashboard/admin");
      } else if (userRole === "vendor") {
        navigate("/dashboard/vendor");
      } else if (userRole === "customer") {
        navigate("/dashboard/customer"); // Customer dashboard
      } else {
        navigate("/dashboard"); // Default dashboard
      }
      
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 404) {
        setError("Server not found. Please check if backend is running.");
      } else if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login to Your Account</h2>
          <p className="text-gray-500 text-sm">Enter your credentials to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-700 transition"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          
          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition">
              Create an account
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <span>Secure Login</span>
            <span>•</span>
            <span>Encrypted Connection</span>
            <span>•</span>
            <span>Privacy Protected</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
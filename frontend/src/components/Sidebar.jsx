import { NavLink, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { FiHome, FiFileText, FiUser, FiLogOut } from "react-icons/fi";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
// 2. Removed useEffect entirely

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 3. Initialize navigate

  const linkStyle =
    "flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-200";
  const activeStyle = "bg-blue-200";

  // 4. Made this an async function
  const signOut = async () => {
    try {
      // 5. Wait for the logout action to finish successfully
      await dispatch(logout()).unwrap();
      
      // 6. Navigate to login AND replace the history stack
      navigate("/login", { replace: true });
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col justify-between p-6 h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-10">RFQ System</h1>

        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ""}`}
          >
            <FiHome size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/rfqs"
            className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ""}`}
          >
            <FiFileText size={18} />
            RFQs
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : ""}`}
          >
            <FiUser size={18} />
            Profile
          </NavLink>
        </nav>
      </div>

      <button 
        onClick={signOut} 
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition-colors"
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
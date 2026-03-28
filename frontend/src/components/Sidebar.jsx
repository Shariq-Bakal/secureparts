import { NavLink } from "react-router-dom"
import { FiHome, FiFileText, FiDollarSign, FiUser, FiLogOut } from "react-icons/fi"

const Sidebar = () => {

  const linkStyle =
    "flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-200"

  const activeStyle = "bg-blue-200"

  return (

    <div className="w-64 bg-blue-600 text-white flex flex-col justify-between p-6">

      {/* Logo / Title */}
      <div>

        <h1 className="text-2xl font-bold mb-10">
          RFQ System
        </h1>

        {/* Navigation */}
        <nav className="space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            <FiHome size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/rfqs"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            <FiFileText size={18} />
            RFQs
          </NavLink>


          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            <FiUser size={18} />
            Profile
          </NavLink>

        </nav>

      </div>

      {/* Logout Button */}
      <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition-colors">

        <FiLogOut size={18} />
        Logout

      </button>

    </div>

  )

}

export default Sidebar
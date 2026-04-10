import DashboardLayout from "../../layouts/DashboardLayout"
import UsersTable from "../../components/AdminTables/UserTable"
import VendorTable from "../../components/AdminTables/VendorTable"
import RFQTable from "../../components/AdminTables/RFQTable"
import { useNavigate, useParams, useLocation } from "react-router-dom"

const AdminDashboard = () => {
  const { tab } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  console.log("pathname:", location.pathname)
  console.log("tab:", tab)

  const activeTab = tab || "users"

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

        <div className="mb-6 flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/users")}
            className={`rounded px-4 py-2 ${
              activeTab === "users"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            USERS
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/rfqs")}
            className={`rounded px-4 py-2 ${
              activeTab === "rfqs"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            RFQs
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/vendors")}
            className={`rounded px-4 py-2 ${
              activeTab === "vendors"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Vendors
          </button>
        </div>

        <div key={activeTab}>
          {activeTab === "users" && <UsersTable />}
          {activeTab === "rfqs" && <RFQTable />}
          {activeTab === "vendors" && <VendorTable />}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
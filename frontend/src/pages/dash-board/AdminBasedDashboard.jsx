import DashboardLayout from "../../layouts/DashboardLayout"
import { useState } from "react"
import UsersTable from "../../components/AdminTables/UserTable"
import VendorTable from "../../components/AdminTables/VendorTable"
import RFQTable from "../../components/AdminTables/RFQTable"
import { useLocation, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
const AdminDashboard = () => {
  


  const { tab } = useParams(); // gets "vendors", "users", "rfqs"
   const activeTab = tab || "users"; // default to users
   const navigate = useNavigate();
 

  return (
    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
  onClick={() => navigate("/dashboard/users")}
  className={`px-4 py-2 rounded ${
    activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
  }`}
>USERS</button>
          <button className={`px-4 py-2 rounded ${
    activeTab === "rfqs" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
  }`}  onClick={() => navigate ("/dashboard/rfqs")}>RFQs</button>
          <button className={`px-4 py-2 rounded ${
    activeTab === "vendors" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
  }`} onClick={() => navigate ("/dashboard/vendors")}>Vendors</button>
        </div>

        {/* Dynamic Component */}
        {activeTab === "users" && <UsersTable />}
        {activeTab === "rfqs" && <RFQTable />}
        {activeTab === "vendors" && <VendorTable />}

      </div>

    </DashboardLayout>
  )
}

export default AdminDashboard
import DashboardLayout from "../../layouts/DashboardLayout"
import { useState } from "react"
import UsersTable from "../../components/AdminTables/UserTable"
import VendorTable from "../../components/AdminTables/VendorTable"
import RFQTable from "../../components/AdminTables/RFQTable"
const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState("users")

  return (
    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab("users")}>Users</button>
          <button onClick={() => setActiveTab("rfqs")}>RFQs</button>
          <button onClick={() => setActiveTab("vendors")}>Vendors</button>
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
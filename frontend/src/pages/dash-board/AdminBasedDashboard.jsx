import DashboardLayout from "../../layouts/DashboardLayout"

const AdminBasedDashboard = () => {
  return (

    <DashboardLayout>

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold mt-2">210</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Total Vendors</p>
            <h2 className="text-2xl font-bold mt-2">58</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Total RFQs</p>
            <h2 className="text-2xl font-bold mt-2">482</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Total Quotations</p>
            <h2 className="text-2xl font-bold mt-2">1203</h2>
          </div>

        </div>

      </div>

    </DashboardLayout>

  )
}

export default AdminBasedDashboard
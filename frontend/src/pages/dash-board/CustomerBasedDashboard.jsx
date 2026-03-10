import DashboardLayout from "../../layouts/DashboardLayout"

const CustomerBasedDashboard = () => {
  return (

    <DashboardLayout>

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-bold">
          Customer Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">My RFQs</p>
            <h2 className="text-2xl font-bold mt-2">12</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Pending RFQs</p>
            <h2 className="text-2xl font-bold mt-2">4</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Quotations Received</p>
            <h2 className="text-2xl font-bold mt-2">18</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Approved Quotes</p>
            <h2 className="text-2xl font-bold mt-2">6</h2>
          </div>

        </div>

      </div>

    </DashboardLayout>

  )
}

export default CustomerBasedDashboard
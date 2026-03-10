import DashboardLayout from "../../layouts/DashboardLayout"

const VendorBasedDashboard = () => {
  return (

    <DashboardLayout>

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-bold">
          Vendor Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Available RFQs</p>
            <h2 className="text-2xl font-bold mt-2">34</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Quotes Submitted</p>
            <h2 className="text-2xl font-bold mt-2">12</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Accepted Quotes</p>
            <h2 className="text-2xl font-bold mt-2">5</h2>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <h2 className="text-2xl font-bold mt-2">$4200</h2>
          </div>

        </div>

      </div>

    </DashboardLayout>

  )
}

export default VendorBasedDashboard
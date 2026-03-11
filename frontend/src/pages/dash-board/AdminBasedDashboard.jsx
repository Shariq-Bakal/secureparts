import DashboardLayout from "../../layouts/DashboardLayout"

const AdminDashboard = () => {
  return (

    <DashboardLayout>

      <div className="p-8 space-y-10 bg-gray-50 min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
            Platform Settings
          </button>

        </div>


        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-600">128</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Total Vendors</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-600">42</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Total RFQs</p>
            <h2 className="text-3xl font-bold mt-2 text-green-600">76</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Quotes Submitted</p>
            <h2 className="text-3xl font-bold mt-2 text-orange-500">210</h2>
          </div>

        </div>


        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow">

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              Recent Users
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">John Smith</td>
                  <td className="p-4">john@example.com</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      Customer
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Block
                    </button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">Metal Supply Co</td>
                  <td className="p-4">vendor@example.com</td>
                  <td className="p-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                      Vendor
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="p-4 space-x-2">

                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                      Approve
                    </button>

                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Reject
                    </button>

                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>


        {/* Recent RFQs */}
        <div className="bg-white rounded-xl shadow">

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              Recent RFQs
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">Steel Pipes</td>
                  <td className="p-4">John Smith</td>
                  <td className="p-4">500</td>
                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                      Open
                    </span>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">Copper Wires</td>
                  <td className="p-4">Alex Johnson</td>
                  <td className="p-4">200</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Closed
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>

  )
}

export default AdminDashboard
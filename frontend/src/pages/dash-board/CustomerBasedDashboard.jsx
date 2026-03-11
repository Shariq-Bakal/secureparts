import DashboardLayout from "../../layouts/DashboardLayout"
import { useNavigate } from "react-router-dom"

const CustomerBasedDashboard = () => {
  const navigate = useNavigate();
  const navigateToCreateRFQ = ()=>{
    navigate("/createrfq")
  }
  return (

    <DashboardLayout>

      <div className="p-8 space-y-10 bg-gray-50 min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Dashboard
          </h1>

          <button onClick={navigateToCreateRFQ} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
            + Create RFQ
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">My RFQs</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-600">12</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Pending RFQs</p>
            <h2 className="text-3xl font-bold mt-2 text-yellow-500">4</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Quotations Received</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-600">18</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Approved Quotes</p>
            <h2 className="text-3xl font-bold mt-2 text-green-600">6</h2>
          </div>

        </div>


        {/* My RFQs */}
        <div className="bg-white rounded-xl shadow">

          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              My RFQs
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Quotes</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">Steel Pipes</td>
                  <td className="p-4">500</td>
                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="p-4">5</td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">Aluminium Sheets</td>
                  <td className="p-4">200</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Completed
                    </span>
                  </td>
                  <td className="p-4">3</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>


        {/* Quotes Received */}
        <div className="bg-white rounded-xl shadow">

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              Quotes Received
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4">Vendor</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Delivery</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">ABC Suppliers</td>
                  <td className="p-4">Steel Pipes</td>
                  <td className="p-4">$1900</td>
                  <td className="p-4">5 Days</td>
                  <td className="p-4 space-x-2">

                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                      Accept
                    </button>

                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Reject
                    </button>

                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">Global Metals</td>
                  <td className="p-4">Steel Pipes</td>
                  <td className="p-4">$2000</td>
                  <td className="p-4">7 Days</td>
                  <td className="p-4 space-x-2">

                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                      Accept
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

      </div>

    </DashboardLayout>

  )
}

export default CustomerBasedDashboard